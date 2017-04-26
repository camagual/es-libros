import React from 'react'
import CommonMark from 'commonmark';
import ReactRenderer from 'commonmark-react-renderer'

const parser = new CommonMark.Parser();
const renderer = new ReactRenderer();

const setMarkdownCSSClassToComponentFunc = (className) => {
  return (component) => React.cloneElement(component, { className })
}

const markdownToComponentArray = (markdownSource, markdownClass) => {
  const ast = parser.parse(markdownSource)
  const componentArray = renderer.render(ast);
  const setMarkdownCSSClassToComponent = setMarkdownCSSClassToComponentFunc(markdownClass)
  return componentArray.map(setMarkdownCSSClassToComponent)
}

export default markdownToComponentArray
