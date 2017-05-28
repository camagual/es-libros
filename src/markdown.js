import { renderNodes } from 'simple-commonmark-react'

const markdownToComponentArray = (markdownSource, markdownClass) => {
  return renderNodes(markdownSource, { className: markdownClass })
}

export default markdownToComponentArray
