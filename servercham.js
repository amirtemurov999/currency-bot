const server = require("express");
const app = server();
const port = 3005;

app.get("/", (req, res) => {
  res.send("<h1>Salomlar!</h1>");
});

app.listen(port, () => {
  console.log("Eshitishni boshladim!");
});
