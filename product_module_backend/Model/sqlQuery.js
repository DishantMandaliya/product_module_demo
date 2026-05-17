const sqlquery = {
  products: {
    getallproducts: `select p.product_id, p.product_name, p.category, c.category_name, p.sku, p.stock_quantity, p.unit_price, p.status, p.Description, p.created_at
                    from tbl_products p
                    join tbl_category c on p.category = c.id
                    where p.product_name like ? or c.category_name like ? or p.status like ?
                    order by p.id
                    limit ? offset ?;`,
    getproductsbyproductid: `select p.product_id, p.product_name, p.category, c.category_name, p.sku, p.stock_quantity, p.unit_price, p.status, p.Description, p.created_at
                    from tbl_products p
                    join tbl_category c on p.category = c.id
                    where p.product_id = ?`,
    addproduct: `insert into tbl_products(product_id, product_name, category, sku, stock_quantity, unit_price, status, Description)
     values(?,?,?,?,?, ?,?,?)`,
    updateproduct: `update tbl_products set product_name = ?, category = ?, sku = ?, stock_quantity = ?, unit_price = ?, status = ?, Description = ? where product_id = ?`,
    deleteproduct: `delete from tbl_products where product_id = ?`,
    getallcategory: `select * from tbl_category`,
  },

  dashboard: {
    gettotalproducts: `select count(product_id) as totalproducts from tbl_products;`,
    gettotalstock: `select sum(stock_quantity) as totalstock from tbl_products;`,
    gettotalinventoryvalue: `select sum(stock_quantity * unit_price) as inventoryvalue from tbl_products;`,
    gettotalactiveproducts: `select count(product_id) as activeproducts from tbl_products where status = 1;`,

    getrecentproducts: `select p.id, p.product_id, p.product_name, p.category, c.category_name, p.sku, p.stock_quantity, p.unit_price, p.status, p.Description, p.created_at
                        from tbl_products p
                        join tbl_category c on p.category = c.id
                        ORDER BY p.id desc
                        limit 5 offset 0;`,

    getcategorywisedata: `select 
    count(p.id) as product_count, 
    p.category, 
    c.category_name
    from tbl_products p
    join tbl_category c ON p.category = c.id
    group by p.category, c.category_name
    order by product_count desc;`
  }

};

module.exports = sqlquery;
