import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import  twilio from 'twilio';
import  otpGenerator from 'otp-generator';
const router = express.Router();
import { UserModel } from "../models/Users.js";
const accountSid ="AC5ec0833aaaffdafd26c837a1b9dbe77f";
const authToken = "cfe9cf12c83c7b5c5e5d2da892097784";
const client = twilio(accountSid, authToken);
import {Vonage }from '@vonage/server-sdk'
const vonage = new Vonage({
  apiKey: "ab6b54f1",
  apiSecret: "k9lA3rxiWYFLWPLt"
})


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

//send otp
router.post("/sendotp", async (req, res,next) => {
  try {

    const { phoneNo } = req.body;
    const user = await UserModel.findOne({ phoneNo });
    

    if (!user) {
      next({ status: 400, message: PHONE_NOT_FOUND_ERR });
      return;
    }

    
    // generate otp
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    // save otp to user collection
    user.phoneOtp = otp;
    await user.save();
    // send otp to phone number
    {
      
       /* 
        client.messages
    .create({
     body: `Your OTP is ${otp}`,
     from: "+918617868717",
     to: "+91"+user.phoneNo,
   })
       */
    }
    const from = "Vonage APIs"
const to = user.phoneNo
const text = `your otp ${otp}`

    await vonage.sms.send({to, from, text})
    res.json("message sent successfully");
      
  }
  catch(error)
  {
    res.json(error);
  }
  });
//verifyotp
router.post("/verifyotp",  async (req, res) => {
  try {
    const { otp, phoneNo } = req.body;
    const user = await UserModel.findById(phoneNo);
    if (!user) {
      return res
        .status(400)
        .json({ message: "phoneNo doesn't exist" });
    }
    
    if (user.phoneOtp !== otp) {

      return res
      .status(400)
      .json({ message: "Incorrect OTP" });
    }
    if (user.phoneOtp == otp) {

      return res
      .status(400)
      .json({ message: "correct OTP" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    

    user.phoneOtp = "";
    await user.save();
    res.json({ token, userID: user._id });
    
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Incorrect OTP",phoneOtp:val})
  }
});


export { router as userRouter };

