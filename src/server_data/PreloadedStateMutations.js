import { bookmarks } from './PreloadedState.js'

export const addBookmark = (bookId, chapterIndex, bookmarkFraction) => {
  bookmarks[`_${bookId}ch${chapterIndex}`] = bookmarkFraction
}
