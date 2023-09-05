/* eslint-disable no-plusplus */
export function flattenArray(arr = [], parent = '') {
  let flattenedArray = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) {
    const { path, children, ...reset } = arr[i] || {}
    const currentPath = parent ? `${parent}_/${path}` : `/${path}`
    flattenedArray.push({ ...reset, path: `/${path}`, father: parent })

    if (children) {
      const nestedArray = flattenArray(children, currentPath)
      flattenedArray = flattenedArray.concat(nestedArray)
    }
  }

  return flattenedArray
}

export function getRandomElements(array, count) {
  const shuffled = array.slice() // 复制数组
  let randomElements = []

  // Fisher-Yates 洗牌算法
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // 选择指定数量的元素
  randomElements = shuffled.slice(0, count)

  return randomElements
}
