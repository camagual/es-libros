import * as Datastore from 'nedb'
import User from './User'
const SHA256 = require('crypto-js/sha256')

const dbUsersFileName = __dirname + '/server.db'
const userdb = new Datastore({ filename: dbUsersFileName, autoload: true });
userdb.ensureIndex({fieldName: 'username', unique: true }, (err) => {
  if (err) throw err
})

export const findUser = (username: string, callback: (username: User | null) => void) => {
  userdb.findOne({ username }, (err, doc) => {
    if (doc === null) callback(null)
    else callback(User.fromDocument(doc))
  })
}

export const addUser = (username: string, plainPassword: string,
  callback: (error: Error, username: User) => void) => {
  const newUser = new User(username, SHA256(plainPassword).toString())
  userdb.insert(newUser, (err) => {
    callback(err, newUser)
  })
}