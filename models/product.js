const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // id will add automatically
  userId: {
    type: Schema.Types.ObjectId, // type: Schema.Types.ObjectId,: This specifies that the userId field should be of type ObjectId, which is a 12-byte BSON type used to uniquely identify documents in a MongoDB collection. The Schema.Types object is a namespace provided by Mongoose that contains various data types for defining schemas.
    ref: "User", // ref: "User",=> Which other mongoose model related to the data in that field , This specifies that the userId field is a reference to the User model.
    required: true,
  }, // Mongoose uses this information to create an association between the current schema and the User schema.
});

module.exports = mongoose.model("Product", productSchema);
