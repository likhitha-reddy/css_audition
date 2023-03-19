const passport = require("passport");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require("express").Router();
const UserModel= require("../models/Users.js");
//------------------------------------------


router.get("/logingoogle/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENTLOGIN_URL,
		failureRedirect: "/logingoogle/failed",
	})
);


















/*------------------------------------------------ */
router.post("/register", async (req, res) => {
  const { email, password,name,phoneNo } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ email, password: hashedPassword,name,phoneNo });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "email or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "email or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});


module.exports = router;
