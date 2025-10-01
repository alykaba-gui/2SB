const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const path = require("path");
const { log } = require("console");
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Spécifier le doissier contenant les fichiers statics
app.use(express.static("./public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

try {
  app.use("/", require("./routers/index.router"));
} catch (err) {
  console.log(err);
}
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // true pour 465, false pour autres ports
  service: "gmail",
  auth: {
    user: "alykaba3006@gmail.com",
    pass: "mfkewfzzjppfrssr",
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 30000,
  socketTimeout: 30000,
  // Réessayer en cas d'échec
  retries: 3,
  delayBetweenRetries: 1000,
});

// Vérification de la connexion
transporter.verify((error, success) => {
  if (error) {
    console.log("Erreur de configuration Nodemailer:", error);
  } else {
    console.log("Nodemailer est prêt à envoyer des emails");
  }
});
app.post("/sendMail", async (req, res) => {
  console.log("lolo");

  try {
    const data = req.body;

    const mailOptions = {
      from: data.email,
      to: process.env.GMAIL_USER, // Par défaut, s'envoie à soi-même
      subject: data.service,
      text: "Ceci est un email test envoyé depuis Express.js",
      html: `
              <div class="">
                  <h2>${data.firstName} 
                  ${data.lastName} </h2></br>
                  <p>
                  ${data.message}</p>
                  
              </div>
            `,
    };
    const mailOptionsRetour = {
      from: process.env.GMAIL_USER,
      to: data.email, // Par défaut, s'envoie à soi-même
      subject: "2SB-SARL</h3",
      text: "Ceci est un email test envoyé depuis Express.js",
      html: `
              <div class="">
                  <h2>2SB</h2></br>
                  <p>Merci pour votre email concernant  2SB-SARL .
                  Nous accusons réception de votre message et Nous vous confirmons qu'il a bien été reçu .
                  nous prendrons le temps nécessaire pour examiner votre demande et vous répondrons dans les plus brefs délais.
                  Si votre demande est urgente, n'hésitez pas à me contacter directement par téléphone(+224622077018).</p></br>
                  
                  site: <a href='http://facebook.com'>2SB.com</a>
              </div>
            `,
    };

    const info = await transporter.sendMail(mailOptions).then(async () => {
      await transporter.sendMail(mailOptionsRetour);
      res.json({
        success: true,
        message: "Email envoyé avec succès",
        messageId: info.messageId,
      });
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email",
      error: error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
