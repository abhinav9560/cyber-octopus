const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const roleId = 1;

const commonHelper = require("../../functions/function");
const mailSend = require("../../functions/mailer");
const Message = require("../../functions/message");

const User = require("../../models/user");
const Thread = require("../../models/thread");
const Transaction = require("../../models/transaction");
const Quest = require("../../models/quest");

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

router.get("/startup", async function (req, res) {
  const user = new User({
    fName: "Super",
    lName: "Admin",
    email: "admin@getnada.com",
    mobile: "9587293059",
    password: bcrypt.hashSync("Qwerty@123", salt),
    role: 1,
  });

  try {
    user.save((err, doc) => {
      if (err)
        res.status(400).json({
          status: false,
          message: err.message,
        });
      if (doc) {
        let response = {
          status: true,
          message: "Super Admin Created Succesfully",
          data: doc,
        };
        res.send(response);
      }
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
});

router.post("/login", async function (req, res) {
  const con = {
    $or: [
      { email: req.body.email, role: 1 },
      { email: req.body.email, role: 2 },
    ],
    isDelete: false,
  };
  User.findOne(con, "+password", async function (err, doc) {
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
          let userData = {
            _id: doc._id,
            fName: doc.fName,
            lName: doc.lName,
            email: doc.email,
            mobile: doc.mobile,
            role: doc.role,
          };
          jwt.sign(
            { _id: doc._id },
            process.env.privateKey,
            function (err, token) {
              if (err) console.log(err);
              let response = {
                status: true,
                message: "Login Successfully",
                data: userData,
                token: token,
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
});

router.post("/forgot-password", async function (req, res) {
  User.findOne(
    { email: req.body.email, isDelete: false },
    function (err, result) {
      if (err) throw err;
      if (!result) {
        let response = {
          status: false,
          message: "Email not registered",
          data: {},
        };
        res.send(response);
      } else {
        let otp = commonHelper.generateOTP();
        User.findOneAndUpdate(
          { email: req.body.email },
          { otp: otp, otpStatus: true },
          { new: true },
          (err, user) => {
            if (err) throw err;
            const passwordResetUrl =
              process.env.adminBaseUrl +
              "/auth/reset-password/" +
              Buffer.from(user._id + ":" + otp).toString("base64");
            const mailData = {
              email: req.body.email,
              subject: "Forgot Password",
              html:
                "Link to reset your password is <a href='" +
                passwordResetUrl +
                "'>Reset</a>",
            };
            mailSend(mailData);
            let response = {
              status: true,
              message:
                "A link has been sent to your registered email id. Kindly click on it to reset your password",
              data: {},
            };
            res.send(response);
          }
        );
      }
    }
  );
});

router.post("/verifyOTP", async function (req, res) {
  User.findOne(
    { _id: req.body._id, otp: req.body.otp, otpStatus: true },
    function (err, result) {
      if (err) throw err;
      if (!result) {
        let response = { status: false, message: "Invalid Url", data: {} };
        res.send(response);
      } else {
        User.findOneAndUpdate(
          { _id: req.body._id },
          {
            otp: null,
            otpStatus: false,
          },
          { new: true },
          function (err, user) {
            if (err) throw err;
            if (user) {
            }
          }
        );
        let response = { status: true, message: "Success", data: {} };
        res.send(response);
      }
    }
  );
});

router.post("/reset-password", async function (req, res) {
  if (req.body.password) {
    User.findOne({ _id: req.body._id }, function (err, result) {
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
          function (err, user) {
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
  } else {
    let response = {
      status: false,
      message: "Please provide valid password",
      data: {},
    };
    res.send(response);
  }
});

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
    email: req.body.email,
    mobile: req.body.mobile,
    gender: req.body.gender,
  };
  if (req.file && req.file.filename) doc.image = req.file.filename;

  let user = await User.findByIdAndUpdate(req.doc, doc, { new: true });
  if (user) {
    let response = {
      status: true,
      message: "Profile updated successfully",
      data: user,
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
  User.findById(req.doc, "+password", async function (err, doc) {
    if (err) throw err;
    if (doc) {
      if (bcrypt.compareSync(req.body.currentPassword, doc.password)) {
        let user = await User.findByIdAndUpdate(
          req.doc,
          {
            password: bcrypt.hashSync(req.body.newPassword, salt),
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

router.get("/dashborad", async (req, res) => {
  let users = await User.find({ isDelete: false, role: 3 })
    .limit(5)
    .sort({ createdAt: -1 });
  let threads = await Thread.find({ isDelete: false, status: 1 })
    .limit(5)
    .sort({ createdAt: -1 })
    .populate("threadBy", "fName lName");

  let transactions = await Transaction.find({ isDelete: false })
    .limit(5)
    .sort({ createdAt: -1 })
    .populate("userId", "fName lName image email");

  if (users && threads) {
    let imageUrl = process.env.baseUrl + "/uploads/";
    let response = {
      status: true,
      message: "Getting Data",
      users,
      threads,
      transactions,
      imageUrl,
    };
    res.send(response);
  } else {
    let response = {
      status: false,
      message: "Something Went Wrong",
      data: {},
    };
    res.send(response);
  }
});

router.get("/getChartData", async function (req, res) {
  try {
    let choosedYear = parseInt(req.body.year);
    if (choosedYear) {
      var currentYear = parseInt(choosedYear);
      var RecordsFrom = "01/01/" + currentYear.toString();
      var RecordsTo = "01/01/" + (currentYear + 1).toString();
    } else {
      var currentYear = new Date().getFullYear();
      var RecordsFrom = "01/01/" + currentYear.toString();
      var RecordsTo = "01/01/" + (currentYear + 1).toString();
    }

    let customerData = await commonHelper.getCustomer(RecordsFrom, RecordsTo);
    let getRevenuePerUser = await commonHelper.getRevenuePerUser(
      RecordsFrom,
      RecordsTo
    );

    customerData = await commonHelper.getChartInfo(customerData);

    let data = { data: customerData, getRevenuePerUser };
    let response = { status: 1, data: data };
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getChartDataInsight", async function (req, res) {
  try {
    let choosedYear = parseInt(req.body.year);
    if (choosedYear) {
      var currentYear = parseInt(choosedYear);
      var RecordsFrom = "01/01/" + currentYear.toString();
      var RecordsTo = "01/01/" + (currentYear + 1).toString();
    } else {
      var currentYear = new Date().getFullYear();
      var RecordsFrom = "01/01/" + currentYear.toString();
      var RecordsTo = "01/01/" + (currentYear + 1).toString();
    }

    let customerData = await commonHelper.getCustomer(RecordsFrom, RecordsTo);
    let getRevenuePerUser = await commonHelper.getRevenuePerUser(
      RecordsFrom,
      RecordsTo
    );

    customerData = await commonHelper.getChartInfo(customerData);

    let quest = await Quest.countDocuments({
      isDelete: false,
      status: 1,
    });

    let questComplete = await Quest.countDocuments({
      isDelete: false,
      status: 1,
      isComplete: true,
    });

    let priorityQuest = await Quest.countDocuments({
      isDelete: false,
      status: 1,
      questType: 1,
    });

    let meetingQuest = await Quest.countDocuments({
      isDelete: false,
      status: 1,
      isLiveSession: true,
    });

    let percent = (questComplete * 100) / quest;

    let questData = {
      quest,
      questComplete,
      percent,
    };

    let priorityPercent = (priorityQuest * 100) / quest;

    let priority = {
      priorityQuest,
      priorityPercent,
    };

    let meetingPercent = (meetingQuest * 100) / quest;
    let meeting = {
      meetingQuest,
      meetingPercent,
    };

    let questPerUser = await Quest.aggregate([
      { $match: { status: 1, isDelete: false } },
      {
        $group: {
          _id: "$customerId",
          total: { $sum: 1 },
          priority: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$questType", 1],
                },
                then: 1,
                else: 0,
              },
            },
          },
          solved: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$isComplete", true],
                },
                then: 1,
                else: 0,
              },
            },
          },
          meeting: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$isLiveSession", true],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    let userPerIndustry = await User.aggregate([
      { $match: { status: 1, isDelete: false, role: 3 } },
      { $group: { _id: "$work", total: { $sum: 1 } } },
    ]);

    let data = {
      data: customerData,
      getRevenuePerUser,
      questData,
      priority,
      meeting,
      questPerUser,
      userPerIndustry,
    };
    let response = { status: 1, data: data };
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
