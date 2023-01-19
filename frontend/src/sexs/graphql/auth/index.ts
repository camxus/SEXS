export const LOGIN = `
query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userId
    token
    tokenExpiration
  }
}
`