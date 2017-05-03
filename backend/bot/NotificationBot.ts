export const processTextCommand = (cmd: string, text: string, message: any) => {
    console.log(`User sent command: ${cmd} with text: ${message.text}`);
}

export const processTextMessage = (message: any) => {
    console.log(`${message.chat.first_name} sent message: ${message.text}`);
}

export const getToken: (() => string) = () => {
    return process.env.TELEGRAM_TOKEN;
}

export let updateOffset: number = 0
