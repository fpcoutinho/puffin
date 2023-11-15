import axios from 'axios'

const url = import.meta.env.VITE_API_ROOT

const refreshToken = async (token: string) => {
  try {
    const response = await axios.post(url + 'auth/login/refresh/', { refresh: token })
    document.cookie = `access_token=${response.data.access};max-age=3600;path=/;Secure`
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

  login: async (usuario: string, senha: string) => {
    try {
      const response = await axios.post(url + 'auth/login/', { username: usuario, password: senha })
      const { access, refresh } = response.data

      document.cookie = `access_token=${access};max-age=3600;path=/;Secure`
      document.cookie = `refresh_token=${refresh};max-age=604800;path=/;Secure`
      return new Response('Log in successful!', { status: 200, statusText: 'Log in successful!' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return new Response(error.message, { status: error.response?.status, statusText: error.response?.data.detail })
      }
      console.log('api helper error:\n')
      console.log(error)
    }
  },

  logout: async () => {
    try {
      const cookies = document.cookie.split('; ')
      const access = cookies.find(row => row.startsWith('access_token'))?.split('=')[1]
      const refresh = cookies.find(row => row.startsWith('refresh_token'))?.split('=')[1]
      if (access && refresh) {
        const response = await axios.post(url + 'auth/logout/', { 'refresh_token': refresh })
        document.cookie = "access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/"
        document.cookie = "refresh_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/"
        return response
      }
    } catch (error) {
      console.log('api helper error:\n')
      console.log(error)
    }
  },

  register: async (usuario: string, senha: string, confirma_senha: string, email: string, nome: string, sobrenome: string) => {
    const user = {
      username: usuario,
      password: senha,
      password2: confirma_senha,
      email: email,
      first_name: nome,
      last_name: sobrenome
    }
    try {
      const response = await axios.post(url + 'auth/register/', user)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data
        return new Object({ status: error.response?.status, data: data })
      }
      console.log('api helper error:\n')
      console.log(error)
    }
  },

  checkIfLoggedIn: async () => {
    try {
      const cookies = document.cookie.split('; ')
      const access = cookies.find(row => row.startsWith('access_token'))?.split('=')[1]
      const refresh = cookies.find(row => row.startsWith('refresh_token'))?.split('=')[1]

      if (access && await checkToken(access)) {
        return true
      } else {
        if (refresh && await checkToken(refresh)) {
          const newAccess = await refreshToken(refresh)
          document.cookie = `access_token=${newAccess};max-age=3600;path=/;Secure`
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