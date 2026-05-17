const sqlquery = require("../../Model/sqlQuery");
const { executeQuery } = require("../../Configuration/dbConfig");
const { v4: uuid } = require("uuid");

async function getallstatistics() {
    try {
        const result1 = await executeQuery(sqlquery.dashboard.gettotalproducts);
        const result2 = await executeQuery(sqlquery.dashboard.gettotalstock);
        const result3 = await executeQuery(sqlquery.dashboard.gettotalinventoryvalue);
        const result4 = await executeQuery(sqlquery.dashboard.gettotalactiveproducts);


        return {
            success: true,
            message: "Statistics Fetched Successfully!",
            data: {
                totalproducts: parseInt(result1[0].totalproducts) || 0,
                totalstock: parseInt(result2[0].totalstock) || 0,
                inventoryvalue: parseFloat(result3[0].inventoryvalue) || 0,
                activeproducts: parseInt(result4[0].activeproducts) || 0
            }
        }
    } catch (error) {
        console.log("Error in getallproducts : ", error);
        return error;
    }
}

async function getrecentproducts() {
    try {
        const result1 = await executeQuery(sqlquery.dashboard.getrecentproducts);
        return result1;
    } catch (error) {
        console.log("Error in getrecentproducts : ", error);
        return error;
    }
}

async function getcategorywisedata() {
    try {
        const result1 = await executeQuery(sqlquery.dashboard.getcategorywisedata);
        return result1;
    } catch (error) {
        console.log("Error in getcategorywisedata : ", error);
        return error;
    }
}


module.exports = {
    getallstatistics,
    getrecentproducts,
    getcategorywisedata,
};