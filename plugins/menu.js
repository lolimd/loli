let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const chats = conn.chats.all()
const groups = chats.filter(v => v.jid.endsWith('g.us'))
const defaultMenu = {
  before: `
β­βγ  ππππ ππππ  γββ¬£
ββ΅Ν‘Νβͺ πππ΄π : *%name*
ββ΅Ν‘Νβͺ ππ΄πππΈππ° : *%limit* π»πΈπΌπΈπ
ββ΅Ν‘Νβͺ ππΎπ»π΄ : *%role*
ββ΅Ν‘Νβͺ π»π΄ππ΄π» : *%level (%exp / %maxexp)* 
ββ΅Ν‘Νβͺ ππΎππ°π» ππΏ : *%totalexp* ππΏ
β
ββγ ππππ πππ ππππ γ
ββ΅Ν‘Νβͺ π·π°ππΈ : *%week %weton* 
ββ΅Ν‘Νβͺ ππ°π½πΆπΆπ°π» : *%date*
ββ΅Ν‘Νβͺ ππ°π½πΆπΆπ°π» πΈππ»π°πΌ : *%dateIslamic*
ββ΅Ν‘Νβͺ ππ°πΊππ : *%time*
β
ββγ  ππππππππ  γ
ββ΅Ν‘Νβͺ ππΏππΈπΌπ΄ : *%uptime*
ββ΅Ν‘Νβͺ π³π°ππ°π±π°ππ΄ : %rtotalreg dari %totalreg 
ββ΅Ν‘Νβͺ πΌπ΄πΌπΎππ πππ΄π³ : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
β°βββββββββββ¬£
%readmore
ββββΦ γ πππ§π¨π₯ ππ’π§ γ Φββββ
` .trimStart(),
  header: 'β­βΦ γ %category γ Φβ',
  body: 'β\nββ¬‘ %cmd %islimit %isPremium\nβ',
  footer: 'β°ββββββββΦ\n',
  footerText:'ππΈπ’γΏπ³πͺ ππ§π€', 
  after: `ππΈπ’γΏπ³πͺ ππ§π€
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let bzz = fs.readFileSync('./vn/kri.mp3')
	let bzz2 = fs.readFileSync('./vn/itskri.mp3')
	let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'πππΌππΌ',
    'game': 'ππΌππ',
    'xp': 'πππ & πππππ',
    'nsfw': `ππππ ${global.opts['nsfw'] ? '' : '(Dinonaktifkan)'}`,
    'sticker': 'ππππππ',
    'edukasi': 'ππΏπππππ',
    'news': 'ππππ',
    'kerang': 'ππππΌππ πΌππΌππ½',
    'quotes': 'ππππππ',
    'admin': `πΌπΏπππ ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'rpg': 'ππππΎ πππ',
    'group': 'ππππ½',
    'anime': 'πΌππππ',
    'premium': 'πππππππ',
    'internet': 'ππππππππ',
    'image': 'ππΌππΏππ πππΌππ',
    'anonymous': 'πΌππππππππ πΎππΌπ',
    'nulis': 'ππΌπππππππππ & ππππ',
    'downloader': 'πΏππππππΌπΏππ',
    'tools': 'πππππ',
    'fun': 'πππ',
    'database': 'πΏπΌππΌπ½πΌππ',
    'vote': 'ππππππ',
    'absen': 'πΌπ½πππ',
    'quran': 'ππππΌπ',
    'audio': 'ππππππ½πΌπ πππΌππΌ',
    'jadibot': 'ππΌπΏπ π½ππ',
    'info': 'ππππ',
    '': 'ππΌπππΌ ππΌππππππ',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'Hentai',
    'bokep': 'Bokep'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'πππππ',
    'host': 'ππππ',
    'advanced': 'πΌπΏππΌππΎππΏ'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
			return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
                    "listMessage":  {
                        "title": `*${ucapan()}*`.trim(),
                        "description": `
π€ ${name}`.trim(),
          "description": `
βββγ π π πΌ π π π γβΦ
β¬£ π°πΊππΈπ΅ ππ΄π»π°πΌπ° : *${uptime}* ππΈπΌπ΄
β¬£ π±π°ππ΄ππ°πΈ : *${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? 'π pengisian' : ''}` : 'tidak diketahui'}*
β¬£ πππ΄π : *${Object.keys(global.db.data.users).length}* πΏπ΄π½πΆπΆππ½π°      β’   π π πΌ π π π  β’
β¬£ πΉπ°π³πΈπ±πΎπ : *${totaljadibot.length}* πΏπ΄π½πΆπΆππ½π°
β¬£ π±π»πΎπ²πΊ : *${conn.blocklist.length}* ππ΄ππ±π»πΎπ²πΊ
β¬£ π²π·π°π π±π°π½ : *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* π²π·π°π ππ΄ππ±π°π½π½π΄π³
β¬£ πππ΄π π±π°π½ : *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* α΄κ±α΄Κ α΄α΄ΚΚα΄Ι΄Ι΄α΄α΄
ββββββββββββΦ
`.trim(),
                        "footerText": "",
                        "buttonText": "Klik Disini",
                        "listType": "SINGLE_SELECT",
                        "sections": [
                            {
                                "rows": [{
                                    "title": "κ± α΄ α΄ α΄ α΄ κ±  Κ α΄ α΄",
                                    "description": "β ππ©ππ©πͺπ¨ πππ£ ππ£ππ€π§π’ππ¨π π½π€π©",
                                    "rowId": ".botstatus"
                                }, {
                                    "title": "Κ α΄ Κ α΄ κ±",
                                    "description": "β ππ¨ππ§ π?ππ£π π’ππ’ππ©πͺππ ππͺπ‘ππ¨ π½π€π©",
                                    "rowId": ".rules"
                                }, {
                                    "title": "κ±α΄α΄‘α΄  Κα΄α΄",
                                    "description": "β ππ£π©πͺπ  π?ππ£π ππ£πππ£ π’ππ‘ππππ© πππ§ππ π¨ππ¬π",
                                    "rowId": ".sewabot"
                                }, {
                                    "title": "Ι’ Κ α΄ α΄ α΄   Κ α΄ α΄",
                                    "description": "β πππ£ππ€π’ π½π€π© πππ£π πππ¨πͺπ  πππ’πππ£ π?πͺπ ",
                                    "rowId": ".gcbot"
                                }],
                                "title": "βββββββββββββββ² Iαα΄O α·OT β³ββββββββββββββ"
                            }, {
                                "rows": [{
                                    "title": `κ± α΄ α΄ α΄ α΄  α΄ α΄ Κ Ιͺ Ι΄ α΄ α΄ Κ`,
									"description": "β πππ’πππ§ππ ππ£ πππ’πͺπ πππ©πͺπ§ π½π€π©",
									"rowId": ".? all"
								}, {
									"title": "Ιͺ κ± Κ α΄ α΄",
									"description": "β πππ£πͺ πππ£π©ππ£π ππ¨π‘ππ’ πΏπ π½π€π©",
									"rowId": ".? quran"
								}, {
									"title": "α΄ α΄ α΄ α΄ α΄ κ± Ιͺ",
									"description": "β πππ£πͺ πππͺπ ππ¨π πΏπ π½π€π©",
									"rowId": ".? edukasi"
								}, {
									"title": "Ι΄ α΄ α΄‘ κ±",
									"description": "β πππ£πͺ π½ππ§ππ©π πΏπ π½π€π©",
									"rowId": ".? News"
								},  {
									"title": "Ι’ α΄ α΄ α΄",
									"description": "β πππ£πͺ πππ’π πΏπ π½π€π©",
									"rowId": ".? game"
								}, {
									"title": "α΄ α΄ Ιͺ α΄  Κ α΄ Ι’",
									"description": "β πππ£πͺ πππ’π πππ πΏπ π½π€π©",
									"rowId": ".? rpg"
								}, {
									"title": "x α΄",
									"description": "β πππ£πͺ ππ πΏππ£ πππ«ππ‘ πΏπ π½π€π©",
									"rowId": ".? xp"
								},  {
									"title": "Ι΄ κ± κ° α΄‘",
									"description": "β πππ£πͺ πΌπ¨πͺπ₯ππ£ πΏπ π½π€π©",
									"rowId": ".? nsfw"
								}, {
									"title": "Κ α΄ Ι΄ α΄ α΄ α΄  Ιͺ α΄ α΄ Ι’ α΄",
									"description": "β πππ£πͺ ππ€π©π€ πππ£ππ€π’ πΏπ π½π€π©",
									"rowId": ".? image"
							}, {
									"title": "κ± α΄ Ιͺ α΄ α΄ Κ",
									"description": "β πππ£πͺ π½πͺππ© ππ©ππ ππ§ πΏπ π½π€π©",
									"rowId": ".? stiker"
								}, {
									"title": "α΄ α΄ Κ α΄ Ι΄ Ι’  α΄ α΄ α΄ Ιͺ Κ",
									"description": "β πππ£πͺ πππ£πͺπ§πͺπ© πππ§ππ£π πππππ πΏπ π½π€π©",
									"rowId": ".? kerangajaib"
								}, {
									"title": "Q α΄ α΄ α΄ α΄ κ±",
									"description": "β πππ£πͺ ππͺπ€π©ππ¨ πΏπ π½π€π©",
									"rowId": ".? quotes"
								}, {
									"title": "α΄ α΄ α΄ Ιͺ Ι΄",
									"description": "β πππ£πͺ πΌππ’ππ£ ππ§π€πͺπ₯ πΏπ π½π€π©",
									"rowId": ".? admin"
								}, {
									"title": "Ι’ Κ α΄ α΄",
									"description": "β πππ£πͺ ππ§π€πͺπ₯ πΏπ π½π€π©",
									"rowId": ".? grup"
								}, {
									"title": "α΄ Κ α΄ α΄ Ιͺ α΄ α΄",
									"description": "β πππ£πͺ ππ£π©πͺπ  ππ§ππ’ππͺπ’ πΏπ π½π€π©",
									"rowId": ".? premium"
								}, {
									"title": "Ιͺ Ι΄ α΄ α΄ Κ Ι΄ α΄ α΄",
									"description": "β πππ£πͺ πΎππ§π πππ¨πͺππ©πͺ πΏπ π½π€π©",
									"rowId": ".? internet"
								}, {
									"title": "α΄ Ι΄ α΄ Ι΄ Κ α΄ α΄ α΄ κ±",
									"description": "β πππ£πͺ ππππ£π ππ£ πΌπ£π€π£π?π’π€πͺπ¨ πΎπππ© πΏπ π½π€π©",
									"rowId": ".? anonymous"
								}, {
									"title": "Ι΄ α΄ Κ Ιͺ κ±  &  Κ α΄ Ι’ α΄",
									"description": "β πππ£πͺ ππͺπ‘ππ¨ & ππ€ππ€ πΏπ π½π€π©",
									"rowId": ".? nulis"
								}, {
									"title": "α΄ α΄ α΄‘ Ι΄ Κ α΄ α΄ α΄ α΄ Κ",
									"description": "β πππ£πͺ πΏπ€π¬π£π‘π€ππ πππ¨πͺππ©πͺ πΏπ π½π€π©",
									"rowId": ".? downloader"
								}, {
									"title": "α΄ α΄ α΄ Κ κ±",
									"description": "β πππ£πͺ ππ€π€π‘π¨ πππ£π π½ππ¨π ππ ππͺπ£ππ ππ£ πΏπ π½π€π©",
									"rowId": ".? tools"
								}, {
									"title": "κ° α΄ Ι΄",
									"description": "β πππ£πͺ πΎππ§ππ πΏπ π½π€π©",
									"rowId": ".? fun"
								}, {
									"title": "α΄ α΄ α΄ α΄ Κ α΄ κ± α΄",
									"description": "β πππ£πͺ πππ’π₯ππ£ πππ¨πͺππ©πͺ πΏπ π½π€π©",
									"rowId": ".? database"
								}, {
									"title": "α΄  α΄ α΄ α΄  &  α΄ Κ κ± α΄ Ι΄",
									"description": "β πππ£πͺ ππ€π©π & πΌππ¨ππ£ πΏπ π½π€π©",
									"rowId": ".? vote"
								}, {
									"title": "α΄ α΄ Ι΄ Ι’ α΄ Κ α΄ Κ  κ± α΄ α΄ Κ α΄",
									"description": "β πππ£πͺ ππππ ππͺππ§π πΏπ π½π€π©",
									"rowId": ".? audio"
								}, {
									"title": "α΄ α΄ α΄ Ιͺ  Κ α΄ α΄",
									"description": "β πππ£πͺ ππππ π½π€π© πΏπ π½π€π©",
									"rowId": ".? jadibot"
								}, {
									"title": "α΄ Ι΄ Ιͺ α΄ α΄",
									"description": "β πππ£πͺ πΎππ§π πΌπ£ππ’π πΏπ π½π€π©",
									"rowId": ".? anime"
								}, {
									"title": "Ιͺ Ι΄ κ° α΄",
									"description": "β ππ£ππ€ πππ£π©ππ£π π½π€π©",
									"rowId": ".? info"
								}, {
									"title": "α΄ α΄ Ι΄ α΄ α΄  α΄ α΄ α΄ α΄ Ι’ α΄ Κ Ιͺ",
									"description": "β πππ£πͺ π π€π¨π€π£π πΏπ π½π€π©",
									"rowId": ".? tanpakategori"
								}, {
									"title": "α΄ α΄‘ Ι΄ α΄ Κ",
									"description": "β πππ£πͺ πππͺπ¨πͺπ¨ ππ¬π£ππ§",
									"rowId": ".? owner"
                                }],
                                "title": "βββββββββββββββ²  α©αͺαͺ α°Eαα  β³ββββββββββββββ"
                            }, {
                                "rows": [{
                                    "title": "α΄ α΄‘ Ι΄ α΄ Κ  Κ α΄ α΄",
                                    "description": "β πππ’ππ‘ππ  π½π€π©",
                                    "rowId": ".owner"
                                }, {
                                    "title": "α΄ α΄ Ι΄ α΄ κ± Ιͺ",
                                    "description": "β πΏπ€π£ππ¨π πͺπ£π©πͺπ  π’ππ£ππͺπ πͺπ£π ππ€π© ππππ§ ππ π©ππ π¨ππ‘ππ‘πͺ",
                                    "rowId": ".donasi"
                                }, {
                                    "title": "α΄ α΄ α΄ α΄  α΄ α΄ Ι΄ α΄ α΄ α΄ α΄",
                                    "description": "β πππ§ππ’ππ ππ¨ππ πͺπ£π©πͺπ  πͺπ¨ππ§ π?ππ£π π©ππ‘ππ π’ππ£πππͺπ£ππ ππ£ ππ€π©, πππ π πππ π ππ¨ππ‘ππππ£ ππ©ππͺ π₯ππ§π’ππ£π©πππ£ πππ¨π ππππ© π π π£π€π’π€π§ π€π¬π£ππ§",
                                    "rowId": ".owner"
                                }, {
                                    "title": "α΄ Κ α΄ Ι΄ α΄ κ±  Ι’ α΄ Ι΄ Ι’",
                                    "description": "β πππ§ππ’π π ππ¨ππ πππ£π?ππ  πͺπ£π©πͺπ  πͺπ¨ππ§ π?ππ£π π©ππ‘ππ πππ§π₯ππ§π©ππ¨ππ₯ππ¨π πππ‘ππ’ ππ€π©",
                                    "rowId": ".tqto"
                                }],
                                "title": "βββββββββββββββ² α­EααTαα­ β³ββββββββββββββ"
                            }
                        ], "contextInfo": 
						{ "stanzaId": m.key.id,
                        "participant": "0@s.whatsapp.net",
                        "remoteJid": "6283136505591-1614953337@g.us",
                        "quotedMessage": m.message
						}
                    }
                 }, {}), {waitForAck: true})
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // βγ DAFTAR MENU γ
    // β ${_p + command} all
    // β ${_p + command} game
    // β ${_p + command} xp
    // β ${_p + command} stiker
    // β ${_p + command} kerang
    // β ${_p + command} quotes
    // β ${_p + command} admin
    // β ${_p + command} group
    // β ${_p + command} premium
    // β ${_p + command} internet
    // β ${_p + command} anonymous
    // β ${_p + command} nulis
    // β ${_p + command} downloader
    // β ${_p + command} tools
    // β ${_p + command} fun
    // β ${_p + command} database
    // β ${_p + command} vote
    // β ${_p + command} quran
    // β ${_p + command} audio
    // β ${_p + command} jadibot
    // β ${_p + command} info
    // β ${_p + command} tanpa kategori
    // β ${_p + command} owner
    // βββββ  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send3ButtonLoc(m.chat, await (await fetch(image)).buffer(), text.trim(), `Creator by α΄Ήα΄Ώππ©π¨π π§π ΓαΦΝΓ\nRuntime : ${uptime}\nHari : ${week}, ${date}\nPowered by @s.whatsapp.net`, 'Pemilik Bot', `${_p}owner`, 'Sewa Bot', `${_p}sewabot`, 'Rules', `${_p}rules`, m)
    await conn.sendFile(m.chat, bzz, 'bzz.opus', null, m, true)
    await conn.sendFile(m.chat, bzz2, 'bzz2.opus', null, m, true)
    } catch (e) {
    conn.reply(m.chat, 'Delay, Sabar geng...', m)
    throw e
  }
}
handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(\?|menu|help)$/i

handler.register = true

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "π¬ *Turu Ngab*"
  if (time >= 4) {
    res = "π¬ *Pagi Ngab*"
  }
  if (time > 10) {
    res = "π¬ *Siang Ngab*"
  }
  if (time >= 15) {
    res = "π¬ *Sore Ngab*"
  }
  if (time >= 18) {
    res = "π¬ *Malam Ngab*"
  }
  return res
}
