const express = require("express");
const app = express();

const dotenv = require("dotenv");
const products = require("./data/Products");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");

const mongoose = require("mongoose");
// connect db
mongoose.connect(process.env.MONGOOSE_URL).then(()=>console.log("DB connected"))
    .then((err)=>{err;})

const databaseSeeder = require("./databaseSeeder");
const UserRoute = require("./routes/User");
const ProductRoute = require("./routes/Product");
const OrderRoute = require("./routes/Order");
app.use(express.json());
app.use(cors());

// database seeder routes /api/seed/users
app.use("/api/seed", databaseSeeder);
// routes for users /api/users/login
app.use("/api/users", UserRoute);
// routes for products 
app.use("/api/products", ProductRoute);
// routes for orders
app.use("/api/orders", OrderRoute)


app.use("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

app.listen(PORT || 9000, ()=>{
    console.log(`Server listening on port ${PORT}`)
})


/* DB Account:
Username: grequechan
Password: zuUf1QSq6QHcFdru
IP adress: 177.192.2.217
mongodb+srv://grequechan:zuUf1QSq6QHcFdru@greque-cluster.qia0x25.mongodb.net/ECommerceWebsite
*/

/* // Api product test route
 app.get("/api/products", (req, res) => {
    res.json(products);
});
app.get("/api/products/:id", (req, res) => {
    const product = products.find((product => product.id == req.params.id))
    res.json(product);
})
*/
