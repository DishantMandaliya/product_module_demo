const express = require("express");
const router = express.Router();
require("dotenv").config();
const { v4: uuid } = require("uuid");

// Service Import
const productservice = require("../Service/controllerServices/productservice");
const dashboardservice = require("../Service/controllerServices/dashboardservice");
const ApiResponse = require("../Model/apiResponse");

const status = {
    "Active": 1,
    "Inactive": 2,
    "Draft": 3,
}

router.get("/getallstatistics", async (req, res) => {
    try {

        var result = await dashboardservice.getallstatistics();
        if (result.success == true) {
            ApiResponse.success = true;
            ApiResponse.message = "Data Fetched Success";
            ApiResponse.data = result.data;
            ApiResponse.token = null;
            return res.status(200).send(ApiResponse);
        }
        else {
            ApiResponse.success = true;
            ApiResponse.message = "No Data Found " + result.message;
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

router.get("/getrecentproducts", async (req, res) => {
    try {

        var result = await dashboardservice.getrecentproducts();
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

router.get("/getcategorywisedata", async (req, res) => {
    try {

        var result = await dashboardservice.getcategorywisedata();
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


module.exports = router;