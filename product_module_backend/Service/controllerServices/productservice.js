const sqlquery = require("../../Model/sqlQuery");
const { executeQuery } = require("../../Configuration/dbConfig");
const { v4: uuid } = require("uuid");

async function getallproducts(limit, offset, SearchValue) {
  try {
    var NewSearchValue = "%" + SearchValue + "%";
    const result = await executeQuery(sqlquery.products.getallproducts, [NewSearchValue, NewSearchValue, NewSearchValue, limit, offset]);
    if (result.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in getallproducts : ", error);
    return error;
  }
}

async function getproductsbyproductid(productid) {
  try {
    const result = await executeQuery(sqlquery.products.getproductsbyproductid, [productid]);
    if (result.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in getallproducts : ", error);
    return error;
  }
}

async function getallcategory() {
  try {
    const result = await executeQuery(sqlquery.products.getallcategory);
    if (result.length > 0) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in getallproducts : ", error);
    return error;
  }
}

async function addproduct(productid, productdata) {
  try {

    const result = await executeQuery(sqlquery.products.addproduct, [
      productid,
      productdata.product_name,
      productdata.category,
      productdata.sku,
      productdata.stock_quantity || 0,
      productdata.unit_price || 0,
      productdata.status || 1,
      productdata.Description || null
    ]);
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in addproduct : ", error);
    return error;
  }
}

async function updateproduct(productid, productdata) {
  try {

    const result = await executeQuery(sqlquery.products.updateproduct, [
      productdata.product_name,
      productdata.category,
      productdata.sku,
      productdata.stock_quantity || 0,
      productdata.unit_price || 0,
      productdata.status || 1,
      productdata.Description || null,
      productid,
    ]);
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in addproduct : ", error);
    return error;
  }
}

async function deleteproduct(productid) {
  try {

    const result = await executeQuery(sqlquery.products.deleteproduct, [
      productid
    ]);
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in addproduct : ", error);
    return error;
  }
}



module.exports = {
  getallproducts,
  getproductsbyproductid,
  getallcategory,
  addproduct,
  deleteproduct,
  updateproduct,
};