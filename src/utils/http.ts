import { LocationQuery } from 'vue-router'
import { getAccessToken } from './selectors'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
interface HttpOptions extends Exclude<RequestInit, 'body' | 'method'> {
  proggress?(progress: number): void
}
type HttpBody = RequestInit['body'] | Record<string, unknown>
type NewHttpClient = {
  baseURL: string
  getHeaders(): RequestInit['headers']
}

const defaultHeaders: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const createClient = ({
  baseURL,
  getHeaders,
}: NewHttpClient) => {
  const formatBody = (body: HttpBody, options: HttpOptions = {}) => {
    const headers = { ...defaultHeaders }
    const isForm = body instanceof FormData

    if (isForm) {
      delete headers['Content-Type']
    }

    return {
      ...options,
      headers: {
        ...headers,
        ...getHeaders(),
        ...options?.headers,
      },
      body: isForm
        ? body as FormData
        : JSON.stringify(body ?? {}),
    }
  }

  const xmlRequest = <R>(
    method: HttpMethod,
    url: string,
    options: HttpOptions = {},
  ) => new Promise<R>((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = event => {
      const percent = event.total / 100
      const progress = Math.round(event.loaded / percent)

      options.proggress!(progress)
    }

    xhr.open(method, url)

    if (options.headers) {
      for (const [header, value] of Object.entries(options.headers)) {
        xhr.setRequestHeader(header, value)
      }
    }

    xhr.onload = function () {
      if (this.status >= 200 && this.status <= 299) {
        resolve(JSON.parse(xhr.response) as R)
      } else {
        reject({
          json: async () => JSON.parse(xhr.responseText),
          status: this.status,
          statusText: xhr.statusText,
        })
      }
    }
    xhr.onerror = function () {
      reject({
        json: () => {},
        status: this.status,
        statusText: xhr.statusText,
      })
    }
    xhr.send(options.body as XMLHttpRequestBodyInit)
  })

  const request = async <R>(
    method: HttpMethod,
    url: string,
    options: HttpOptions = {},
  ) => {
    const fullUrl = /^http/i.test(url) ? url : `${baseURL}${url}`

    // if we need progress switch to XMLHttpRequest
    if (options.proggress) return await xmlRequest<R>(method, fullUrl, options)

    const response = await fetch(fullUrl, {
      ...options,
      method,
    })

    if (response.ok) {
      return await response.json() as R
    }

    throw response
  }

  const get = <R = any>(url: string, options?: HttpOptions) => {
    const optionsCopy = { ...options }
    optionsCopy.headers = {
      ...defaultHeaders,
      ...getHeaders(),
      ...optionsCopy.headers,
    }

    return request<R>('GET', url, optionsCopy)
  }

  const post = async <R = any>(url: string, body?: HttpBody, options?: HttpOptions) => {
    const fullOptions = formatBody(body, options)

    return await request<R>('POST', url, fullOptions)
  }

  const put = async <R = any>(url: string, body?: HttpBody, options?: HttpOptions) => {
    const fullOptions = formatBody(body, options)

    return await request<R>('PUT', url, fullOptions)
  }

  const patch = async <R = any>(url: string, body?: HttpBody, options?: HttpOptions) => {
    const fullOptions = formatBody(body, options)

    return await request<R>('PATCH', url, fullOptions)
  }

  const del = async <R = any>(url: string, body?: HttpBody, options?: HttpOptions) => {
    const fullOptions = formatBody(body, options)

    return await request<R>('DELETE', url, fullOptions)
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
  }
}

export default createClient({
  baseURL: import.meta.env.VITE_APP_API_URL,
  getHeaders: () => {
    const headers: RequestInit['headers'] = {}

    const accessToken = getAccessToken()
    if (accessToken !== null) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    return headers
  },
})

export const createSearch = (
  data: Record<string, string | number | null | boolean | undefined> | LocationQuery,
) => {
  const entries = Object.entries(data)
  if (entries.length === 0) {
    return ''
  }

  const params = entries.filter(([, value]) => typeof value !== 'undefined'
    && value !== null
    && value !== false)
    .map(([key, value]) => ([key, `${value}`]))

  const search = new URLSearchParams(Object.fromEntries(params))

  return search.toString() !== ''
    ? `?${search}`
    : ''
}

export const isAbortError = <T>(error: T) => error instanceof DOMException
interface AbortUtils {
  getSignal(): {
    signal?: AbortSignal
  }
  initAbort(): void
}

export const createAbortController = (): AbortUtils => {
  let controller: AbortController

  const initAbort = () => {
    if (controller && !controller.signal.aborted) {
      controller.abort()
    }
    controller = new AbortController()
  }

  return {
    getSignal: () => ({
      signal: controller.signal,
    }),
    initAbort,
  }
}
