const express = require("express");
const router = express.Router();

const Quest = require("../../models/quest");
const Thread = require("../../models/thread");

const { body, validationResult } = require("express-validator");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname.trim().replace(" ", "")}`);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/insert",
  [
    body("nameEN")
      .exists()
      .withMessage({
        message: "Please enter name (en)",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Must be minimum 3 character",
      }),
    body("nameGR")
      .exists()
      .withMessage({
        message: "Please enter name (gr)",
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

    const newtech = new Quest({
      nameEN: req.body.nameEN,
      nameGR: req.body.nameGR,
    });
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
  let type = req.query.type;
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
  let searchQuery = {};
  if (searchItem) {
    searchQuery.$or = [
      { title: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") } },
      {
        description: {
          $regex: new RegExp(".*" + searchItem.trim() + ".*", "i"),
        },
      },
    ];
  }

  if (type == 2) {
    searchQuery.isComplete = true;
  } else if (type == 3) {
    searchQuery.isComplete = false;
  } else if (type == 3) {
    searchQuery.isLiveSession = true;
  }

  searchQuery.isDelete = false;
  Quest.countDocuments(searchQuery, function (err, totalCount) {
    if (err) {
      response = { status: false, message: "Error fetching data" };
    }
    Quest.find(searchQuery, {}, query, async function (err, data) {
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
        };
      }
      res.json(response);
    })
      .sort({ createdAt: -1 })
      .populate("customerId", "fName lName")
      .populate("expertId", "fName lName");
  });
});

router.delete("/delete", async function (req, res) {
  Quest.findOneAndUpdate(
    { _id: req.query._id },
    { isDelete: true },
    function (err, doc) {
      if (err) throw err;
      let response = {
        status: true,
        message: "Deleted successfully",
        data: {},
      };
      res.send(response);
    }
  );
});

router.post("/active", async function (req, res) {
  Quest.findOneAndUpdate(
    { _id: req.body._id },
    { status: 1 },
    function (err, doc) {
      if (err) throw err;
      let response = {
        status: true,
        message: "Activated successfully",
        data: doc,
      };
      res.send(response);
    }
  );
});

router.post("/inactive", async function (req, res) {
  Quest.findOneAndUpdate(
    { _id: req.body._id },
    { status: 0 },
    function (err, doc) {
      if (err) throw err;
      let response = {
        status: true,
        message: "De-activated successfully",
        data: doc,
      };
      res.send(response);
    }
  );
});

router.get("/getSingle", async function (req, res) {
  Quest.findOne({ _id: req.query._id }, async function (err, doc) {
    if (err) throw err;
    if (doc) {
      let threads = await Thread.find({
        questId: req.query._id,
        status: 1,
        isDelete: false,
      })
        .sort({ createdAt: 1 })
        .populate("threadBy", "fName lName");

      let response = {
        status: true,
        message: "found successfully",
        data: doc,
        threads: threads,
        imageUrl: process.env.baseUrl + "/uploads/",
      };
      res.send(response);
    } else {
      let response = { status: false, message: "Something wrong", data: doc };
      res.send(response);
    }
  })
    .populate("customerId")
    .populate("expertId");
});

router.put(
  "/update",
  [
    body("nameEN")
      .exists()
      .withMessage({
        message: "Please enter name (en)",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Must be minimum 3 character",
      }),
    body("nameGR")
      .exists()
      .withMessage({
        message: "Please enter name (gr)",
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

    Quest.findOneAndUpdate(
      { _id: req.query._id },
      {
        nameEN: req.body.nameEN,
        nameGR: req.body.nameGR,
      },
      function (err, doc) {
        if (err) throw err;
        if (doc) {
          let response = {
            status: true,
            message: "Updated successfully",
            data: doc,
          };
          res.send(response);
        } else {
          let response = {
            status: false,
            message: "Something wrong",
            data: doc,
          };
          res.send(response);
        }
      }
    );
  }
);

router.get("/getAll", async (req, res) => {
  let Quest = await Quest.find({ isDelete: false });
  if (Quest && Quest.length) {
    let response = {
      status: true,
      message: "All Quest list",
      data: Quest,
    };
    res.send(response);
  } else {
    let response = {
      status: false,
      message: "All Quest list",
      data: [],
    };
    res.send(response);
  }
});

router.post("/assignExpert", async (req, res) => {
  Quest.findOneAndUpdate(
    { _id: req.body.questId },
    { expertId: req.body.expertId },
    function (err, doc) {
      if (err) throw err;
      let response = {
        status: true,
        message: "Assigned Successfully",
        data: doc,
      };
      res.send(response);
    }
  );
});

router.post("/answer", upload.array("image"), async (req, res) => {
  let documentArray = [];
  if (req.files && req.files.length) {
    documentArray = req.files.map((ele) => ele.filename);
  }
  const newThread = new Thread({
    content: req.body.answer,
    questId: req.body.questId,
    threadBy: req.doc,
    threadType: 1,
    documents: documentArray,
  });

  newThread.save((err, doc) => {
    if (err) throw err;
    if (doc) {
      let response = {
        status: true,
        message: "Answered Successfully",
        data: doc,
      };
      res.send(response);
    }
  });
});

module.exports = router;
