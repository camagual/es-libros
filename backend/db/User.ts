export default class User {
  username: String;
  hashedPassword: String;
  lastBook: number | null;
  lastChapter: number;
  likedBooks: number[];
  likedSongs: number[];

  constructor(user: String, pass: String) {
    this.username = user
    this.hashedPassword = pass
    this.lastBook = null
    this.lastChapter = 0
    this.likedBooks = []
    this.likedSongs = []
  }

  toStateObject() {
    return {
      username: this.username,
      lastBook: this.lastBook,
      lastChapter: this.lastChapter,
      likedBooks: this.likedBooks,
      likedSongs: this.likedSongs,
    }
  }

  static fromDocument(document: any): User {
    const user =  new User(document.username, document.hashedPassword)
    user.lastBook = document.lastBook
    user.lastChapter = document.lastChapter
    user.likedBooks = document.likedBooks
    user.likedSongs = document.likedSongs
    return user
  }

}
