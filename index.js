const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: "zurnacraft.net",
    port: 25565,
    username: "obbyzzafk",
    version: "1.19"
  })

  bot.on('login', () => {
    console.log("Bot sunucuya bağlandı ✅ Komutlar 5 saniye arayla gönderilecek...")

    // 1️⃣ /login
    setTimeout(() => {
      bot.chat("/login benbitben")
      console.log("/login komutu gönderildi ✅")
    }, 5000)

    // 2️⃣ /warp afk
    setTimeout(() => {
      bot.chat("/warp afk")
      console.log("/warp afk komutu gönderildi ✅")
    }, 10000)

    // 3️⃣ /shard balance
    setTimeout(() => {
      bot.chat("/shard balance")
      console.log("/shard balance komutu gönderildi ✅")
    }, 15000)

    // 4️⃣ Her dakika /shard pay obbyzz 170
    setTimeout(() => {
      setInterval(() => {
        bot.chat("/shard pay obbyzz 1")
        console.log("/shard pay obbyzz 1 komutu gönderildi ✅")
      }, 60000) // 60000ms = 1 dakika
    }, 15000) // Önce balance komutu gönderilsin
  })

  // Sunucudan gelen chat mesajlarını logla
  bot.on('chat', (username, message) => {
    console.log(`[CHAT] <${username}> ${message}`)
  })

  bot.on('whisper', (username, message) => {
    console.log(`[WHISPER] <${username}> ${message}`)
  })

  bot.on('end', () => {
    console.log("Bağlantı koptu, 5 sn sonra tekrar bağlanacak...")
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log("Hata:", err))
}

createBot()









