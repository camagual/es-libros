import index from './bookIndex.json'

const findBookById = (bookId) => {
  let id = bookId
  if (typeof bookId === 'string')
    parseInt(id, 10)
  if (id >= 0 && id < index.length)
    return index[id]
  console.log('null', bookId)
  return null
}

const getChapterListById = (bookId) => {
  const selectedBook = findBookById(bookId)
  if (selectedBook)
    return selectedBook.chapters
  return null
}

const getChapterByIndex = (bookId, chapterIndex) => {
  const selectedBook = findBookById(bookId)
  if (selectedBook)
    return selectedBook.chapters[chapterIndex]
  return null
}
module.exports = {
  index,
  findBookById,
  getChapterByIndex,
  getChapterListById,
}
