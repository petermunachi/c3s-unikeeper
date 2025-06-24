import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 1,
  retryDelay: (retryCount) => {
    console.log('Retry Attempt:', retryCount)
    return retryCount * 2000
  },
})

export default axios
