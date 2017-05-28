import * as fs from "fs";
import * as path from "path";
import SiteUpdate from '../db/SiteUpdate'

export const bookIndex = require('../media/bookIndex.json')
export const lyricsIndex = require('../media/lyricsIndex.json')
export const changelog: SiteUpdate[]  = require('../media/changelog.json')

const bookPath = path.join(__dirname, '../media/books')
const lyricsPath = path.join(__dirname, '../media/lyrics')

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

export const getChangelogRelativeToLastVisit = (lastVisit: number): SiteUpdate[] => {
  const isOlderThanLastVisit = (item: SiteUpdate) => item.date < lastVisit
  const lastIndex = changelog.findIndex(isOlderThanLastVisit)
  if (lastIndex === -1)
    return changelog
  return changelog.slice(0, lastIndex)
}
