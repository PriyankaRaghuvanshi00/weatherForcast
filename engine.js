const http = require("http");
const fs = require("fs");
const path = require("path");
var requests = require("requests");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("express");
const port = process.env.PORT || 3000;

function replacevalue(tempVal, orgVal) {
  let t = tempVal.replace("{%todaytemp%}", orgVal.main.temp);
  t = t.replace("{%min_temp%}", orgVal.main.temp_min);
  t = t.replace("{%location%}", orgVal.name);
  t = t.replace("{%max_temp%}", orgVal.main.temp_max);
  return t;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const homeFile = fs.readFileSync("./index.html", "utf-8");
app.get("/", (req, res) => {
  var text = req.query.city;
  console.log(text);
  if (text == "") text = "Indore";
  console.log(text);
  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      text || "Indore"
    }&appid=51ba72e56ed84395a2a85e73fa65ac5b`
  )
    .on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const object = [data];
      if (object[0].cod === "404") {
        res.send(`<div style="color: gray;text-align: center;"> <h1>ERROR!!</h1>
      <a href="/" style="text-decoration: none;">Click Here</a></div>`);
        return;
      }
      const temp = object.map((val) => replacevalue(homeFile, val)).join("");
      res.write(temp);
    })
    .on("end", (err) => {
      if (err) return console.log("error << ", err);
      res.end();
    });
});

app.listen(port, () => {
  console.log("listening to " + port);
});
