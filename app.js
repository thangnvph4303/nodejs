const products = [
  { id: 1, name: "Products A" },
  { id: 2, name: "Products B" },
];

// const http = require("http");

// const server = http.createServer(function (req, res) {

//     // routing - router
//     if (req.url == "/") {
//         res.setHeader("Content-Type", "text/html");
//         res.end(`<form action="/products" method="post">
//             <input type="text" placeholder="Product Name" name="productName" />
//             <button>Submit</button>
//         </form>`);
//     }

//     if (req.url == "/products" && req.method == "POST") {
//         const body = [];
//         req.on("data", function (chunk) {
//             body.push(chunk);
//         });
//         req.on("end", function () {
//             const bodyParse = Buffer.concat(body).toString();
//             console.log(bodyParse.split("="));
//             const user = {
//                 name: bodyParse.split("=")[1],
//             };
//             res.end(JSON.stringify(user));
//         });
//     }
// });

// server.listen(8080, function () {
//     console.log("Server is running port 8080");

import express from "express";

const app = express();

app.use(express.json);

// app.get("/", function (req, res) {
//   res.send(/*html*/ `<form action="/products" method="post">
//     <input type="text" placeholder="Product Name" name="productName" />
//     <button>Submit</button>
// </form>`);
// });


// app.get("/products", function(req, res){
//     res.json(products);
// });

// app.post("/products", (req, res) => {
//     console.log(req.body);
// })


//Trả về danh sách
app.get("/products", function(req, res){
  res.json(products);
})


//Trả về 1 phần tử
app.get("/products/:id", function(req, res){
  const id = req.params.id;
  const product = products.find((product) => product.id == id);
  res.json({
    message: "Products found",
    products,
  })
});


app.post("/products", (req, res) => {
  const body = req.body;
  products.push(body);
  res.json({
    message: "Products created",
    products,
  })
});


app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const newProducts = products.filter((product) => product.id != id);
  res.status(200).json({
    message: "Products deleted",
    products: newProducts,
  })
});


app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const newProducts = products.map((product) => (product.id == id ? body : product));
  res.json({
    message: "Products updated",
    products: newProducts,
  })
});



app.listen(8080, function () {
  console.log("Server is running port 8080");
});
