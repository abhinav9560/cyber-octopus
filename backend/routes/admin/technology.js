const express = require("express");
const router = express.Router();

const Technology = require("../../models/technology");

const { body, validationResult } = require("express-validator");

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
    body("nameDE")
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

    const newtech = new Technology({
      nameEN: req.body.nameEN,
      nameDE: req.body.nameDE,
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
      { nameEN: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") } },
      { nameDE: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") } },
    ];
  }
  searchQuery.isDelete = false;
  Technology.countDocuments(searchQuery, function (err, totalCount) {
    if (err) {
      response = { status: false, message: "Error fetching data" };
    }
    Technology.find(searchQuery, {}, query, async function (err, data) {
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

router.delete("/delete", async function (req, res) {
  Technology.findOneAndUpdate(
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
  Technology.findOneAndUpdate(
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
  Technology.findOneAndUpdate(
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
  Technology.findOne({ _id: req.query._id }, function (err, doc) {
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
    body("nameDE")
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

    Technology.findOneAndUpdate(
      { _id: req.query._id },
      {
        nameEN: req.body.nameEN,
        nameDE: req.body.nameDE,
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

router.delete("/delete", async function (req, res) {
  Technology.findOneAndUpdate(
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

router.get("/getAll", async (req, res) => {
  let technology = await Technology.find({ isDelete: false });
  if (technology && technology.length) {
    let response = {
      status: true,
      message: "All technology list",
      data: technology,
    };
    res.send(response);
  } else {
    let response = {
      status: false,
      message: "All technology list",
      data: [],
    };
    res.send(response);
  }
});

module.exports = router;
