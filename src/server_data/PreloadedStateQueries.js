import { bookIndex, lyricsIndex, bookmarks } from './PreloadedState.js'


const findBookById = (bookId) => {
  let id = bookId
  if (typeof bookId === 'string')
    id = parseInt(id, 10)
  if (id >= 0 && id < bookIndex.length)
    return bookIndex[id]
  return null
}

const findSongById = (lyricsId) => {
  let id = lyricsId
  if (typeof lyricsId === 'string')
    id = parseInt(id, 10)
  if (id >= 0 && id < lyricsIndex.length)
    return lyricsIndex[id]
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
  if (selectedBook
    && chapterIndex >= 0 &&
    chapterIndex < selectedBook.chapters.length)
    return selectedBook.chapters[chapterIndex]
  return null
}

const findBookmarkByBookId = (bookId) => {
  const bookKey = '' + bookId
  const key = Object.keys(bookmarks).find((key) => {
    return key ===  bookKey
  })
  return key && bookmarks[key]
}

module.exports = {
  bookIndex,
  findBookmarkByBookId,
  findBookById,
  findSongById,
  getChapterByIndex,
  getChapterListById,
}
