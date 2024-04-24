const express = require("express");
const app = express();
const path = require("path");

// pseudo app cliente
app.use(express.static(path.join(__dirname)));

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  sendEvent({ message: "Conexão estabelecida com sucesso!" });

  const intervalId = setInterval(() => {
    sendEvent({
      time: new Date().toLocaleTimeString(),
      message: "Evento periódico",
    });
  }, 3000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
