const express = require("express");
const app = express();
const { response } = require("express");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var routes = require("./routes/routes");

app.get("/api/host", function (req, res) {
  res.send(
    "Hostname: " + process.env.HOSTNAME + "\nVersion: " + process.env.VERSION
  );
});

app.use(express.static("."));

routes.getAPI(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
