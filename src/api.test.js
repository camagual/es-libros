import { getChapterFile, getBookChapters } from './api'

it('builds a request to get a chapter file', () => {
  const request = getChapterFile("Test B'oók", "Chapter 1")
  expect(request.method).toEqual('GET')
  expect(request.url).toEqual('/books/read?bookName=Test B\'oók&chapter=Chapter 1')
})

it('builds a request to get book chapters', () => {
  const request = getBookChapters("Test B!o?k")
  expect(request.method).toEqual('GET')
  expect(request.url).toEqual('/books/chapters?name=Test B!o?k')
})
