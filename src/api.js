import request from 'superagent'
import SHA256 from 'crypto-js/sha256'

export const unauthorizedResponseHandler = (callback)  => {
  return (resp) => {
    if (resp.status === 401)
       location.reload(true)
    else if (callback)
       callback(resp)
  }
}

export const readChapter = (bookName, chapterName) => {
   const url = `/api/books/read?bookName=${bookName}&chapter=${chapterName}`
   return request.get(url)
    .set('Accept', 'application/json')
}

export const readLyrics = (lyricsId) => {
   const url = `/api/lyrics/read?lyricsId=${lyricsId}`
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

export const addBookmark = (bookId, chapterIndex, bookmarkFraction) => {
  return request.post('/api/bookmark')
  .send({
    bookId,
    chapterIndex,
    bookmarkFraction
  })
}

export const logout = () => {
  return request.post('/logout').send()
}
