var express = require('express');
var app = express();
var bodyParser = require('body-parser');



var mysql = require('mysql');

app.use(bodyParser.urlencoded({
    extended: true
}));




app.use(bodyParser.json());

var port = process.env.PORT || 12220; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
//logger.init(mongodb);
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    next();
});


var con = mysql.createConnection({
    host: "localhost",
    user: "node",
    password: "%and1234",
    database: "node"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: "hello there" });
});
// router.get('/menu', function(req, res) {
//     var titles = [];
//     con.query("select * from menu", function(err, result) {
//         if (err) throw err;
//         for (var i = 0; i < result.length; i++) {
//             titles.push({ title: result[i].title, price: result[i].price });
//         }
//         res.json({ menu: titles });
//     });
//     //con.end();

// });
router.get('/productType', function(req, res) {
    var productTypes = [];
    con.query("select * from product_type", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            productTypes.push({ name: result[i].Name, id: result[i].Id });
        }
        res.json({ productTypes: productTypes });
    });
    //con.end();
});


router.post('/product', function(req, res) {
    var productTypeId = req.body.productTypeId;
    var name = req.body.productName;
    var price = req.body.productPrice;
    var description = req.body.productDescription;
    console.log("Name: " + name);
    con.query("insert into products (Name, Price, Description, ProductTypeId) values ('" + name + "','" + price + "', '" + description + "', '" + productTypeId + "')", function(err, result) {
        if (err) throw err;
        res.json();
    });
    //con.end();
});

router.get('/menu', function(req, res) {
    var menu = [];
    con.query("select * from products", function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            menu.push({ name: result[i].Name, price: result[i].Price, description: result[i].Description, productTypeId: result[i].ProductTypeId });
        }
        res.json({ menu: menu });
    });
    //con.end();
});

app.listen(port);
console.log('server is up and running on port: ' + port);