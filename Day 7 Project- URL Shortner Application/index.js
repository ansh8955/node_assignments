import express from "express";
import { readFileSync, writeFileSync} from "fs";
import {nanoid}  from "nanoid";


const app=express();
app.use(express.json());

app.post("/shorten",(req,res)=>{
const longurl=req.body.Longurl;
console.log(longurl);
const uniqueid=nanoid(7);
console.log(uniqueid);
const prevData=JSON.parse(readFileSync("Data.json","utf-8"));

const data={
    ...prevData,
    [uniqueid]:longurl
}
writeFileSync("Data.json",JSON.stringify(data,null,2));
res.json({
    success:true,
    result:`http://localhost:10000/${uniqueid}`
})
})

app.get("/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const data=JSON.parse(readFileSync("Data.json","utf-8"));
    if(data.hasOwnProperty(id))
    {
        console.log(data[id]);
        res.redirect(data[id]);
        
    }
    else{
        res.json({
            success:false,
            result :"Something went wrong please try with vaild URL"
        })
    }
    
})

app.listen(10000,()=>{
    console.log("App is running fine and on port 10000");
})