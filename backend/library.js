const path = require('path')
const fs = require('fs')
const dirTree = require('./directory-tree.js')

const bookPath = __dirname + '/books'
let bookDirTree = dirTree(bookPath, {extensions: ['.md']})

const searchByNameAlgorithm = (name, array, key='name') => {
  //TODO use a better algorithm, binary search maybe
  const len = array.length
  for (let i = 0; i < len; i++) {
    const item = array[i]
    if (item[key] === name)
       return item
  }
  return null
}

const findBookByName = (name) => {
  return searchByNameAlgorithm(name, bookDirTree.children)
}

module.exports = {
  getBooks: () => {
    return bookDirTree.children.map((bookDir) => {
      return bookDir.name
    })
  },

  getBookDataByName: (name) => {
    const bookDir = findBookByName(name)
    if (bookDir === null) return null
    const chapters = bookDir.children.map((chapterFile) => {
      return path.basename(chapterFile.name, '.md')
    })

    return {
      name,
      chapters,
    }
  },

  readChapter: (bookName, chapterName, callback) => {
    const filepath = `${bookPath}/${bookName}/${chapterName}.md`
    fs.readFile(filepath, callback)
  },
}
