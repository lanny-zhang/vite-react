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
