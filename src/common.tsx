export function getId(url: string) {
  if (url) {
    if (url.indexOf('/') > -1) {
      const parts = url.split('/')
      return parts[parts.length - 2]
    } else {
      return 0
    }
  } else return 0
}
