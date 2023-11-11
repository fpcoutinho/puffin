import axios from 'axios'

const credentials = {
  username: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PASSWORD,
}
const url = import.meta.env.VITE_API_ROOT

const refreshToken = async (token: string) => {
  try {
    const response = await axios.post(url + 'auth/login/refresh/', { refresh: token })
    document.cookie = `access_token=${response.data.access};max-age=3600;`
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
      const { access, refresh } = response.data
      // colocar no cookie
      document.cookie = `access_token=${access};max-age=3600; Secure`
      document.cookie = `refresh_token=${refresh};max-age=604800; Secure`
      return new Response('Log in successful!', { status: 200, statusText: 'Log in successful!' })
    } catch (error) {
      console.log(error)
    }
  },

  logout: async () => {
    console.log('logout')
  },

  checkIfLoggedIn: async (access: string, refresh: string) => {
    try {
      if (await checkToken(access)) {
        return true
      } else {
        if (await checkToken(refresh)) {
          return true
        }
      }

      return false
    } catch (error) {
      console.log(error)
    }
  },

  get: async (path: string) => {
    try {
      const cookies = document.cookie.split('; ')
      let access = cookies.find(row => row.startsWith('access_token'))?.split('=')[1]
      const refresh = cookies.find(row => row.startsWith('refresh_token'))?.split('=')[1]
      if (access && !(await checkToken(access))) {
        if (refresh && (await checkToken(refresh))) {
          access = await refreshToken(refresh)
        }
      }

      const response = await axios.get(url + 'api/' + path, {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      })
      return response
    } catch (error) {
      console.log(error)
    }
  },

}