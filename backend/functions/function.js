const Transaction = require("../models/transaction");
const User = require("../models/user");

module.exports = {
  generateOTP() {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  },

  async getCustomer(RecordsFrom, RecordsTo) {
    return new Promise((resolve, reject) => {
      Transaction.aggregate([
        {
          $match: {
            status: 1,
            isDelete: false,
            createdAt: {
              $gte: new Date(RecordsFrom),
              $lt: new Date(RecordsTo),
            },
          },
        },
        {
          $group: {
            _id: { $toInt: { $substr: ["$createdAt", 5, 2] } },
            users: { $sum: "$amount" },
            total: { $sum: 1 },
          },
        },
      ]).exec(async function (error, doc) {
        if (error) throw error;
        resolve(doc);
      });
    });
  },

  async getRevenuePerUser(RecordsFrom, RecordsTo) {
    console.log("here");
    return new Promise((resolve, reject) => {
      Transaction.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(RecordsFrom),
              $lt: new Date(RecordsTo),
            },
          },
        },
        {
          $group: {
            _id: "$userId",
            total: { $sum: "$amount" },
            count: { $sum: 1 },
          },
        },
        { $sort: { total: 1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
      ]).exec(async function (error, doc) {
        if (error) throw error;
        resolve(doc);
      });
    });
  },

  async getChartInfo(data) {
    // Check all the months are included
    Array.prototype.inArray = function (comparer) {
      for (var i = 0; i < this.length; i++) {
        if (comparer(this[i])) return true;
      }
      return false;
    };

    // Months they are not avaiale in data
    Array.prototype.pushIfNotExist = function (element, comparer) {
      if (!this.inArray(comparer)) {
        this.push(element);
      }
    };

    const monthNames = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Pushing months
    for (let index = 1; index <= 12; index++) {
      var element = { _id: index, users: 0 };
      data.pushIfNotExist(element, function (e) {
        return parseInt(e._id) == parseInt(element._id);
      });
    }

    for (let index = 0; index < data.length; index++) {}

    let temp = data.sort(function (a, b) {
      return a._id > b._id ? 1 : -1;
    });
    return temp;
  },
};
