const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((data) => {
    // console.log('Database Connected')
  })
  .catch((e) => console.log("error", JSON.stringify(e)));
