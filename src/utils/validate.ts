export const noCyrillic = (text: string) => {
  const regexCyrillic = (/[А-Яа-яёЁ]+/ig)
  return !text || regexCyrillic.test(String(text))
}

export const email = (email: string) => {
  if (!email || noCyrillic(email)) {
    return true
  }

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return !re.test(String(email).toLowerCase())
}

export const minLength = (text: string, length: number) => !text
  ? true
  : text.length < length
export const maxLength = <T extends {
  length: number
}>(text: T, length: number) => !text
  ? true
  : text.length > length

export const required = <T>(value: T) => Array.isArray(value)
  ? value.length === 0
  : !value || typeof value === 'undefined' || value === null
