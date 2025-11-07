import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";

const app = express();
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

app.post("/webhook", async (req, res) => {
  try {
    const { subject, body } = req.body;
    await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio Sandbox WhatsApp number
      to: "whatsapp:+917974984632",  // Your WhatsApp number
      body: `📧 New Email\n\nSubject: ${subject}\n\n${body}`,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("🚀 Webhook running on port 3000"));
