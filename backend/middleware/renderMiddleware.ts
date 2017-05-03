import * as fs from 'fs'
import * as path from 'path'
import * as session from '../session'
import * as dbAdmin from '../db/admin'
import { bookIndex, lyricsIndex } from '../library/library'
import { sendTelegram } from "../bot/telegramAPI"


const indexFilePath = path.join(__dirname, '../../build/index.html')

const colocarStateEnHtml = (html: string, state) => {
  const storePlaceholder = 'void 0'
  return html.replace(storePlaceholder, JSON.stringify(state))
}

const sendBuildNotReadyError = (res) => {
  console.log('build not ready')
  res.status(500)
    .send('React App no inicializada. Ejecutaste yarn run build?')
}

const enviarHtmlConState = (res, state) => {
  fs.readFile(indexFilePath, 'utf8', (err, data) => {
    if (err) sendBuildNotReadyError(res)
    else {
      const htmlDinamico = colocarStateEnHtml(data, state)
      res.status(200).send(htmlDinamico)
    }
  })
}

const createTelegram: ((any, string) => string) = (req, username) => {
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  return `${username} has requested the website from ${ip}`


}

export const serveApp = (req, res) => {
  const username = session.getUserFromSession(req) as string
  dbAdmin.findUser(username, (user) => {
    let state: any = { needsLogin: true }
    if (user)
      state = user.toStateObject({
          bookIndex,
          lyricsIndex,
      })
    enviarHtmlConState(res, state)
    const msg = createTelegram(req, username)
    sendTelegram(msg)
  })
}
