/* eslint-disable max-len */
export function CookieGetItem(key: string) {
  const value = decodeURIComponent(
    document.cookie.replace(new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(key).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1'),
  )

  return value || null
}

export function CookieSetItem(key: string, value: string, exdays: number | null = null) {
  if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
    return false
  }

  const exdate = new Date()
  exdate.setDate(exdate.getDate() + (exdays || 0))
  const expires = exdays == null
    ? ''
    : `; expires=${exdate.toUTCString()}`

  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}${expires}; path=/`

  return true
}

export function CookieRemoveItem(key: string) {
  if (!key || !CookieHasItem(key)) {
    return false
  }

  document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`

  return true
}

export function CookieHasItem(key: string) {
  return new RegExp(`(?:^|;\\s*)${encodeURIComponent(key).replace(/[-.+*]/g, '\\$&')}\\s*\\=`).test(document.cookie)
}

const ACCESS_TOKEN = 'app.access-token'

export const setAccessToken = (token: string) => CookieSetItem(ACCESS_TOKEN, token)
export const getAccessToken = () => CookieGetItem(ACCESS_TOKEN)
export const removeAccessToken = () => CookieRemoveItem(ACCESS_TOKEN)

export const bytesToMB = (bytes: number) => bytes / (1024 * 1024)
export const bytesToGB = (bytes: number) => (bytesToMB(bytes) / 1024).toFixed(2)
export const MBToBytes = (mg: number) => mg * 1024 * 1024
export const GBToBytes = (gb: number) => gb * MBToBytes(1024)


const buildFormData = <T extends object>(
  formData: FormData,
  data: T,
  parentKey?: string,
) => {
  if (
    data
    && typeof data === 'object'
    && !(data instanceof Date)
    && !(data instanceof File)
    && !(data instanceof FileList)
  ) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        // @ts-ignore
        data[key],
        parentKey
          ? `${parentKey}[${key}]`
          : key,
      )
    })
  } else if (data instanceof FileList) {
    Array.from(data).forEach(file => {
      // @ts-ignore
      formData.append(parentKey, file)
    })
  } else {
    const value = data == null ? '' : data
    // @ts-ignore
    formData.append(parentKey, value)
  }
}

export const toFormData = <T extends object>(data: T, log = false) => {
  const formData = new FormData()
  buildFormData(formData, data)

  if (log) {
    new Response(formData).text().then(console.log)
  }

  return formData
}
