import * as Express from "express";
import * as bodyParser from "body-parser";

const port: number = process.env.PORT || 8192
import * as library from "./library";

const app = Express()

app.use(bodyParser.json()); // for parsing application/json

app.get('/api/books/read', (req, res) => {
  const bookName = req.query.bookName
  const chapter = req.query.chapter
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
