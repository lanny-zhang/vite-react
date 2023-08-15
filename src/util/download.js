import { message } from 'antd'

export function simpleDownloadFile(url) {
  const x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'blob'
  x.onload = () => {
    const nurl = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = nurl
    a.download = url.split('/').pop()
    a.click()
  }
  x.send()
}

export const download = ({
  url,
  method = 'get',
  defaultFileName,
  loading = {
    open: () => {},
    close: () => {},
  },
  before = () => {},
  after = () => {},
}) => {
  before()
  loading.open()
  fetch(url, {
    method,
  }).then((response) => {
    loading.close()
    response.blob().then((blob) => {
      if (response.status !== 200) {
        message.error('资源不存在')
        return
      }

      const disposition = response.headers.get('Content-Disposition')
      let filename = defaultFileName || 'file'
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '')
        }
      }

      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        const blobUrl = window.URL.createObjectURL(blob)
        const aElement = document.createElement('a')
        document.body.appendChild(aElement)
        aElement.style.display = 'none'
        aElement.href = blobUrl
        aElement.download = filename
        aElement.click()
        document.body.removeChild(aElement)
      }
      after()
    })
  })
}
