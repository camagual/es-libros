import * as fs from 'fs'
import * as path from 'path'
import * as session from '../session'
import * as dbAdmin from '../db/admin'
import User from '../db/User'
import {
  bookIndex,
  lyricsIndex,
  getChangelogRelativeToLastVisit,
 } from '../library/library'
import { sendTelegram } from "../bot/telegramAPI"


const indexFilePath = path.join(__dirname, '../../build/index.template.html')

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

const serveAppWithUserData = (req, res, user: User | null) => {
    let state: any = { needsLogin: true, changelog: [] }
    if (user) {
      const changelog = getChangelogRelativeToLastVisit(user.lastVisit)
      state = user.toStateObject({
          bookIndex,
          lyricsIndex,
          changelog,
      })
      const msg = createTelegram(req, user.username)
      sendTelegram(msg)
      dbAdmin.updateUserLastVisit(user.username, Date.now(), undefined)
    }
    enviarHtmlConState(res, state)
  }

export const serveApp = (req, res) => {
  const username = session.getUserFromSession(req) as string
  if (username)
    dbAdmin.findUser(username, (user) => {
      serveAppWithUserData(req, res, user)
  })
    else serveAppWithUserData(req, res, null)
}
