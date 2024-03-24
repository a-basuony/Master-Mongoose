const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
//  1
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// 1 => user
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 3- find a user and send it to req.user
// You should use this middleware function when you need to authenticate a user in your application. By finding the user document and attaching it to the req object, you can easily access the user's information in subsequent middleware functions or routes.
app.use((req, res, next) => {
  User.findById("65fe28be8a99e95002e24fe7")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// app.use((req, res, next) => {
//   console.log("req.user:", req.user);
//   next();
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

//  2- connect to DB and run server

mongoose
  .connect(
    "mongodb+srv://mongoose-practice:4ty6f8y7Vk8yOv0T@cluster0.2jgswxg.mongodb.net/myMongoose-db"
  )
  .then((result) => {
    // 2=> create a user
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "ahmed",
          email: "ahmed@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
