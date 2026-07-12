const http = require("http");
const fs = require("fs");

const myserver = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url}, New request received\n`;
    fs.appendFile("log.txt",log, (err,data) => {
        switch(req.url) {
            case '/' :
                res.end("Homepage");
                break;
            case '/about':
                res.end("Hey Im Pranshu")
                break;
            default :
                res.end("404 not found")
        }
    });
});

myserver.listen(8000, () => console.log('Server started!'));

