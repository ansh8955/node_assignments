let express = require('express');
let app = express();
let fs = require('fs');


let logMiddle =(req,res,next)=>{

  let getMethod = req.method;
  let url  = req.url;
  let timeStamp = Date();

  let duration = 0;

  let startTime = Date.now();

  res.on("finish",()=>{

    let endTime = Date.now();
   duration = endTime - startTime;

   let logs = {
"Method":getMethod,
   "url":url, 
   "timeStamp":timeStamp, 
   "ResponseTime":duration,

   }
  
   console.log(duration);

     fs.appendFile('log.json',JSON.stringify(logs) + "\n",(err)=>{

       if(err){
        console.log(err);
      }
      
     });
  });

  console.log(getMethod);
  console.log(url);
  console.log(timeStamp);
  

  next();
}

app.use(logMiddle);

app.get("/user",(req,res,next)=>{

   res.json({
    
    success:"true",
    result:"User Data"
    })

});

app.listen(3000,()=>{

  console.log('server is running on 3000 port');
});


