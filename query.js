//Command Prompt
mongosh
use products    //creating DB
db.createCollection('productlist') //creating 'productlist' collection
show collections                   // showing the collection
db.productlist.insertMany(data)    //Updating data from productlist.json




// 1. Find all the information about each products

db.productlist.find().toArray()

// 2. Find the product price which are between 400 to 800

db.productlist.find({product_price: { $gt: 400, $lt: 800}})

// 3. Find the product price which are not between 400 to 600

db.productlist.find({product_price: {$not:{ $gt: 400, $lt: 800}}}).toArray()

// 4. List the four product which are grater than 500 in price 

db.productlist.find({product_price: { $gt: 500}}).limit(4)

// 5. Find the product name and product material of each products

db.productlist.find().forEach((product)=>{ print("Product Name- "+ product.product_name, "& Material- "+ product.product_material)});

// 6. Find the product with a row id of 10

db.productlist.findOne({id: "10"})

// 7. Find only the product name and product material

db.productlist.find().forEach(function(product){ print(product.product_name, "&" ,product.product_material)})

// 8. Find all products which contain the value of soft in product material 

db.productlist.find({product_material: "Soft"})

// 9. Find products which contain product color indigo  and product price 492.00

db.productlist.find({ $and: [{product_color: "indigp"}, {product_price: "492.00"}]})

// 10. Delete the products which product price value are same

db.productlist.aggregate([
    {$group :{
        _id: "$product_price",
        duplicate: {$addToSet: "$_id"},
        Totalcount: {$sum: 1} 
    }},
    {
        $match: {
            Totalcount: {$gt: 1}
        }
    }
]).forEach((ele)=>{
    ele.duplicate.shift();
    db.productlist.deleteMany({_id: {$in: ele.duplicate}})
})