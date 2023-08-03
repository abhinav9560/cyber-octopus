const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const Quest = require("../../models/quest");
const Thread = require("../../models/thread");
const Global = require("../../models/global");
const Transaction = require("../../models/transaction");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, `${uniqueSuffix}-${file.originalname.trim().replace(" ", "")}`);
  },
});

const upload = multer({ storage: storage });

const { body, validationResult } = require("express-validator");

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Hqz01INbYYQLVlh7utL13VYzk7kgltmLdxGUyupaPv3JFDjLkwwRwXf4occfSOW3aUYbVEA4eAPAuw3spvDCW7M00DngjnGAz"
);

router.post(
  "/add",
  upload.array("image"),
  [
    body("title")
      .exists()
      .withMessage({
        message: "Please enter title",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Must be minimum 3 character in title",
      }),
    body("description")
      .exists()
      .withMessage({
        message: "Please enter description",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Must be minimum 3 character in description",
      }),
    body("questType").exists().withMessage({
      message: "Please enter questType",
    }),
    body("isLiveSession").exists().withMessage({
      message: "Please enter isLiveSession",
    }),
    body("liveSession").exists().withMessage({
      message: "Please enter liveSession",
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
    let global = await Global.findOne({ type: "Global" });
    // console.log(global)

    // console.log('creditType',global.creditType)
    // console.log('creditLiveSession',global.creditLiveSession)

    // Credit calculation
    let amount = 0;
    if (req.body.questType == 1) {
      amount += Number(global.creditType);
    }
    if (req.body.isLiveSession == "1") {
      amount += Number(global.creditLiveSession);
    }

    let user = await User.findOne({ _id: req.doc }).lean();
    if (user.wallet < amount) {
      return res.status(200).json({
        status: false,
        message: "Not Enough Credits",
        data: {},
      });
    }

    let documentArray = [];
    if (req.files && req.files.length) {
      documentArray = req.files.map((ele) => ele.filename);
    }

    let formData = {
      title: req.body.title,
      description: req.body.description,
      questType: req.body.questType,
      isLiveSession: req.body.isLiveSession,
      liveSession: req.body.liveSession,
      documents: documentArray,
      customerId: req.doc,
    };

    const newQuest = new Quest(formData);

    newQuest.save(async (err, doc) => {
      if (err) {
        let response = { status: false, message: err.message, data: {} };
        res.send(response);
      }
      if (doc) {
        let response = {
          status: true,
          message: "Quest added successfully",
          data: doc,
        };
        res.send(response);

        // Credit Deduction
        User.findByIdAndUpdate(
          req.doc,
          {
            $inc: { wallet: -Number(amount) },
          },
          (err,
          (doc) => {
            if (err) console.log(err);
            else {
              console.log("updated");
            }
          })
        );
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
    status: 1,
    isDelete: false,
    customerId: req.doc,
  };
  if (searchItem) {
    searchQuery.$or = [
      {
        title: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") },
      },
      {
        description: {
          $regex: new RegExp(".*" + searchItem.trim() + ".*", "i"),
        },
      },
    ];
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
    }).sort({ createdAt: -1 });
  });
});

router.get("/single", async (req, res) => {
  try {
    let quest = await Quest.findById(req.query.id).populate("customerId");

    let threads = await Thread.find({
      questId: req.query.id,
      status: 1,
      isDelete: false,
    })
      .sort({ createdAt: 1 })
      .populate("threadBy", "fName lName image");

    if (quest) {
      let response = {
        status: true,
        message: "Quest found successfully",
        data: quest,
        threads: threads,
        imageUrl: process.env.baseUrl + "/uploads/",
      };
      res.send(response);
    } else {
      let response = {
        status: false,
        message: "Quest not found",
        data: {},
      };
      res.send(response);
    }
  } catch {
    let response = {
      status: false,
      message: "Something went wrong",
      data: {},
    };
    res.send(response);
  }
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
    threadType: 2,
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

router.post("/markAsComplete", async (req, res) => {
  try {
    let updated = await Quest.findByIdAndUpdate(
      req.body.questId,
      { isComplete: true },
      { new: true }
    );

    if (updated) {
      let response = {
        status: true,
        message: "Quest Completed Successfully",
        data: updated,
      };
      res.send(response);
    }
  } catch (e) {
    let response = {
      status: false,
      message: "Something went wrong",
      data: {},
    };
    res.send(response);
  }
});

router.get("/statistics", async (req, res) => {
  try {
    console.log("statistics");
    let openQuest = await Quest.count({
      customerId: req.doc,
      isComplete: false,
    });

    let closedQuest = await Quest.count({
      customerId: req.doc,
      isComplete: false,
    });

    let totalQuest = await Quest.count({
      customerId: req.doc,
    });
    let finalData = {
      openQuest,
      closedQuest,
      totalQuest,
    };

    let response = {
      status: true,
      message: "statistics data",
      data: finalData,
    };
    res.send(response);
  } catch (e) {
    let response = {
      status: false,
      message: "Something went wrong",
      data: {},
    };
    res.send(response);
  }
});

router.get("/credits", async (req, res) => {
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

router.post(
  "/topUp",
  [
    body("amount")
      .exists()
      .withMessage({
        message: "Please enter amount",
      })
      .isNumeric()
      .withMessage({
        message: "enter a valid amount",
      }),
  ],
  async (req, res) => {
    if (req.body.amount <= 0 || isNaN(req.body.amount)) {
      let response = {
        status: false,
        message: "Please Enter A Valid Amount",
        data: {},
      };
      return res.send(response);
    }
    let user = await User.findByIdAndUpdate(req.doc, {
      $inc: { wallet: Number(req.body.amount) },
    });
    if (user) {
      let response = {
        status: true,
        message: "Top Up Successfuly",
        data: user,
      };
      res.send(response);

      // Adding transaction
      let transaction = new Transaction({
        type: "stripe",
        amount: req.body.amount,
        userId: req.doc,
      });

      transaction.save((err, doc) => {
        if (err) console.log(err);
      });
    } else {
      let response = {
        status: false,
        message: "No user found",
        data: {},
      };
      res.send(response);
    }
  }
);

router.post(
  "/stripePay",
  [
    body("amount")
      .exists()
      .withMessage({
        message: "Please enter amount",
      })
      .isNumeric()
      .withMessage({
        message: "enter a valid amount",
      }),
    body("token").exists().withMessage({
      message: "Please enter toekn",
    }),
  ],
  async (req, res) => {
    if (req.body.amount <= 0 || isNaN(req.body.amount)) {
      let response = {
        status: false,
        message: "Please Enter A Valid Amount",
        data: {},
      };
      return res.send(response);
    }
    stripe.charges.create(
      {
        amount: req.body.amount * 100,
        currency: "usd",
        source: req.body.token,
        metadata: { order_id: "6735" },
      },
      async (err, doc) => {
        if (err) {
          let response = {
            status: false,
            message: err.message,
            data: {},
          };
          res.send(response);
        } else {
          if (doc.status === "succeeded") {
            let user = await User.findByIdAndUpdate(req.doc, {
              $inc: { wallet: Number(req.body.amount) },
            });
            if (user) {
              let response = {
                status: true,
                message: "Top Up Successfuly",
                data: user,
              };
              res.send(response);
              // Adding transaction
              let transaction = new Transaction({
                type: "stripe",
                amount: req.body.amount,
                userId: req.doc,
              });

              transaction.save((err, doc) => {
                if (err) console.log(err);
              });
            } else {
              let response = {
                status: false,
                message: "No user found",
                data: {},
              };
              res.send(response);
            }
          } else {
            let response = {
              status: false,
              message: "Something Went Wrong",
              data: {},
            };
            res.send(response);
          }
        }
      }
    );
  }
);

module.exports = router;
