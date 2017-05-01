import * as path from 'path'
import * as Express from "express";
import * as bodyParser from "body-parser";

const port: number = process.env.PORT || 8192
import * as library from "./library";
import * as dbAdmin from "./db/admin";
import * as session from "./session";
import {
  kickOutUser,
  validateUserLoggedIn,
  validateUserNotLoggedIn,
  validateUserInDB,
} from "./middleware/sessionMiddleware";
import {
  validateLoginRequest,
} from "./middleware/sanitizationMiddleware";
import {
  serveApp,
} from "./middleware/renderMiddleware";

const app = Express()

app.use(bodyParser.json()); // for parsing application/json
app.use(session.expressMiddleware);

app.get('/', serveApp)
app.use('/', Express.static(path.join(__dirname, '../build')))

app.post('/login', validateUserNotLoggedIn, validateLoginRequest, (req, res) => {
  const {
    user,
    pass,
  } = req.body
  dbAdmin.findUser(user, (userObject) => {
    if (userObject) {
      if (userObject.hashedPassword === pass) {
        session.setUserSession(user, req)
        res.status(200).send('OK')
      } else
        res.status(422).send(`Password for ${user} is incorrect`)
    } else
        res.status(404).send(`User ${user} does not exist`)
  })
})

app.post('/logout', validateUserLoggedIn, kickOutUser)

app.get('/api/books/read', validateUserLoggedIn, (req, res) => {
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
