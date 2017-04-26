import { getChapterFile } from './api'
import fs from 'fs'
import path from 'path'

//require('../backend/server.js')

const getChapterFromFileSystem = (bookName, chapter, callback) => {
  fs.readFile(path.resolve(__dirname,
    `../backend/books/${bookName}/${chapter}.md`), callback)
}

const fetchChapterTextFromAPITest = (bookName, chapter, done) => {
  getChapterFile(bookName, chapter)
    .then((chapterHttpResp) => {
      getChapterFromFileSystem(bookName, chapter, (err, chapterFileText) => {
          expect(chapterHttpResp.text).toEqual(chapterFileText.toString())
          done()
      })
    })
}

it('gets chapter file', (done) => {
  //fetchChapterTextFromAPITest('Harry Potter y la Piedra Filosofal',
  //'El niño que vivió', done)
  done()
})
