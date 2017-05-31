import { renderNodes } from 'simple-commonmark-react'
import ReactRouterLinkRenderer from 'simple-commonmark-react-router'

const markdownToComponentArray = (markdownSource, markdownClass, enableReactRouter) => {
  const customRenderers = {}
  if (enableReactRouter) customRenderers.link = ReactRouterLinkRenderer
  return renderNodes(markdownSource, { className: markdownClass, customRenderers })
}

export default markdownToComponentArray
