// Mineflayer ile register + chat logger + /smp + /warp afk botu
const mineflayer = require('mineflayer')

// ---- KULLANICI AYARLARI ----
const CONFIG = {
  host: 'zurnacraft.net', // sunucu adresi
  port: 25565,            // port
  username: 'benbitbenBot', // premium değilse bir takma ad
  version: '1.19',        // sunucu sürümü
  registerDelayMs: 10_000 // spawn sonrası /register gecikmesi
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
    console.log('🟢 Dünya yüklendi. Register komutu', CONFIG.registerDelayMs / 1000, 'sn sonra gönderilecek...')
    setTimeout(() => {
      if (attemptedRegister) return
      attemptedRegister = true

      // 1. Register komutu
      const registerCmd = `/register benbitben benbitben`
      console.log('📨 Komut gönderiliyor:', registerCmd)
      bot.chat(registerCmd)

      // 2. 5sn sonra /smp
      setTimeout(() => {
        console.log('📨 Komut gönderiliyor: /smp')
        bot.chat('/smp')

        // 3. 10sn sonra /warp afk
        setTimeout(() => {
          console.log('📨 Komut gönderiliyor: /warp afk')
          bot.chat('/warp afk')
        }, 10_000)

      }, 5000)

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
