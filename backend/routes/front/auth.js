const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const User = require("../../models/user");
const Template = require("../../models/template");

const roleId = 3;
const Helper = require("../../functions/function");
const Mailer = require("../../functions/mailer");

const { body, validationResult } = require("express-validator");

const Auth = require("../../middleware/adminAuth");

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
  "/checkEmail",
  [
    body("email")
      .exists()
      .withMessage({
        message: "Please enter email",
      })
      .isEmail()
      .withMessage({
        message: "Please enter valid email",
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

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({
        status: false,
        message: "Email Already Exist",
        data: user,
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Not exist",
        data: {},
      });
    }
  }
);

router.post(
  "/signup",
  [
    body("fName")
      .exists()
      .withMessage({
        message: "Please enter First Name",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Must be minimum 3 character",
      }),
    body("lName")
      .exists()
      .withMessage({
        message: "Please enter Last Name",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Must be minimum 3 character",
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
    body("work").exists().withMessage({
      message: "Please enter work",
    }),
    body("roleInCompany").exists().withMessage({
      message: "Please enter roleInCompany",
    }),

    body("password").exists().withMessage({
      message: "Please enter password",
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
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      work: req.body.work,
      roleInCompany: req.body.roleInCompany,
      password: bcrypt.hashSync(req.body.password, salt),
      role: roleId,
    };

    const newUser = new User(temp);
    newUser.save(async (err, doc) => {
      if (err) {
        let response = { status: false, message: err.message, data: {} };
        res.send(response);
      }
      if (doc) {
        let otp = Helper.generateOTP();
        let user = await User.updateOne(
          { _id: doc._id },
          {
            otp: otp,
            otpStatus: true,
          }
        );
        let template = await Template.findOne({ slug: "otp-verify-signup" });
        template.content = template.content.replace("{otp}", otp);
        let mailData = {
          email: doc.email,
          subject: template.title,
          html: template.content,
        };
        Mailer(mailData);

        let response = {
          status: true,
          message: "Signup Successfully! Please Verify OTP",
          data: doc,
        };
        res.send(response);
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

router.post(
  "/resendOtp",
  [
    body("_id").exists().withMessage({
      message: "Please send user id",
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

    let doc = await User.findById(req.body._id);

    let otp = Helper.generateOTP();
    let user = await User.updateOne(
      { _id: doc._id },
      {
        otp: otp,
        otpStatus: true,
      }
    );

    let template = await Template.findOne({ slug: "resend-otp" });
    template.content = template.content.replace("{otp}", otp);
    let mailData = {
      email: doc.email,
      subject: template.title,
      html: template.content,
    };
    Mailer(mailData);

    let response = {
      status: true,
      message: "OTP resend successfully",
      data: doc,
    };
    res.send(response);
  }
);

router.post(
  "/verifyOTP",
  [
    body("_id").exists().withMessage({
      message: "Please send user id",
    }),
    body("otp").exists().withMessage({
      message: "Please send otp",
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

    User.findOne(
      { _id: req.body._id, otp: req.body.otp, otpStatus: true },
      (err, result) => {
        if (err) throw err;
        if (!result) {
          let response = { status: false, message: "Invalid OTP", data: {} };
          res.send(response);
        } else {
          let updateData = {
            otp: null,
            otpStatus: false,
          };
          if (req.body.type == 1) updateData["verified"] = true;

          console.log(updateData, "===");
          console.log(req.body, "***");

          User.findOneAndUpdate(
            { _id: req.body._id },
            updateData,
            { new: true },
            (err, user) => {
              if (err) throw err;
              if (user) {
              }
            }
          );
          console.log(req.body.type);

          if (req.body.type == 3) {
            let userData = {
              _id: result._id,
              fName: result.fName,
              lName: result.lName,
              email: result.email,
              mobile: result.mobile,
              role: result.role,
              roleInCompany: result.roleInCompany,
              work: result.work,
              image: result.image,
            };
            jwt.sign(
              { _id: result._id },
              process.env.privateKey,
              (err, token) => {
                if (err) console.log(err);
                let response = {
                  status: true,
                  message: "Login Successfully",
                  data: userData,
                  token: token,
                  imageUrl: process.env.baseUrl + "/uploads/",
                };
                return res.send(response);
              }
            );
          } else {
            let response = {
              status: true,
              message: "OTP Verified Successfully",
              data: {},
            };
            res.send(response);
          }
        }
      }
    );
  }
);

router.post(
  "/forgot-password",
  [
    body("email").exists().withMessage({
      message: "Please send email",
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

    User.findOne({ email: req.body.email, isDelete: false }, (err, result) => {
      if (err) throw err;
      if (!result) {
        let response = {
          status: false,
          message: "Email not registered",
          data: {},
        };
        res.send(response);
      } else {
        let otp = Helper.generateOTP();
        User.findOneAndUpdate(
          { email: req.body.email },
          { otp: otp, otpStatus: true },
          { new: true },
          async (err, user) => {
            if (err) throw err;

            let template = await Template.findOne({ slug: "forgot-password" });
            template.content = template.content.replace("{otp}", otp);
            let mailData = {
              email: user.email,
              subject: template.title,
              html: template.content,
            };
            Mailer(mailData);
            let response = {
              status: true,
              message: "Please Check Otp Send To Email Address",
              data: result,
            };
            res.send(response);
          }
        );
      }
    });
  }
);

router.post(
  "/reset-password",
  [
    body("_id").exists().withMessage({
      message: "Please send user id",
    }),
    body("password").exists().withMessage({
      message: "Please send password",
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

    User.findOne({ _id: req.body._id }, (err, result) => {
      if (err) throw err;
      if (!result) {
        let response = { status: false, message: "Invalid User", data: {} };
        res.send(response);
      } else {
        User.findOneAndUpdate(
          { _id: req.body._id },
          {
            password: bcrypt.hashSync(req.body.password, salt),
            otp: null,
            otpStatus: false,
          },
          { new: true },
          (err, user) => {
            if (err) throw err;
            let response = {
              status: true,
              message: "Password reset successfully",
              data: {},
            };
            res.send(response);
          }
        );
      }
    });
  }
);

router.post(
  "/login",
  [
    body("email").exists().withMessage({
      message: "Please send email",
    }),
    body("password").exists().withMessage({
      message: "Please send password",
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

    const con = {
      $or: [
        { email: req.body.email, role: 1 },
        { email: req.body.email, role: roleId },
      ],
      isDelete: false,
    };
    User.findOne(con, "+password", async (err, doc) => {
      if (err) throw err;
      if (!doc) {
        let response = {
          status: false,
          message: "Email not registered",
          data: {},
        };
        res.send(response);
      } else {
        if (doc.status == 1) {
          if (bcrypt.compareSync(req.body.password, doc.password)) {
            if (!doc.verified) {
              //  agar verifed nhi hai

              let otp = Helper.generateOTP();
              let user = await User.updateOne(
                { _id: doc._id },
                {
                  otp: otp,
                  otpStatus: true,
                }
              );
              let template = await Template.findOne({
                slug: "otp-verify-signup",
              });
              template.content = template.content.replace("{otp}", otp);
              let mailData = {
                email: doc.email,
                subject: template.title,
                html: template.content,
              };
              Mailer(mailData);

              let response = {
                status: true,
                otp: true,
                message: "Please Verify OTP",
                data: doc,
                type: 1,
              };
              return res.send(response);
            }
            if (doc.isTwoFactor) {
              // agar two factor authenticaiton on h
              let otp = Helper.generateOTP();
              let user = await User.updateOne(
                { _id: doc._id },
                {
                  otp: otp,
                  otpStatus: true,
                }
              );
              let template = await Template.findOne({
                slug: "two-factor-auth",
              });
              template.content = template.content.replace("{otp}", otp);
              let mailData = {
                email: doc.email,
                subject: template.title,
                html: template.content,
              };
              Mailer(mailData);

              let response = {
                status: true,
                otp: true,
                message: "Please Verify OTP",
                data: doc,
                type: 2,
              };
              return res.send(response);
            }
            let userData = {
              _id: doc._id,
              fName: doc.fName,
              lName: doc.lName,
              email: doc.email,
              mobile: doc.mobile,
              role: doc.role,
              roleInCompany: doc.roleInCompany,
              work: doc.work,
              image: doc.image,
            };
            jwt.sign(
              { _id: doc._id },
              process.env.privateKey,
              (err, token) => {
                if (err) console.log(err);
                let response = {
                  status: true,
                  message: "Login Successfully",
                  data: userData,
                  token: token,
                  imageUrl: process.env.baseUrl + "/uploads/",
                };
                res.send(response);
              }
            );
          } else {
            let response = {
              status: false,
              message: "Invalid email or password",
              data: {},
            };
            res.send(response);
          }
        } else {
          let response = {
            status: false,
            message: "Your account is deactivated by admin.",
            data: {},
          };
          res.send(response);
        }
      }
    });
  }
);

router.use(Auth);

router.get("/profile", async (req, res) => {
  let user = await User.findById(req.doc).lean();
  if (user) {
    let response = {
      status: true,
      message: "Here is profile",
      data: user,
      imageUrl: process.env.baseUrl + "/uploads/",
    };
    res.send(response);
  } else {
    let response = {
      status: false,
      message: "No user found",
      data: {},
    };
    res.send(response);
  }
});

router.post("/profile", upload.single("image"), async (req, res) => {
  let doc = {
    fName: req.body.fName,
    lName: req.body.lName,
    work: req.body.work,
    roleInCompany: req.body.roleInCompany,
  };
  if (req.file && req.file.filename) doc.image = req.file.filename;

  let user = await User.findByIdAndUpdate(req.doc, doc, { new: true });
  if (user) {
    let response = {
      status: true,
      message: "Profile updated successfully",
      data: user,
      imageUrl: process.env.baseUrl + "/uploads/",
    };
    res.send(response);
  } else {
    let response = {
      status: false,
      message: "User not found",
      data: {},
    };
    res.send(response);
  }
});

router.post("/change-password", async (req, res) => {
  User.findById(req.doc, "+password", async (err, doc) => {
    if (err) throw err;
    if (doc) {
      if (bcrypt.compareSync(req.body.oldPassword, doc.password)) {
        if (req.body.oldPassword == req.body.password) {
          let response = {
            status: false,
            message: "Current password and New password can not be same",
            data: {},
          };
          return res.send(response);
        }

        let user = await User.findByIdAndUpdate(
          req.doc,
          {
            password: bcrypt.hashSync(req.body.password, salt),
          },
          { new: true }
        );
        if (user) {
          let response = {
            status: true,
            message: "Password updated successfully",
            data: user,
          };
          res.send(response);

          let template = await Template.findOne({ slug: "change-password" });
          let mailData = {
            email: user.email,
            subject: template.title,
            html: template.content,
          };
          Mailer(mailData);
        }
      } else {
        let response = {
          status: false,
          message: "Current password do not match",
          data: {},
        };
        res.send(response);
      }
    } else {
      let response = {
        status: false,
        message: "User not found",
        data: {},
      };
      res.send(response);
    }
  });
});

router.post("/editSetting", async (req, res) => {
  let doc = {
    isTwoFactor: req.body.isTwoFactor,
  };

  let user = await User.findByIdAndUpdate(req.doc, doc, { new: true });
  if (user) {
    let response = {
      status: true,
      message: "Profile updated successfully",
      data: user,
      imageUrl: process.env.baseUrl + "/uploads/",
    };
    res.send(response);
  } else {
    let response = {
      status: false,
      message: "User not found",
      data: {},
    };
    res.send(response);
  }
});

module.exports = router;
