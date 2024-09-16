const express = require("express");
const app = express();

const path = require("path");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);

app.get("/amazon",(req,res)=>{
  res.render("listings/amazon.ejs");
});

app.listen(8000,()=>{
  console.log("App is listening on port 8000");
});