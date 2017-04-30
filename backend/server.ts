import * as Express from "express";
import * as bodyParser from "body-parser";
const sessions = require('client-sessions')

const port: number = process.env.PORT || 8192
const secret: number = process.env.SESSION_SECRET || "34slfdjkvlgsft3"
import * as library from "./library";
import * as dbAdmin from "./db/admin";

const app = Express()

app.use(bodyParser.json()); // for parsing application/json
app.use(sessions({
  cookieName: 'mySession',
  secret: secret,
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
}));

app.post('/login', (req: any, res) => {
  const {
    user,
    pass,
  } = req.body
  dbAdmin.findUser(user, (userObject) => {
    if (userObject) {
      if (userObject.hashedPassword === pass) {
        req.mySession.user = user
        res.status(200).send('OK')
      } else
        res.status(422).send(`Password for ${user} is incorrect`)
    } else
        res.status(404).send(`User ${user} does not exist`)
  })
})

app.post('/logout', (req: any, res) => {
  req.mySession.user = undefined
  res.status(200).send('OK')
})

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
