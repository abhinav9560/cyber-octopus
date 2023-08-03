const express = require("express");
const router = express.Router();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const CMS = require("../../models/cms");
const FAQ = require("../../models/faq");
const Attack = require("../../models/attack");
const Law = require("../../models/law");
const Contact = require("../../models/contact");
const Global = require("../../models/global");
const User = require("../../models/user");

const { body, validationResult } = require("express-validator");

const Mailer = require("../../functions/mailer");

router.get("/getCms", async (req, res) => {
  let cms = await CMS.findOne({ slug: req.query.slug });
  if (cms) {
    res.status(200).json({
      status: true,
      message: "CMS page",
      data: cms,
    });
  } else {
    res.status(200).json({
      status: false,
      message: "Not data found",
      data: {},
    });
  }
});

router.get("/getFaq", async (req, res) => {
  let faq = await FAQ.find({ status: true, isDelete: false });
  if (faq) {
    res.status(200).json({
      status: true,
      message: "FAQ page",
      data: faq,
    });
  } else {
    res.status(200).json({
      status: false,
      message: "Not data found",
      data: {},
    });
  }
});

router.get("/getmap", async (req, res) => {
  try {
   
    let attacks = await Attack.find({
      country: req.query.name,
      status: 1,
      isDelete: false,
    });

    let law = await Law.findOne({
      country: req.query.name,
      status: 1,
      isDelete: false,
    });

    

    const response = await fetch(
      `https://react-vector-maps.netlify.app/maps/${req.query.name}.json`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    let temp = {
      attacks,
      data,
      law
    };

    res.status(200).json({
      status: true,
      message: "Map Data",
      data: temp,
    });
  } catch {
    res.status(200).json({
      status: false,
      message: "Something Went Wrong",
      data: {},
    });
  }
});

router.get("/getSingleAttack", async (req, res) => {
  try {
    let attacks = await Attack.findById(req.query.id);
    console.log(attacks);

    const response = await fetch(
      `https://react-vector-maps.netlify.app/maps/${attacks.country}.json`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    let temp = {
      attacks,
      data,
    };

    res.status(200).json({
      status: true,
      message: "Single data of attack",
      data: temp,
    });
  } catch {
    res.status(200).json({
      status: false,
      message: "Something Went Wrong",
      data: {},
    });
  }
});

router.post(
  "/contact",
  [
    body("name").exists().withMessage({
      message: "Please enter name",
    }),
    body("email")
      .exists()
      .withMessage({
        message: "Please enter email",
      })
      .isEmail()
      .withMessage({
        message: "Please enter valid email",
      }),
    body("message").exists().withMessage({
      message: "Please enter message",
    }),
  ],
  async (req, res) => {
    // For Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        status: false,
        message: errors.errors[0].msg.message,
        data: {},
      });
    }
    let temp = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };

    const newContact = new Contact(temp);
    newContact.save((err, doc) => {
      if (err) {
        let response = { status: false, message: err.message, data: {} };
        res.send(response);
      }
      if (doc) {
        let response = {
          status: true,
          message: "Contact us successfully submitted",
          data: {},
        };
        res.send(response);

        let mailData = {
          email: doc.email,
          subject: "Contact Us Form Submitted",
          html: `<p>Contact Us Form Submitted</p>`,
        };
        Mailer(mailData);
      } else {
        let response = {
          status: false,
          message: "Oops something wrong please try after some time",
          data: {},
        };
        res.send(response);
      }
    });
  }
);

router.get("/getGlobalSetting", async (req, res) => {
  Global.findOne({ type: "Global" }, function (err, doc) {
    if (err) throw err;
    if (doc) {
      let response = { status: true, message: "found successfully", data: doc };
      res.send(response);
    } else {
      let response = { status: false, message: "Something wrong", data: doc };
      res.send(response);
    }
  });
});

module.exports = router;
