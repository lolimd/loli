let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => await conn.send3ButtonLoc(m.chat, await (await fetch(image)).buffer(), `
*BROADCAST ππΈπ’γΏπ³πͺ ππ§π€!*

${text}
`.trim(), 'Whatsapp bot', 'MENU', '.menu', 'SC BOT', '.sc', 'DONASI', '.donasi', m)
handler.help = ['fakebc <text>']
handler.tags = ['owner']
handler.command = ['fakebc']
handler.rowner = true

module.exports = handler
