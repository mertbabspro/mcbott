const mineflayer = require('mineflayer')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function createBot() {
  const bot = mineflayer.createBot({
    host: "zurnacraft.net",   // Buraya sunucu IP yaz
    port: 25565,                // Port, değişmediyse 25565
    username: "obbyzzafk"     // Cracked server için nick
    version:"1.19"
  })

  bot.on('login', () => console.log("Bot sunucuya bağlandı ✅ AFK bekliyor..."))

  bot.on('end', () => {
    console.log("Bağlantı koptu, 5 sn sonra tekrar bağlanacak...")
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log("Hata:", err))

  // Konsoldan girilen komutları sunucuya gönder
  rl.on('line', (input) => {
    if(input.startsWith('/')) bot.chat(input)
    else console.log("Komutlar / ile başlamalı!")
  })
}

createBot()
