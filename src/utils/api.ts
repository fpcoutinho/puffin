import axios from 'axios'

const credentials = {
  username: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PASSWORD,
}
const url = import.meta.env.VITE_API_ROOT

const refreshToken = async (token: string) => {
  try {
    const response = await axios.post(url + 'auth/refresh/', { refresh: token })
    return response.data.access
  } catch (error) {
    console.log(error)
  }
}

const checkToken = async (token: string) => {
  try {
    const response = await axios.post(url + 'auth/verify/', { token })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const api = {

  login: async () => {
    try {
      // no futuro receber pelo form
      const response = await axios.post(url + 'auth/login/', credentials)
      const token = response.data.access
      const refreshToken = response.data.refresh

      // guarda nos cookies

      return { token, refreshToken }
    } catch (error) {
      console.log(error)
    }
  },

  checkIfLoggedIn: async (access: string, refresh: string) => {
    try {
      if (await checkToken(access)) {
        return true
      } else {
        if (await checkToken(refresh)) {
          // recebe novo token e muda ele nos cookies
          return true
        }
      }

      return false
    } catch (error) {
      console.log(error)
    }
  },

  get: async (path: string, access: string, refresh: string) => {
    try {
      let token = access
      if (!(await checkToken(access))) {
        if (await checkToken(refresh)) {
          token = await refreshToken(refresh)
        }
      }

      const response = await axios.get(url + 'api/' + path, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return response
    } catch (error) {
      console.log(error)
    }
  },

}