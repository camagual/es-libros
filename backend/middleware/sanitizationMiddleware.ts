
export const validateLoginRequest = (req: any, res: any, next: any) => {
  const {
    user,
    pass,
  } = req.body

  if (!user || user === "")
    res.status(422).send('User cannot be empty')
  else if (!pass || pass === "")
    res.status(422).send('Pass cannot be empty')
  else
    next()
}

export const validateReadBook = (req: any, res: any, next: any) => {
  const {
    bookName,
    chapter,
  } = req.query

  if (!bookName)
    res.status(422).send('Missing query parameter "bookName" (book name)')
  else if (!chapter)
    res.status(422).send('Missing query parameter "chapter" (chapter name)')
  else
    next()
}

export const validateReadLyrics = (req: any, res: any, next: any) => {
  const lyricsId = req.query.lyricsId
  if (!lyricsId)
    res.status(422).send('Missing query parameter "lyricsId" (lyrics identifier)')
  else
    next()
}

export const validateAddBookmark = (req: any, res: any, next: any) => {
  const {
    bookId,
    chapterIndex,
    bookmarkFraction
  } = req.body

  if (!bookId || bookId === "")
    res.status(422).send('bookId cannot be empty')
  else if (!chapterIndex || chapterIndex === "")
    res.status(422).send('chapterIndex cannot be empty')
  else if (!bookmarkFraction || bookmarkFraction === "")
    res.status(422).send('chapterIndex cannot be empty')
  else {
      req.body.bookId = parseInt(bookId, 10)
      req.body.chapterIndex = parseInt(chapterIndex, 10)
      req.body.bookmarkFraction = parseFloat(bookmarkFraction)
    next()
  }
}
