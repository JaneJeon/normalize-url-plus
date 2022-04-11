import debug from 'debug'

const BASE = 'normalize'

export default function debugInit(name: string) {
  const fullName = `${BASE}:${name}`
  return debug(fullName)
}
