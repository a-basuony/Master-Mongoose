const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

// Method to add an item to the users shopping cart
// This method will be available on all instances of the User model created from this schema.
userSchema.methods.addToCart = function (product) {
  //  if is found that matches the condition, the findIndex method returns the index of that cartProduct in the cart.items array.
  // If no match is found, findIndex returns -1.
  const cartProductIndex = this.cart.items.findIndex((cartProduct) => {
    return cartProduct.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    // The product is already in the user's cart so we just need to update its quantity
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  this.cart.items = updatedCartItems; // Update the cart items array
  return this.save(); // Save the updated user document
};
//   const updatedCart = {
//     items: updatedCartItems,
//   };

//   this.cart = updatedCart;
//   return this.save();
// };

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
