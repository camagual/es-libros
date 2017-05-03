"use strict";
exports.__esModule = true;
exports.processTextCommand = function (cmd, text, message) {
    console.log("User sent command: " + cmd + " with text: " + message.text);
};
exports.processTextMessage = function (message) {
    console.log(message.chat.first_name + " sent message: " + message.text);
};
exports.getToken = function () {
    return process.env.TELEGRAM_TOKEN;
};
exports.updateOffset = 0;
