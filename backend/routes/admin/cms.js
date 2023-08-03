const express = require("express");
const router = express.Router();

const CMS = require("../../models/cms");

const { body, validationResult } = require("express-validator");

router.post(
  "/insert",
  [
    body("titleEN")
      .exists()
      .withMessage({
        message: "Please enter title (en)",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Title (en) should be minimum 3 character",
      }),
    body("titleDE")
      .exists()
      .withMessage({
        message: "Please enter title (gr)",
      })
      .isLength({ min: 3 })
      .withMessage({
        message: "Title (gr) should be minimum 3 character",
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

    const newTemp = new CMS({
      titleEN: req.body.titleEN,
      titleDE: req.body.titleDE,
      slug: req.body.slug,
      contentEN: req.body.contentEN,
      contentDE: req.body.contentDE,
    });
    newTemp.save(async function (err, doc) {
      if (err) {
        if (err.code === 11000) {
          return res.status(200).json({
            succes: false,
            message: "Slug already exist!",
            data: err,
          });
        } else {
          let response = {
            status: false,
            message: err.name,
            data: err,
          };
          return res.send(response);
        }
      }
      if (doc) {
        let response = {
          status: true,
          message: "Added successfully",
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
      { title: { $regex: new RegExp(".*" + searchItem.trim() + ".*", "i") } },
    ];
  }
  searchQuery.isDelete = false;
  CMS.countDocuments(searchQuery, function (err, totalCount) {
    if (err) {
      response = { status: false, message: "Error fetching data" };
    }
    CMS.find(searchQuery, {}, query, async function (err, data) {
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
  CMS.findOneAndUpdate(
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
  CMS.findOneAndUpdate(
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
  CMS.findOneAndUpdate(
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
  CMS.findOne({ _id: req.query._id }, function (err, doc) {
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
    [
      body("titleEN")
        .exists()
        .withMessage({
          message: "Please enter title (en)",
        })
        .isLength({ min: 3 })
        .withMessage({
          message: "Title (en) should be minimum 3 character",
        }),
      body("titleDE")
        .exists()
        .withMessage({
          message: "Please enter title (gr)",
        })
        .isLength({ min: 3 })
        .withMessage({
          message: "Title (gr) should be minimum 3 character",
        }),
    ],
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

    CMS.findOneAndUpdate(
      { _id: req.query._id },
      {
        titleEN: req.body.titleEN,
        titleDE: req.body.titleDE,
        slug: req.body.slug,
        contentEN: req.body.contentEN,
        contentDE: req.body.contentDE,
      },
      function (err, doc) {
        if (err) {
          if (err.code === 11000) {
            return res
              .status(200)
              .json({
                succes: false,
                message: "Slug already exist!",
                data: {},
              });
          } else {
            let response = {
              status: false,
              message: err.name,
              data: {},
            };
            return res.send(response);
          }
        }
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

module.exports = router;
