const JSCompat = require('../compat/JSCompat.js')
import Bookmark from './Bookmark';

export default class User {
  username: string;
  hashedPassword: string;
  lastVisit: number;
  bookmarks: {};
  likedBooks: number[];
  likedSongs: number[];

  constructor(user: string, pass: string) {
    this.username = user
    this.hashedPassword = pass
    this.lastVisit = 0
    this.bookmarks = {}
    this.likedBooks = []
    this.likedSongs = []
  }

  addBookmark(bookId: number, chapterIndex: number, bookmarkFraction: number) {
      this.bookmarks[bookId] = new Bookmark(bookId, chapterIndex, bookmarkFraction)
  }

  findBookmark(bookId: number, chapterIndex: number): Bookmark | undefined{
      const foundBookmark = this.bookmarks[bookId] as Bookmark | undefined
      if (foundBookmark && foundBookmark.chapterIndex === chapterIndex)
        return foundBookmark
  }

  toStateObject(extraData) {
    const username = this.username
    const lastVisit = this.lastVisit
    const bookmarks = this.bookmarks
    const likedBooks = this.likedBooks
    const likedSongs = this.likedSongs
    return { username, lastVisit, bookmarks, likedBooks, likedSongs, ...extraData }

  }

  static fromDocument(document: any): User {
    const user =  new User(document.username, document.hashedPassword)
    user.lastVisit = document.lastVisit
    user.bookmarks = document.bookmarks
    user.likedBooks = document.likedBooks
    user.likedSongs = document.likedSongs
    return user
  }

}
