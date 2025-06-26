// Back-end/server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const otpStore = {}; // Simple in-memory storage for OTPs

// --- Endpoint to SEND OTP ---
app.post("/send-otp", (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).send({ message: "Phone number is required." });
  }

  // --- NEW: Clean the phone number by removing all spaces ---
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, "");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // --- UPDATED: Use the formatted number as the key ---
  otpStore[formattedPhoneNumber] = otp;
  console.log(`Generated OTP for ${formattedPhoneNumber}: ${otp}`);

  twilioClient.messages
    .create({
      body: `Your E-Paper Hub verification code is: ${otp}`,
      from: twilioWhatsAppNumber,
      // --- UPDATED: Use the formatted number here ---
      to: `whatsapp:${formattedPhoneNumber}`,
    })
    .then(() => res.status(200).send({ message: "OTP sent successfully." }))
    .catch((error) => {
      console.error("Twilio Error:", error);
      res.status(500).send({ message: "Failed to send OTP." });
    });
});

// --- Endpoint to VERIFY OTP and LOGIN ---
app.post("/verify-otp", async (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    return res
      .status(400)
      .send({ message: "Phone number and OTP are required." });
  }

  // --- NEW: Clean the phone number here as well for consistency ---
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, "");

  // --- UPDATED: Check against the formatted number ---
  if (otpStore[formattedPhoneNumber] === otp) {
    try {
      // --- UPDATED: Create token with the formatted number ---
      const customToken = await admin
        .auth()
        .createCustomToken(formattedPhoneNumber);
      delete otpStore[formattedPhoneNumber];
      res.status(200).send({ token: customToken });
    } catch (error) {
      res.status(500).send({ message: "Error logging in." });
    }
  } else {
    res.status(400).send({ message: "Invalid OTP." });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
