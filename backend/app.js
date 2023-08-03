const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

/** Local Work Start **/
var https = app;
/** Local Work End **/

/** Live Work Start **/
// const httpsOn = require('https');
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/cyberoctopus.devtechnosys.tech/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/cyberoctopus.devtechnosys.tech/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/cyberoctopus.devtechnosys.tech/chain.pem', 'utf8');
// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };
// var https = httpsOn.createServer(credentials, app);
/** Live Work Start **/

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
require("dotenv").config();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mongo DB include
const DB = require("./utils/db");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware
const Auth = require("./middleware/adminAuth");

// Include admin routes
const adminRoute = require("./routes/admin/admin");
const technology = require("./routes/admin/technology");
const expert = require("./routes/admin/expert");
const customer = require("./routes/admin/customer");
const template = require("./routes/admin/template");
const cms = require("./routes/admin/cms");
const faq = require("./routes/admin/faq");
const attack = require("./routes/admin/attack");
const law = require("./routes/admin/law");
const quest = require("./routes/admin/quest");
const contact = require("./routes/admin/contact");
const global = require("./routes/admin/global");

// Include front routes
const authRoute = require("./routes/front/auth");
const homeRoute = require("./routes/front/home");
const questRoute = require("./routes/front/quest");

app.use("/front/home", homeRoute);

// setup admin routes
app.use("/admin/auth", adminRoute);
// setup front routes
app.use("/front/auth", authRoute);

// authenticate routes
app.use(Auth);
// authenticate routes

app.use("/front/quest", questRoute);

app.use("/admin/technology", technology);
app.use("/admin/expert", expert);
app.use("/admin/customer", customer);
app.use("/admin/template", template);
app.use("/admin/cms", cms);
app.use("/admin/faq", faq);
app.use("/admin/attack", attack);
app.use("/admin/law", law);
app.use("/admin/quest", quest);
app.use("/admin/contact", contact);
app.use("/admin/global", global);

// setup front routes

https.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
