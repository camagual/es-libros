import * as Datastore from 'nedb'
import User from './User'
const SHA256 = require('crypto-js/sha256')

const dbUsersFileName = __dirname + '/server.db'
const userdb = new Datastore({ filename: dbUsersFileName, autoload: true });
userdb.ensureIndex({fieldName: 'username', unique: true }, (err) => {
  if (err) throw err
})

export const findUser = (username: string, callback: (user: User | null) => void) => {
  const lowercaseName = username.toLowerCase()
  userdb.findOne({ username: lowercaseName }, (err, doc) => {
    if (doc === null) callback(null)
    else callback(User.fromDocument(doc))
  })
}

export const updateUser = (username: string, newUser: User, callback: (err: Error) => void) => {
  const lowercaseName = username.toLowerCase()
  userdb.update({ username: lowercaseName }, newUser, {}, (err) => {
     callback(err)
  })
}

export const addBookmarkToUser = (username: string, bookId: number,
    chapterIndex: number, bookmarkFraction: number, callback: (err: Error) => void) => {
    findUser(username, (user) => {
        if (user) {
            user.addBookmark(bookId, chapterIndex, bookmarkFraction)
            updateUser(username, user, callback)
        } else {
            callback(Error('User not found'))
        }
    })
}

export const addUser = (username: string, plainPassword: string,
  callback: (error: Error, username: User) => void) => {
  const lowercaseName = username.toLowerCase()
  const newUser = new User(lowercaseName, SHA256(plainPassword).toString())
  userdb.insert(newUser, (err) => {
    callback(err, newUser)
  })
}
