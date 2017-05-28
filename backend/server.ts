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
  validateAddBookmark,
} from "./middleware/sanitizationMiddleware";
import {
  serveApp,
} from "./middleware/renderMiddleware";

const hostname: any = process.env.PRODUCTION ? '127.0.0.1' : undefined
const app = Express()

app.use(bodyParser.json()); // for parsing application/json
app.use(session.expressMiddleware);

app.use('/video', validateUserLoggedIn, Express.static(path.join(__dirname, './media/videos')))
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

app.get('/api/books/read', validateUserInDB, validateReadBook, (req, res) => {
  const bookId = req.query.bookId
  const chapterIndex = req.query.chapterIndex
  library.readChapter(bookId, chapterIndex, (err, data) => {
    if (err)
      res.status(500).send(err)
    else {
        const user = session.getUserObjectFromSession(req)
        const bookmark = user.findBookmark(bookId, chapterIndex)
        const fraction = bookmark && bookmark.fraction
        const resp = { markdown: data.toString(), bookmark: fraction }
        res.status(200).send(resp)
    }
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

app.post('/api/bookmark', validateUserLoggedIn, validateAddBookmark, (req, res) => {
    const {
        bookId,
        chapterIndex,
        bookmarkFraction,
    } = req.body
    const username: any = session.getUserFromSession(req)
    dbAdmin.addBookmarkToUser(username, bookId, chapterIndex, bookmarkFraction, (err) => {
      if (err)
        res.status(500).send(err)
      else
        res.status(200).send('OK')
    })
})

app.post('/api/feedback', validateUserLoggedIn, (req, res) => {
    const {
        text,
    } = req.body
    const username = session.getUserFromSession(req)
    sendTelegram(`Feedback from ${username}: ${text}`)
    res.status(200).send('OK')
})


serveSecretMessage(app)

app.get('*', serveApp)

app.listen(port, hostname, function () {
  //eslint-disable-next-line
  console.log('Application listening on  port ' + port);
});
