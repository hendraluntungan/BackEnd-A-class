// node js = tools untuk compile javascript dari command line. bukan bahasa pemrograman, tetapi sebuah runtime environment untuk jalankan javascript.

const http = require('http');           // modul bawaan node js, yang bisa untuk membuat web server
const helloWorld = require("./helloWorld");
const moment = require("moment");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.write(helloWorld.hello2);
    // res.write(helloWorld.world2);
    // res.write(helloWorld.welcome());
    // res.write(helloWorld.world());
    // res.write(helloWorld.hello());
    // res.write(moment().format('MMMM Do YYYY, h:mm:ss a'));
    res.write(
        JSON.stringify({
            route: req.url,
            status: "success",
            message: "response success",
            date: moment().format(),
        })
    );
    res.end();
})// .listen(3000);

const hostname = '127.0.0.1'; // atau localhost
const port = 3000;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});