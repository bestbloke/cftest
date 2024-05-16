var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());
app.use(limiter);

app.get('/', function(req,res){
//  res.sendFile(path.join(__dirname,'./public/form.html'));
res.sendFile(path.join(__dirname,'form.html'));
});

server.listen(3000,function(){
    console.log("Server listening on port: 3000");
});

app.post('/item', function(req,res){
    console.log([req.body.id, req.body.thing]);
    
    const text =`
    <ol>
    <li>${req.body.id}</li>
    <li>${req.body.thing}</li>
    </ol>
    `;
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(text);  
  });