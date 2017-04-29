import request from 'superagent'


export const readChapter = (bookName, chapterName) => {
   const url = `/books/read?bookName=${bookName}&chapter=${chapterName}`
   return request.get(url)
    .set('Accept', 'application/json')
}
