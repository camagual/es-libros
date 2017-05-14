const JSCompat = require('../compat/JSCompat.js')
import Bookmark from './Bookmark';

export default class User {
  username: String;
  hashedPassword: String;
  lastBook: number | null;
  lastChapter: number;
  bookmarks: {};
  likedBooks: number[];
  likedSongs: number[];

  constructor(user: String, pass: String) {
    this.username = user
    this.hashedPassword = pass
    this.lastBook = null
    this.lastChapter = 0
    this.bookmarks = {}
    this.likedBooks = []
    this.likedSongs = []
  }

  addBookmark(bookId: number, chapterIndex: number, bookmarkFraction: number) {
      this.bookmarks[bookId] = new Bookmark(bookId, chapterIndex, bookmarkFraction)
  }

  findBookmark(bookId: number): Bookmark | undefined{
      return this.bookmarks[bookId] as Bookmark | undefined
  }

  toStateObject(extraData) {
    const state = {
      username: this.username,
      lastBook: this.lastBook,
      lastChapter: this.lastChapter,
      bookmarks: this.bookmarks,
      likedBooks: this.likedBooks,
      likedSongs: this.likedSongs,
    }
    return JSCompat.assign(state, extraData)
  }

  static fromDocument(document: any): User {
    const user =  new User(document.username, document.hashedPassword)
    user.lastBook = document.lastBook
    user.lastChapter = document.lastChapter
    user.bookmarks = document.bookmarks
    user.likedBooks = document.likedBooks
    user.likedSongs = document.likedSongs
    return user
  }

}
