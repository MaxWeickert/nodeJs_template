const express = require("express");
const app = express();
const { response } = require("express");

app.get("/api/host", function (req, res) {
  res.send(
    "Hostname: " + process.env.HOSTNAME + "\nVersion: " + process.env.VERSION
  );
});

app.use(express.static("."));

//Dateien der Node.js-Routen laden
var getApi = require("./routes/getApi");
var getRawData = require("./routes/getRawData");

//Node.js-Routen initialisieren
getApi(app);
getRawData(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
