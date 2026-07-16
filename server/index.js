const http = require("http");
const fs = require("fs");
const url = require("url");

const myserver = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.url}, New request received\n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("log.txt",log, (err,data) => {
        switch(myUrl.pathname) {
            case '/' :
                res.end("Homepage");
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Heyy, ${username}`);
                break;
            default :
                res.end("404 not found")
        }
    });
});

myserver.listen(8000, () => console.log('Server started!'));

