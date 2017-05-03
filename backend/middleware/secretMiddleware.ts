import { setUserSession } from '../session'
import * as fs from 'fs'

const secretHash = process.env.SECRET_HASH
const secretUser = process.env.SECRET_USER
const secretFileMessage = process.env.SECRET_FILE

if (!secretHash || !secretUser || !secretFileMessage) {
  console.error('Warning: To serve a secret message, SECRET_HASH, SECRET_USER and SECRET_FILE are necessary in your environment variables.')
}

export const serveSecretMessage = (app) => {
    if (secretHash && secretUser && secretFileMessage)
      app.get('/secret/' + secretHash, (req, res) => {
        setUserSession(secretUser, req)
        fs.readFile(secretFileMessage, (err, data) => {
          if (err)
            res.status(500).send(err)
          else
            res.status(200).send(data.toString())
        })
      })
}
