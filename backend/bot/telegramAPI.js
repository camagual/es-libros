"use strict";
exports.__esModule = true;
var longPoll = require('tgbots/longpoll');
var telegram = require('tgbots');
exports.secretToken = process.env.TELEGRAM_TOKEN;
exports.chat_id = process.env.TELEGRAM_CHAT;
if (!exports.secretToken || !exports.chat_id) {
    console.error('Warning: To be able to send notifications with telegram TELEGRAM_TOKEN and TELEGRAM_CHAT are necessary in your environment variables');
}
exports.sendTelegram = function (msg) {
    if (exports.secretToken && exports.chat_id)
        telegram.sendMessage(exports.chat_id, msg, exports.secretToken);
};
