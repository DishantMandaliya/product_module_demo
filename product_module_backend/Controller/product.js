const express = require("express");
const router = express.Router();
require("dotenv").config();
const { v4: uuid } = require("uuid");

// Service Import
const productservice = require("../Service/controllerServices/productservice");
const ApiResponse = require("../Model/apiResponse");

const status = {
  "Active": 1,
  "Inactive": 2,
  "Draft": 3,
}

router.get("/getallproducts", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const SearchValue = req.query.searchvalue || '';

    var result = await productservice.getallproducts(limit, offset, SearchValue);
    if (result) {
      ApiResponse.success = true;
      ApiResponse.message = "Data Fetched Success";
      ApiResponse.data = result;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
  } catch (error) {
    ApiResponse.success = false;
    ApiResponse.message = error.message;
    ApiResponse.data = null;
    ApiResponse.token = null;
    return res.status(500).send(ApiResponse);
  }
});

router.get("/getproductsbyproductid/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    
    if (!productid) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
        data: null,
        token: null
      });
    }

    const result = await productservice.getproductsbyproductid(productid);
    
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productid} not found`,
        data: null,
        token: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product details fetched successfully",
      data: result[0], // Return single object
      token: null
    });
    
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      token: null
    });
  }
});

router.post("/addproduct", async (req, res) => {
  try {
    var productdata = req.body;
    const productid = uuid();

    // Validate required fields
    if (!productdata.product_name || !productdata.unit_price) {
      ApiResponse.success = false;
      ApiResponse.message = "product_name unit_price are required";
      ApiResponse.data = null;
      return res.status(400).send(ApiResponse);
    }

    var result = await productservice.addproduct(productid, productdata);
    if (result == true) {
      ApiResponse.success = true;
      ApiResponse.message = "product Added Successfully!";
      ApiResponse.data = result;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
    else {
      ApiResponse.success = true;
      ApiResponse.message = "Error Adding Product! Please Try again";
      ApiResponse.data = null;
      ApiResponse.token = null;
      return res.status(400).send(ApiResponse);
    }
  } catch (error) {
    ApiResponse.success = false;
    ApiResponse.message = error.message;
    ApiResponse.data = null;
    ApiResponse.token = null;
    return res.status(500).send(ApiResponse);
  }
});

router.delete("/deleteproduct/:productid", async (req, res) => {
  try {
    const productid = req.params.productid;

    var result = await productservice.deleteproduct(productid);
    if (result == true) {
      ApiResponse.success = true;
      ApiResponse.message = "product deleted Successfully!";
      ApiResponse.data = result;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
    else {
      ApiResponse.success = true;
      ApiResponse.message = "product Not found!";
      ApiResponse.data = null;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
  } catch (error) {
    ApiResponse.success = false;
    ApiResponse.message = error.message;
    ApiResponse.data = null;
    ApiResponse.token = null;
    return res.status(500).send(ApiResponse);
  }
});

router.put("/updateproduct/:productid", async (req, res) => {
  try {
    const productid = req.params.productid;
    const productdata = req.body;

    var result = await productservice.updateproduct(productid, productdata);
    if (result == true) {
      ApiResponse.success = true;
      ApiResponse.message = "product updated Successfully!";
      ApiResponse.data = result;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
    else {
      ApiResponse.success = true;
      ApiResponse.message = "Error updating product!";
      ApiResponse.data = null;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
  } catch (error) {
    ApiResponse.success = false;
    ApiResponse.message = error.message;
    ApiResponse.data = null;
    ApiResponse.token = null;
    return res.status(500).send(ApiResponse);
  }
});

router.get("/getallcategory", async (req, res) => {
  try {
    var result = await productservice.getallcategory();
    if (result) {
      ApiResponse.success = true;
      ApiResponse.message = "Data Fetched Success";
      ApiResponse.data = result;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
    else {
      ApiResponse.success = true;
      ApiResponse.message = "No Data found!";
      ApiResponse.data = null;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
  } catch (error) {
    ApiResponse.success = false;
    ApiResponse.message = error.message;
    ApiResponse.data = null;
    ApiResponse.token = null;
    return res.status(500).send(ApiResponse);
  }
});

router.get("/testapi", async (req, res) => {
  try {
    // const { firstName, lastName, Email, PhoneNo } = req.body;
    var RequestBody = "Hello Test API";
    if (RequestBody) {
      ApiResponse.success = true;
      ApiResponse.message = "Data Fetched Success";
      ApiResponse.data = RequestBody;
      ApiResponse.token = null;
      return res.status(200).send(ApiResponse);
    }
  } catch (error) {
    ApiResponse.success = false;
    ApiResponse.message = error.message;
    ApiResponse.data = null;
    ApiResponse.token = null;
    return res.status(500).send(ApiResponse);
  }
});

module.exports = router;