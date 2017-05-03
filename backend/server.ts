import * as path from 'path'
import * as Express from "express";
import * as bodyParser from "body-parser";

const port: number = process.env.PORT || 8192
import * as library from "./library/library";
import * as dbAdmin from "./db/admin";
import * as session from "./session";
import { sendTelegram } from "./bot/telegramAPI"
import { serveSecretMessage } from "./middleware/secretMiddleware"
import {
  logoutUser,
  validateUserLoggedIn,
  validateUserNotLoggedIn,
  validateUserInDB,
} from "./middleware/sessionMiddleware";
import {
  validateLoginRequest,
  validateReadBook,
  validateReadLyrics,
} from "./middleware/sanitizationMiddleware";
import {
  serveApp,
} from "./middleware/renderMiddleware";

const hostname = process.env.PRODUCTION ? '127.0.0.1' : undefined
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
        sendTelegram(`${user} logged in.`)
    } else {
        res.status(422).send(`La clave de ${user} es incorrecta`)
        sendTelegram(`${user} failed to login. wrong password`)
    }
    } else
        res.status(404).send(`No existe un usuario con el nombre '${user}'`)
  })
})

app.post('/logout', validateUserLoggedIn, logoutUser)

app.get('/api/books/read', validateUserLoggedIn, validateReadBook, (req, res) => {
  const bookName = req.query.bookName
  const chapter = req.query.chapter
  library.readChapter(bookName, chapter, (err, data) => {
    if (err)
      res.status(500).send(err)
    else
      res.status(200).send(data.toString())
  })
})

app.get('/api/lyrics/read', validateUserLoggedIn, validateReadLyrics, (req, res) => {
  const lyricsId = req.query.lyricsId
  library.readLyrics(lyricsId, (err, data) => {
      if (err)
        res.status(500).send(err)
      else
        res.status(200).send(data.toString())
  })
})

serveSecretMessage(app)

app.get('*', serveApp)

app.listen(port, hostname, function () {
  //eslint-disable-next-line
  console.log('Application listening on  port ' + port);
});
