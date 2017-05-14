import { bookmarks } from './PreloadedState.js'

export const addBookmark = (bookId, chapterIndex, bookmarkFraction) => {
  bookmarks[bookId] = {
    bookId,
    chapterIndex,
    fraction: bookmarkFraction,
  }
}
