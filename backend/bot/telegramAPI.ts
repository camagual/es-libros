import * as notificationBot from './NotificationBot'
const longPoll = require('tgbots/longpoll');
const telegram = require('tgbots')

export const secretToken = process.env.TELEGRAM_TOKEN
export const chat_id = process.env.TELEGRAM_CHAT

if (!secretToken || !chat_id) {
    console.error('Warning: To be able to send notifications with telegram TELEGRAM_TOKEN and TELEGRAM_CHAT are necessary in your environment variables')
}

export const sendTelegram = (msg: string) => {
    if (secretToken && chat_id)
        telegram.sendMessage(chat_id, msg, secretToken)
}
