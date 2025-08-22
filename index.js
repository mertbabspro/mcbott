const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: "zurnacraft.net",
    port: 25565,
    username: "obbyzzafk",
    version: "1.19"
  })

  bot.on('login', () => {
    console.log("Bot sunucuya bağlandı ✅ 5 saniye sonra /register gönderecek...")

    // 5 saniye bekle, sonra komutu gönder
    setTimeout(() => {
      bot.chat("/login benbitben")
      console.log("Komut gönderildi ✅")
    }, 5000)
  })
  setTimeout(() => {
      bot.chat("/warp afk")
      console.log("Komut gönderildi ✅")
    }, 5000)
  })


  bot.on('end', () => {
    console.log("Bağlantı koptu, 5 sn sonra tekrar bağlanacak...")
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log("Hata:", err))
}

createBot()

