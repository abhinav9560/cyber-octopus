const express = require("express");
const router = express.Router();

const Global = require("../../models/global");

const { body, validationResult } = require("express-validator");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/insert",
  upload.single("image"),
  [
    body("title")
      .exists()
      .withMessage({
        message: "Please enter title",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Must be minimum 3 character",
      }),
  ],
  async function (req, res) {
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
      title: req.body.title,
      description: req.body.description,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkden: req.body.linkden,
      creditType: req.body.creditType,
      creditLiveSession: req.body.creditLiveSession,
    };

    Global.findOneAndUpdate({ type: "Global" }, temp, function (err, doc) {
      if (err) throw err;
      if (doc) {
        var response = {
          status: true,
          message: "Updated successfully",
          data: doc,
        };
        res.send(response);
      } else {
        var response = {
          status: false,
          message: "Something wrong",
          data: doc,
        };
        res.send(response);
      }
    });
  }
);

router.get("/getSingle", async function (req, res) {
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
