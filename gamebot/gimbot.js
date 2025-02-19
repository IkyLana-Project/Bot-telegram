// Import modul node-telegram-bot-api untuk membuat bot Telegram.
const TelegramBot = require("node-telegram-bot-api")

const token = "7515836185:AAFCZ-N5pwvpv-doQ5GZxPoUPqEx-V9JhZ4"
const options = {
    polling: true
}

const bot = new TelegramBot(token, options)

// Menyimpan angka yang harus ditebak
let angkaBenar = Math.floor(Math.random() * 10) + 1;

// Perintah untuk memulai permainan
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Selamat datang di permainan Tebak Angka!\nCoba tebak angka antara 1 hingga 10 dengan mengetik: /tebak [angka]");
})

// Perintah untuk menebak angka
bot.onText(/\/tebak (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const angkaTebakan = parseInt(match[1]); // Mengambil angka dari pesan pengguna

    if (angkaTebakan === angkaBenar) {
        bot.sendMessage(chatId, `🎉 Selamat! Kamu benar! Angkanya adalah ${angkaBenar}.\nAku akan memilih angka baru...`);
        angkaBenar = Math.floor(Math.random() * 10) + 1; // Pilih angka baru
    } else {
        bot.sendMessage(chatId, `❌ Salah! Coba lagi.`);
    }
});

// Menangani pesan selain perintah
bot.on("message", (msg) => {
    if (!msg.text.startsWith("/")) {
        bot.sendMessage(msg.chat.id, "Gunakan perintah /tebak [angka] untuk bermain.");
    }
});