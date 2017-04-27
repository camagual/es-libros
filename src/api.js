import request from 'superagent'


export const getChapterFile = (bookName, chapterName) => {
   const url = `/books/read?bookName=${bookName}&chapter=${chapterName}`
   return request.get(url)
    .set('Accept', 'application/json')
}

export const getBookChapters = (bookName) => {
   const url = `/books/chapters?name=${bookName}`
   return request.get(url)
    .set('Accept', 'application/json')
}
