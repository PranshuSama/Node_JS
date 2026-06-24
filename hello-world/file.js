const fs = require("fs");

// sync
// fs.writeFileSync("./test.txt" , "Hey there!");

// async
fs.writeFile("./test.txt" , "Hey there async!", (err) => {})

// async does not return something whereas sync fun returns.