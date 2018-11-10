const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

const { creds } = require('../credentials');

app.use(express.static(publicPath));
app.use(bodyParser.json())

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: creds.username,
  password: creds.password
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS blog", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query("USE blog", function (err, result) {
    if (err) throw err;
    console.log("Database is now being used!");
  });
  var sql = "CREATE TABLE IF NOT EXISTS posts ( id int AUTO_INCREMENT PRIMARY KEY, title varchar(50), author varchar(20), date date, description varchar(200), text varchar(1000))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


app.get('/__/previews', (req, res) => {
  con.query("SELECT id, title, author, date, description FROM posts", function (err, result) {
    if (err) res.send('Error fetching this post!');
    res.send(result);
  });
});

app.get('/__/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  con.query(`SELECT * FROM posts WHERE id=${id}`, function (err, result) {
    if (err) res.send('Error fetching this post!');
    res.send(result);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/__/post', (req, res) => {
  con.query(`INSERT INTO posts (title, author, date, description, text) VALUES ('${req.body.title}', '${req.body.author}', curdate(), '${req.body.description}', '${req.body.text}')`, function (err) {
    if (err) console.log('Error: ', err);
    res.sendStatus(200);
  }); 
});

app.listen(port, () => {
  console.log('Server is up!');
});
