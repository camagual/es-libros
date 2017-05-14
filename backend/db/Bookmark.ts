export default class Bookmark {
  bookIndex: number
  chapterIndex: number;
  fraction: number;

  constructor(book: number, chapter: number, fraction: number) {
    this.bookIndex = book
    this.chapterIndex = chapter
    this.fraction = fraction
  }

}
