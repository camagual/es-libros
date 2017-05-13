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

const findBookmarksByBookId = (bookId) => {
  return Object.keys(bookmarks).filter((key) => {
    return key.startsWith(`_${bookId}ch`)
  })
}

const findLatestBookmarkedChapterByBookId = (bookId) => {
  const bookmarkKeys = findBookmarksByBookId(bookId)
  const totalBookmarks = bookmarkKeys.length
  if (totalBookmarks === 0)
    return null

  const lastKey = bookmarkKeys[totalBookmarks - 1]
  const chapterIndexFromKey = lastKey.substring(`_${bookId}ch`.length)
  return parseInt(chapterIndexFromKey, 10)
}

module.exports = {
  bookIndex,
  findLatestBookmarkedChapterByBookId,
  findBookById,
  findSongById,
  getChapterByIndex,
  getChapterListById,
}
