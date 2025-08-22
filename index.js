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

    // İlk komut: /login
    setTimeout(() => {
      bot.chat("/login benbitben")
      console.log("/login komutu gönderildi ✅")
    }, 5000) // 5 saniye bekle

    // İkinci komut: /warp afk
    setTimeout(() => {
      bot.chat("/warp afk")
      console.log("/warp afk komutu gönderildi ✅")
    }, 10000) // 10 saniye toplam: önce 5s bekle + ikinci komut
  })

  bot.on('end', () => {
    console.log("Bağlantı koptu, 5 sn sonra tekrar bağlanacak...")
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log("Hata:", err))
}

createBot()
