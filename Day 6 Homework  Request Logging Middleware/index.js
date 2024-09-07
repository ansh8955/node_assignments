let express = require("express");
let app = express();
let fs = require("fs");
let morgan = require("morgan");


let customMorganFormat = ':remote-addr :method :url :status :response-time ms - :res[content-length]';


let accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });


app.use(morgan(customMorganFormat, { stream: accessLogStream }));  
app.use(morgan(customMorganFormat));  

app.get("/user", (req, res) => {
  res.json({
    success: true,
    result: "User Data",
  });
});


app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
