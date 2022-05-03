const Tbot = require("node-telegram-bot-api");

const tokenim = "5360282519:AAFBMF2GCrxI5TVGVwAfbNYWvRoAZ3mogHA";

const botcham = new Tbot(tokenim, { polling: true });

botcham.on("message", (msg) => {
  botcham.sendMessage(msg.chat.id, "Voaleykum salom!");
});

botchamniki.on("message", (msg) => {
  console.log("Xabar keldi botdan", msg.text);
});

botcham.onText(/Buyurtma berish/gi, (msg) => {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ["<- Orqaga", "Qovun", "Tarvuz"],
        ["Piyoz", "Kartshka"],
        ["Sabzi"],
      ],
    }),
  };
  botcham.sendMessage(msg.chat.id, "NIma buyurtma qilasiz!", opts);
});

botcham.onText(/\/start|orqaga/gi, (msg) => {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ["⚙️Sozlash", "🚪Kirish", "💳Buyurtma berish"],
        ["Buzish", "Chiqish"],
        ["Endi", "Keyin", "Aloqa"],
      ],
    }),
  };
  botcham.sendMessage(msg.chat.id, "Salom botga hush kelibsiz!", opts);
});
