var express = require('express');

var app = express.createServer(express.logger());

app.get('/',function(req,res){ 
 	res.redirect('/view/soundcheck.html');
});
app.post('/view/main.html',function(req,res){
  res.redirect('/view/main.html');
});
app.post('/view/survey.html',function(req,res){
  res.redirect('/view/survey.html');
});


app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
