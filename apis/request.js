import axios from 'axios'

// 可以根據不同 axios 需求建立多個配置
const request = axios.create({
  // Request Config
  baseURL: import.meta.env.VITE_API_URL
  //   headers: {
  //     Authorization: import.meta.env.VITE_API_TOKEN
  //   }
})

export default request
