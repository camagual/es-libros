import request from 'superagent'


export const getChapterFile = (bookName, chapterName) => {
   const url = `/books/read?bookName=${bookName}&chapter=${chapterName}`
   return request.get(url)
}
