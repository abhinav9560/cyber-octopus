const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const User = require("../../models/user");
const roleId = 2;

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
    // body("mobile")
    //   .exists()
    //   .withMessage({
    //     message: "Please enter mobile",
    //   })
    //   .isLength({ min: 8 })
    //   .withMessage({
    //     message: "Please enter valid mobile",
    //   }),
    body("password").exists().withMessage({
      message: "Please enter password",
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

    req.body.technology = req.body.technology
      ? req.body.technology.split(",")
      : null;
    let temp = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      mobile: req.body.mobile,
      experience: req.body.experience,
      technology: req.body.technology,
      password: bcrypt.hashSync(req.body.password, salt),
      role: roleId,
    };

    if (req.file && req.file.filename) temp.image = req.file.filename;

    const newtech = new User(temp);
    newtech.save(async function (err, doc) {
      if (err) {
        let response = { status: false, message: err.message, data: {} };
        res.send(response);
      }
      if (doc) {
        let response = {
          status: true,
          message: "Addedd successfully",
          data: doc,
        };
        res.send(response);
      } else {
        let response = {
          status: false,
          message: "Oops something wrong please try after some time",
        };
        res.send(response);
      }
    });
  }
);

router.get("/get", async function (req, res) {
  let page = Number(req.query.page);
  let perPage = Number(req.query.perPage);
  let searchItem = req.query.searchItem;
  let query = {};
  if (page < 0 || page === 0) {
    response = {
      status: false,
      message: "Invalid page number, should start with 1",
    };
    return res.json(response);
  }
  query.skip = perPage * (page - 1);
  query.limit = perPage;
  let searchQuery = {
    role: roleId,
  };
  if (searchItem) {
    searchQuery.$or = [
      { fName: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") } },
      { lName: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") } },
      { email: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") } },
    ];
  }
  searchQuery.isDelete = false;
  User.countDocuments(searchQuery, function (err, totalCount) {
    if (err) {
      response = { status: false, message: "Error fetching data" };
    }
    User.find(searchQuery, {}, query, async function (err, data) {
      if (err) {
        response = { status: false, message: "Error fetching data" };
      } else {
        let totalPages = Math.ceil(totalCount / perPage);
        response = {
          status: true,
          data: data,
          pages: totalPages,
          page: page,
          perPage: perPage,
          length: data.length,
          imageUrl: process.env.baseUrl + "/uploads/",
        };
      }
      res.json(response);
    }).sort({ createdAt: -1 });
  });
});

router.delete("/delete", async function (req, res) {
  User.findOneAndUpdate(
    { _id: req.query._id },
    { isDelete: true },
    function (err, doc) {
      if (err) throw err;
      var response = {
        status: true,
        message: "Deleted successfully",
        data: {},
      };
      res.send(response);
    }
  );
});

router.post("/active", async function (req, res) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    { status: 1 },
    function (err, doc) {
      if (err) throw err;
      var response = {
        status: true,
        message: "Activated successfully",
        data: doc,
      };
      res.send(response);
    }
  );
});

router.post("/inactive", async function (req, res) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    { status: 0 },
    function (err, doc) {
      if (err) throw err;
      var response = {
        status: true,
        message: "De-activated successfully",
        data: doc,
      };
      res.send(response);
    }
  );
});

router.get("/getSingle", async function (req, res) {
  User.findOne({ _id: req.query._id, role: roleId }, function (err, doc) {
    if (err) throw err;
    if (doc) {
      var response = {
        status: true,
        message: "found successfully",
        data: doc,
        imageUrl: process.env.baseUrl + "/uploads/",
      };
      res.send(response);
    } else {
      var response = { status: false, message: "Something wrong", data: {} };
      res.send(response);
    }
  });
});

router.put(
  "/update",
  upload.single("image"),
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
    // body("mobile")
    //   .exists()
    //   .withMessage({
    //     message: "Please enter mobile",
    //   })
    //   .isLength({ min: 8 })
    //   .withMessage({
    //     message: "Please enter valid mobile",
    //   }),
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

    req.body.technology = req.body.technology.split(",");
    let temp = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      mobile: req.body.mobile,
      experience: req.body.experience,
      technology: req.body.technology,
    };
    if (req.file && req.file.filename) temp.image = req.file.filename;

    User.findOneAndUpdate({ _id: req.query._id }, temp, function (err, doc) {
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

router.get("/getAll", async function (req, res) {
  let admin = await User.findOne({ role: 1, status: 1, isDelete: false });
  User.find({ role: roleId, status: 1, isDelete: false }, function (err, doc) {
    if (err) throw err;
    if (doc) {
      doc.splice(0, 0, admin);
      var response = {
        status: true,
        message: "found successfully",
        data: doc,
        // imageUrl: process.env.baseUrl + "/uploads/",
      };
      res.send(response);
    } else {
      var response = { status: false, message: "Something wrong", data: {} };
      res.send(response);
    }
  }).lean();
});

module.exports = router;
