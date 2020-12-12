const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");

const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("Adding Dummy User to the request");
  User.findById("5fd51aef088e454b5cd9a64c")
    .then((user) => {
      console.log('User Found!');
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://AArreaza:Mon19861707@cluster0.1f6cb.mongodb.net/Shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log('Connected');
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Amir",
          email: "amir@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));
