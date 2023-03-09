const express = require("express");
const app = express();
const port = 3000;
const users = require("./users.js");
const moment = require("moment");
var morgan = require("morgan");

//Middleware morgan
const log = (req, res, next) => {
    console.log(`${moment().format("LLLL")} = ${req.ip} = ${req.originalUrl}`);
    next();
}
app.use(log);
app.use(morgan("combined"));


//Deklarasi Routing
app.get("/users", (req, res) => res.json(users));

app.get("/users/:name", (req, res) => {
        const result = users.filter((value) => {
                return (value.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase())      
        });
        if(result == ''){
            res.json({
                message: "Data user tidak ditemukan"
            })
        } else {
            res.json(result)
        }
});

// Middleware 404
const errorHandling = (err, req, res, next) => {
    res.json({
        status: "Error",
        message: "Terjadi kesalahan pada server",
    });
};

// Middleware error
const notFound = (req, res, next) => {
    res.json({
        status: "Error",
        message: "Resource tidak ditemukan",
    });
};
app.use(notFound);

app.use(errorHandling);

app.listen(port, () =>
    console.log(`Server running at https://localhost:$(port)`)
)