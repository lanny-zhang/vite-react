import qs from 'qs'
import axios from 'axios'

export const request = (url, {
  params, query, header, method = 'POST',
}) => {
  return new Promise((resolve, reject) => {
    axios(query ? `${url}/?${qs.stringify(query)}` : url, {
      data: params,
      headers: header,
      method,
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
