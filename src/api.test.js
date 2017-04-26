import { getChapterFile } from './api'

it('builds a request to get a chapter file', () => {
  const request = getChapterFile("Test B'oók", "Chapter 1")
  expect(request.method).toEqual('GET')
  expect(request.url).toEqual('/books/read?bookName=Test B\'oók&chapter=Chapter 1')
})
