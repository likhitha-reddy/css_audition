const mongoose = require('mongoose');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const userRouter = require("./routes/user.js");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();
app.use(express.json());
app.use(cors());

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);




app.use("/auth", userRouter);

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log("Server started"));