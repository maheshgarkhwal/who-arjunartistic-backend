const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

app.use(cors());
app.options("*", cors());
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
const port = process.env.PORT || 5000;
const connectionStr =
  process.env.MONGO_URL ||
  "mongodb+srv://garkhwal:mahesh.g7@cluster0.4ubty.mongodb.net/test?authSource=admin&replicaSet=atlas-i3qwin-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongodb"))
  .catch((err) => {
    console.log(err);
  });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", catRoute);

app.listen(port, () => {
  console.log("listening to port 5000");
});
