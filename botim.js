const Tbot = require("node-telegram-bot-api");
const apiKey = "a93759dffa-1070e9ebe7-raymnb";
const tokenim = "5360282519:AAFBMF2GCrxI5TVGVwAfbNYWvRoAZ3mogHA";
const axios = require("axios");
const botcham = new Tbot(tokenim, { polling: true });
let status = false;
let currency = {
  from: "",
  to: "",
};
botcham.onText(/\/start|orqaga/gi, (msg) => {
  const opts = {
    // reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ["🇷🇺RUB-USD🇺🇸", "🇷🇺RUB-EUR🇪🇺", "🇷🇺RUB-UZS🇺🇿"],
        ["🇺🇸USD-RUB🇷🇺", "🇺🇸USD-EUR🇪🇺", "🇺🇸USD-UZS🇺🇿"],
        ["🇪🇺EUR-RUB🇷🇺", "🇪🇺EUR-USD🇺🇸", "🇪🇺EUR-UZS🇺🇿"],
        ["🇺🇿UZS-RUB🇷🇺", "🇺🇿UZS-USD🇺🇸", "🇺🇿UZS-EUR🇪🇺"],
        ["Bot haqida"],
      ],
    }),
  };
  if (msg.text == "Orqaga") {
    status = false;
  }
  botcham.sendMessage(msg.chat.id, "konvertatsiyani boshlaymizmi!", opts);
});

botcham.onText(/.*[a-z]{3}-[a-z]{3}.*/gi, async (msg) => {});

botcham.on("message", async (msg) => {
  if (/[a-z]{3}-[a-z]{3}/gi.test(msg.text)) {
    console.log("Moslik");
    const [from, to] = msg.text.slice(4, 11).split("-");

    currency = { from, to };
    status = true;
    const opts = {
      // reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [["Orqaga"]],
      }),
    };
    botcham.sendMessage(msg.chat.id, "qiymat kiriting", opts);
  } else if (status && msg.text !== "Orqaga") {
    const qiymat = msg.text * 1;
    try {
      const res = await axios.get(
        `https://api.fastforex.io/convert?from=${currency.from}&to=${currency.to}&amount=${qiymat}&api_key=a93759dffa-1070e9ebe7-raymnb`
      );
      const format = Intl.NumberFormat("uz-UZ", {
        style: "currency",
        currency: currency.to,
      });
      botcham.sendMessage(
        msg.chat.id,
        format.format(res.data.result[currency.to.toUpperCase()])
      );
    } catch (error) {
      botcham.sendMessage(msg.chat.id, "hatolik");
    }
  } else if (msg.text !== "Oldinga") {
    botcham.sendMessage(
      msg.chat.id,
      'Bot 02.05.2022 kuni "Developerda House"da ishga tushurildi'
    );
  }
});
