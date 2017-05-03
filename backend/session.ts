import User from './db/User'
const sessions = require('client-sessions')
const secret: number = process.env.SESSION_SECRET || "34slfdjkvlgsft3"

export const expressMiddleware = sessions({
  cookieName: 'mySession',
  secret: secret,
  duration: 200 * 24 * 60 * 60 * 1000,
  activeDuration: 45 * 24 * 60 * 60 * 1000,
})

export const setUserSession = (user: string, req: any) => {
  req.mySession.user = user
}

export const removeUserSession = (req: any) => {
  req.mySession.user = undefined
}

export const getUserObjectFromSession = (req): User => {
  return req.userObject as User
}

export const getUserFromSession = (req: any): string | undefined => {
  return req.mySession.user
}
