var express = require("express");
var path = require("path");
var app = express();
var router = express.Router();
var typingDnaVerifyClient = require("typingdna-verify-client");

var typingDnaClient = new typingDnaVerifyClient({
  clientId: "", // fill in
  secret: "", // fill in
  applicationId: "", // fill in
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

router.get("/verify", (req, res) => {
  const typingDnaDataAttributes = typingDnaClient.getDataAttributes({
    email: "", // fill in
    phone: "",
    language: "EN",
    mode: "standard",
  });
  res.render("verify", typingDnaDataAttributes);
});

router.get("/result", (req, res) => {
  const otp = req.query.otp;
  const success = req.query.success;

  typingDnaClient
    .validateOTP({ email: "", phoneNumber: "" }, otp) // fill in
    .then((data) => {
      res.render("result", {
        otp: otp,
        success: success,
        message: data.message,
      });
    })
    .catch((e) =>
      res.render("result", {
        otp: otp,
        success: success,
        message: e,
      })
    );
});

app.use("/", router);
app.listen(3000);

console.log("Listening on port 3000");
