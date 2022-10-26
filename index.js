const express = require("express");
const exp = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const uniqueid = require('short-id');

exp.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"data"
});

db.connect(function(err) {
  if (err) {
    return;
  }
});

exp.post("/mainlongurl",(req,res) => {
  let mainlongurl = req.body.mainlongurl;
  let shorturlid = uniqueid.generate();
  res.send("http://localhost:3000/"+shorturlid);
  let query = 'INSERT INTO urls(mainlongurl,shorturlid) VALUES (?, ?);';
  db.query(query, [mainlongurl, shorturlid], (err, rows) => {
      if (err){
          throw err;
      } 
    });   
});

exp.get("/:shorturlid",async(req,res) =>{
    let shorturlid = req.params.shorturlid;
    let sqlquery = 'SELECT * FROM urls WHERE shorturlid = ?';
    db.query(sqlquery,[shorturlid], await function (err, rows) {
 
      if (err) {
        throw err;
      }
    res.redirect(rows[0].mainlongurl);
    });
});
  exp.listen("3000");