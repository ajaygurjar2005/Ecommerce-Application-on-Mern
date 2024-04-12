import productModal from "../Modal/productModal.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    console.log(name, slug, description, price, category, quantity, "etc");

    if (!name || !description || !price || !category || !quantity) {
      res.status(200).send({
        msg: "plese fill all the details",
        success: false,
      });
    }

    if (photo && photo.size > 1000000) {
      res.status(200).send({
        msg: "Photo should be must less then 1 mb",
        success: false,
      });
    }

    const product = new productModal({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      msg: "Product created successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error creating the product",
      err,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModal
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      msg: "All products",
      totalcount: products.length,
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error getting the product",
      success: false,
      err,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModal
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      msg: "Single products Fetch",
      totalcount: product.length,
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error getting  single the product",
      success: false,
      err,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModal.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error while getting  photo",
      success: false,
      err,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModal
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      msg: "product delete successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error while deleting product  photo",
      success: false,
      err,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    console.log(name, slug, description, price, category, quantity, "etc");

    if (!name || !description || !price || !category || !quantity) {
      res.status(200).send({
        msg: "plese fill all the details",
        success: false,
      });
    }

    if (photo && photo.size > 1000000) {
      res.status(200).send({
        msg: "Photo should be must less then 1 mb",
        success: false,
      });
    }

    const product = await productModal.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      msg: "Product update successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error update the product",
      err,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModal.find(args);
    res.status(200).send({
      msg: "Filter data successfully",
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error while Filter Product",
      success: false,
      err,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModal.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error while  Product Count",
      success: false,
      err,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModal
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error while  Loading pages ",
      success: false,
      err,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await productModal
      .find({ category: cid, _id: { $ne: pid } })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error while Loading similar product",
      success: false,
      err,
    });
  }
};
