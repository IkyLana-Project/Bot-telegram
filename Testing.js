const { Telegraf } = require("telegraf");

// Ganti dengan token bot Telegram milikmu
const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const bot = new Telegraf(BOT_TOKEN);

// Handler untuk perintah /start
bot.start((ctx) => ctx.reply("Halo! Saya adalah bot Telegram."));

// Handler untuk perintah /help
bot.help((ctx) =>
  ctx.reply("Gunakan perintah berikut:\n/start - Mulai bot\n/help - Bantuan")
);

// Handler untuk pesan teks biasa
bot.on("text", (ctx) => {
  ctx.reply(`Kamu berkata: ${ctx.message.text}`);
});

// Menjalankan bot
bot.launch();
console.log("Bot sedang berjalan...");

// Menangani proses keluar
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
