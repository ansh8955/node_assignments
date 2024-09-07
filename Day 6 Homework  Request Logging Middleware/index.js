let express = require("express");
let app = express();
let fs = require("fs");
let morgan = require("morgan");

let timeStamp = Date();

let customMorganFormat = 'IP::remote-addr \nMethod::method \nURL::url \nStatus::status \nResponseTime::response-time ms \nTimeStamp::date[clf]';


let accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });


app.use(morgan(customMorganFormat, { stream: accessLogStream }));  
app.use(morgan(customMorganFormat));  

app.get("/user", (req, res) => {
  res.json({
    success: true,
    result: "User Data",
  });
});


app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
