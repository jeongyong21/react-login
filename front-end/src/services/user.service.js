export const userService = {
  login,
  logout,
  register
}

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  }

  return fetch(`http://localhost:3000/api/user/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user))
      return user
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user")
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }

  return fetch(`http://localhost:3000/api/user/sign-up`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        logout()
      }
      const error = data
      return Promise.reject(error)
    }

    return data
  })
}
