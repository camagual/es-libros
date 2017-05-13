
export const scrollByFraction = (percentage) => {
  const element = document.scrollingElement
  const scrollPixels = percentage * element.scrollHeight
  window.scrollBy(0, scrollPixels)
}

export const computeScrollFraction = () => {
  const element = document.scrollingElement
  return element.scrollTop / element.scrollHeight
}
