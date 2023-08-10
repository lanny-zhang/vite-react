export function flattenArray(arr) {
  let result = []

  arr.forEach((item) => {
    const { children: child, ...reset } = item || {}
    result.push(reset)

    if (item?.children) {
      const children = flattenArray(item.children)
      result = result.concat(children)
    }
  })

  return result
}

export function flattenArray1(arr, parent = '') {
  let flattenedArray = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) {
    const { path, children, ...reset } = arr[i]
    const currentPath = `${parent}/${path}`
    flattenedArray.push({ ...reset, path: currentPath, father: parent })

    if (children) {
      const nestedArray = flattenArray1(children, currentPath)
      flattenedArray = flattenedArray.concat(nestedArray)
    }
  }

  return flattenedArray
}
