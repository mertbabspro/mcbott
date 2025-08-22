const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: "zurnacraft.net",  // Minecraft sunucu IP
    port: 25565,             // Port
    username: "obbyzzafk",    // Kullanıcı adı
    version: "1.19"           // Minecraft sürümü
  })

  bot.on('login', () => console.log("Bot sunucuya bağlandı ✅ AFK bekliyor..."))

  bot.on('end', () => {
    console.log("Bağlantı koptu, 5 sn sonra tekrar bağlanacak...")
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log("Hata:", err))
}

createBot()
