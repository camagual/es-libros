const Express = require('express')
const bodyParser = require('body-parser');

const port = process.env.PORT || 8192
const app = Express()

const library = require('./library.js')

app.use(bodyParser.json()); // for parsing application/json

app.get('/books/all', (req, res) => {
  res.status(200)
    .send(JSON.stringify(library.getBooks()))
})

app.get('/books/index', (req, res) => {
  library.readBookIndex((err, data) => {
    if (err)
      res.status(500).send(err)
    else
      res.status(200).send(data)
  })
})

app.get('/books/chapters', (req, res) => {
  const bookName = req.query.name
  if (!bookName)
    res.status(422).send('Missing query parameter "name" (book name)')
  else
    res.status(200)
      .send(library.getBookDataByName(bookName))
})

app.get('/books/read', (req, res) => {
  const bookName = req.query.bookName
  const chapter = req.query.chapter
    console.log('readChapter read')
  if (!bookName)
    res.status(422).send('Missing query parameter "bookName" (book name)')
  else if (!chapter)
    res.status(422).send('Missing query parameter "chapter" (chapter name)')
  else library.readChapter(bookName, chapter, (err, data) => {
      if (err)
        res.status(500).send(err)
      else
        res.status(200).send(data.toString())
  })
})

app.listen(port, function () {
  //eslint-disable-next-line
  console.log('Application listening on  port ' + port);
});
