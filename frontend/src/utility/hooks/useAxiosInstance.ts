import axios from "axios"
import { getUserData } from "../Utils"
// import jwt from "jsonwebtoken"

// Next we make an 'instance' of axios
export const axiosInstance = axios.create({
  // .. where we make our configurations
  baseURL: "http://localhost:8000/graphql"
})

// ** intercept the axiosInstance for all requests or responses before they are handled by then or catch.
axiosInstance.interceptors.request.use(
  async (config) => {
    //TODO ** Get token from localStorage & check for expiry.
    // WIth the below code, we always get a fresh token (if expired a new one, else the current accessToken)
    const accessToken = getUserData()?.token // we will have a token later.
    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers["Content-Type"] = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error)
  )
  // Also add configure interceptors && all the other cool stuff
  // axiosInstance.defaults.headers.common["Content-type"] = "application/json"


export const gql = async(query, variables?) => {
    let requestBody = {
        query,
        variables
    }

    try {
        const res = await axiosInstance.post('', {data: requestBody})

        if (res.status !== 200 && res.status !== 201) {
            throw new Error(res.data.errors)
        }

        return res.data
    } catch (e) {
        throw e
    }
}