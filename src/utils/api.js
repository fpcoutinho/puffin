import axios from 'axios'

const credentials = {
  username: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PASSWORD,
}
const url = import.meta.env.VITE_API_ROOT

export const api = {

  login: async () => {
    try{
      const response = await axios.post(url + 'auth/login/', credentials)
      const token = response.data.access
      const refreshToken = response.data.refresh

      return { token, refreshToken }
    } catch (error) {
      console.log(error)
    }
  },

  getRelatorios: async (token) => {
    try{
      const response = await axios.get(url + 'api/relatorios/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },

}