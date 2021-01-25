var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  res.send({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
  next();
});
