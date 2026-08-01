import { validateToken } from './auth'

export function verifyIfTokenIsValid() {
  return validateToken()
}
