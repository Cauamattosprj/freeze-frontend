let isAuthenticated = false

export function setAuthState(value: boolean) {
  isAuthenticated = value
}

export const auth = {
  get isAuthenticated() {
    return isAuthenticated
  },
}
