const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user._id,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// ------------get  edit product--------------

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

// ------------post  edit product --------------

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = parseFloat(req.body.price); // convert price to number
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // Product.findById(prodId)
  //   .then((product) => {
  //     product.title = updatedTitle;
  //     product.price = updatedPrice;
  //     product.imageUrl = updatedImageUrl;
  //     product.description = updatedDesc;

  //     return product.save();
  // })    // => or

  Product.updateOne({
    title: updatedTitle,
    price: updatedPrice,
    description: updatedDesc,
    imageUrl: updatedImageUrl,
  })
    .then((result) => {
      console.log("updated product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select("title price -_id") // control which fields  will be shown in the response
    // .populate("userId", "name") //  populate user name from user id  OR automatic populate related fields and fetch the related data
    .then((products) => {
      // console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByIdAndDelete(prodId)
    .then((result) => {
      console.log("Deleting Success");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
