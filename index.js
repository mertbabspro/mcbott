// Mineflayer ile kayıt + chat logger + /smp + /warp afk botu
const mineflayer = require('mineflayer')

// ---- KULLANICI AYARLARI ----
const CONFIG = {
  host: 'zurnacraft.net', // sunucu adresi
  port: 25565,            // port
  username: 'obbyzzzafk', // premium değilse bir takma ad
  version: '1.19',        // sunucu sürümü
  registerDelayMs: 10_000 // spawn sonrası /kayıt gecikmesi
}

// ---- YARDIMCI: rastgele gmail ----
function randomLetters(len = 10) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let s = ''
  for (let i = 0; i < len; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)]
  return s
}
function randomGmail() {
  return `${randomLetters(10)}@gmail.com`
}

// ---- BOT OLUŞTURUCU ----
let restarting = false
function createBot() {
  const bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    version: CONFIG.version,
  })

  let attemptedRegister = false

  // Sohbeti terminale yaz
  bot.on('message', (jsonMsg) => {
    console.log(jsonMsg.toString())
  })

  bot.on('login', () => {
    console.log('✅ Bot sunucuya giriş yaptı.')
  })

  // Spawn olduktan sonra işlemler
  bot.once('spawn', () => {
    console.log('🟢 Dünya yüklendi. Kayıt komutu', CONFIG.registerDelayMs / 1000, 'sn sonra gönderilecek...')
    setTimeout(() => {
      if (attemptedRegister) return
      attemptedRegister = true

      // 1. Kayıt komutu
      const email = randomGmail()
      const registerCmd = `/kayıt benbitben ${email}`
      console.log('📨 Komut gönderiliyor:', registerCmd)
      bot.chat(registerCmd)

      // 2. Hemen ardından /smp
      setTimeout(() => {
        console.log('📨 Komut gönderiliyor: /smp')
        bot.chat('/smp')

        // 3. 10 sn sonra /warp afk
        setTimeout(() => {
          console.log('📨 Komut gönderiliyor: /warp afk')
          bot.chat('/warp afk')
        }, 10_000)

      }, 2000) // /smp için 2sn bekleme (server algılasın diye)

    }, CONFIG.registerDelayMs)
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Kick yedik:', reason)
  })

  bot.on('end', () => {
    console.log('🔁 Bağlantı koptu. 5 sn sonra yeniden denenecek...')
    if (!restarting) {
      restarting = true
      setTimeout(() => {
        restarting = false
        createBot()
      }, 5000)
    }
  })

  bot.on('error', (err) => {
    console.error('⚠️ Hata:', err?.message || err)
  })
}

createBot()
