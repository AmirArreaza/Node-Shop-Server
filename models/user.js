const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(username, email, id, cart) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.name = username;
    this.email = email;
    this.cart = cart; // { items: []}
  }

  save() {
    const db = getDB();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("users")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("users").insertOne(this);
    }
    return dbOp
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let calculatedQuantity;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      calculatedQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = calculatedQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: 1,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("users")
      .find()
      .toArray() //For only a few documents, otherwise use pagination
      .then((users) => {
        console.log(users);
        return users;
      })
      .catch((err) => console.log(err));
  }

  static findById(userId) {
    const db = getDB();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(userId) {
    const db = getDB();
    return db
      .collection("users")
      .deleteOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => {
        console.log("Deleted! ");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
