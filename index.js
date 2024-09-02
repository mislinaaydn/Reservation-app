const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db.js");
const authRoutes = require("./routes/Auth.js");
const userRoutes = require("./routes/User.js");
const roomRoutes = require("./routes/Room.js");
const hotelRoutes = require("./routes/Hotel.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", roomRoutes);
app.use("/", hotelRoutes);

db();
const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});
