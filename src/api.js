import request from 'superagent'
import SHA256 from 'crypto-js/sha256'


export const readChapter = (bookName, chapterName) => {
   const url = `/api/books/read?bookName=${bookName}&chapter=${chapterName}`
   return request.get(url)
    .set('Accept', 'application/json')
}

export const login = (plainUser, plainPass) => {
  return request.post('/login')
    .send({
      user: plainUser,
      pass: SHA256(plainPass).toString(),
    })
}
