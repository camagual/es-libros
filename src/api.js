import request from 'superagent'

const prefix = process.env.NODE_ENV === 'test' ? 'http://localhost:8192' : ''

export const getChapterFile = (bookName, chapterName) => {
   const url = prefix + `/books/read?bookName=${bookName}&chapter=${chapterName}`
   return request.get(url)
}
