const fs = require("fs");
const os = require('os');
console.log(os.cpus().length);

// sync :- blocking
// fs.writeFileSync("./test.txt" , "Hey there!");


// async :- non blocking
fs.readFile("test.txt" , "utf-8", (err,result) => {
    console.log(result);
})

// async does not return something whereas sync fun returns.