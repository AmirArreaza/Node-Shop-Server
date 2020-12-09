const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://AArreaza:Mon19861707@cluster0.1f6cb.mongodb.net/<dbname>?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;