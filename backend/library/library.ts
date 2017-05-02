import * as fs from "fs";
import * as path from "path";

export const bookIndex = require('./bookIndex.json')
export const lyricsIndex = require('./lyricsIndex.json')

const bookPath = path.join(__dirname, '../books')
const lyricsPath = path.join(__dirname, '../lyrics')

export const readChapter = (bookId: number, chapterIndex: number,
  callback: (err: NodeJS.ErrnoException, data: Buffer) => void) => {
    const filepath = `${bookPath}/${bookId}/${chapterIndex}.md`
    fs.readFile(filepath, callback)
}
export const readLyrics = (lyricsId: number,
  callback: (err: NodeJS.ErrnoException, data: Buffer) => void) => {
    const filepath = `${lyricsPath}/${lyricsId}.md`
    fs.readFile(filepath, callback)
}
