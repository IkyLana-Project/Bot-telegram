const TelegramBot = require("node-telegram-bot-api")
// Kode ini mengimpor pustaka node-telegram-bot-api, yang digunakan untuk mengontrol bot Telegram dengan JavaScript (Node.js).

const token = "8005471630:AAHIa5G0DxXzkxew5HJsOZ5IwMbvoe4ku3A"
const options = {
    polling: true
}
// Polling adalah cara bot membaca pesan yang dikirim ke Telegram tanpa menggunakan webhook.
// Dengan polling: true, bot akan terus memeriksa pesan baru.

const ryubot = new TelegramBot(token, options)
// ryubot adalah objek dari bot yang akan menangani pesan dan perintah dari pengguna.

// ryubot.on("message", (callback) => {
//     const id = callback.from.id
//     ryubot.sendMessage(id, callback.text)
// })

const prefix = "."
// Prefix ini digunakan sebagai tanda awal untuk perintah bot.
// Misalnya, jika pengguna mengetik .halo, bot akan mengenali perintah itu.

const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)
// sayHi adalah ekspresi reguler (Regex) untuk mendeteksi perintah ".halo".
// gempa adalah Regex untuk mendeteksi perintah ".gempa".

ryubot.onText(sayHi, (callback) => {
    ryubot.sendMessage(callback.from.id, "Halo juga!")
})
// Ketika pengguna mengirim ".halo", bot akan membalas dengan "Halo juga!".
// callback.from.id adalah ID pengirim pesan, yang digunakan bot untuk mengirim balasan.

ryubot.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"
    // Ketika pengguna mengirim ".gempa", bot akan mengambil data gempa dari BMKG (Badan Meteorologi, Klimatologi, dan Geofisika).
    // BMKG_ENDPOINT adalah URL dasar untuk mengambil data dari BMKG.

    // Menggunakan fetch() untuk mengambil data JSON dari BMKG secara asynchronous (menunggu respons API).
    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {
        Infogempa: {
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
            }            
        }
    } = await apiCall.json()
    const BMKGImage = BMKG_ENDPOINT + Shakemap
    const resultText = `
    Waktu: ${Tanggal} | ${Jam}
    Besaran: ${Magnitude} SR
    Wilayah: ${Wilayah}
    Potensi: ${Potensi}
    Kedalaman: ${Kedalaman}
    `
    // resultText menyusun teks laporan gempa untuk dikirim ke pengguna.

    ryubot.sendPhoto(callback.from.id, BMKGImage, {
        caption: resultText
    // sendPhoto() digunakan untuk mengirim gambar peta gempa (Shakemap).
    // caption berisi informasi lengkap tentang gempa.
    })
})