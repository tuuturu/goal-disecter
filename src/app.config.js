export default (() => {
  if (window.env !== undefined) return window.env

  return import.meta.env
})()
