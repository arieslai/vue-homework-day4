import axios from "axios"

export const getApi = async (url) => {
  try {
    const res = axios.get(url)
    return res
  }
  catch (err) {
    console.log('api error: ', err)
  }
}