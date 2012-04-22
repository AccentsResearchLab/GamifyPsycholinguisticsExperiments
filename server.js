var express = require('express');
var fs = require('fs');
var russianJSON = JSON.parse(fs.readFileSync('./public/json/audio_stimuli_russian.json'));
var sussexJSON = JSON.parse(fs.readFileSync('./public/json/audio_stimuli_sussex.json'));
var southAfricanJSON = JSON.parse(fs.readFileSync('./public/json/audio_stimuli_southafrican.json'));
var _ = require('underscore');
var app = express.createServer(express.logger());

app.get('/',function(req,res){ 
 	res.redirect('/view/index.html');
});
app.get('/stimuliOrder/russian',function(req,res){ 
	res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify(_.shuffle(russianJSON)));
    res.end();
});
app.get('/stimuliOrder/sussex',function(req,res){ 
	res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify(_.shuffle(sussexJSON)));
    res.end();
});
app.get('/stimuliOrder/southafrican',function(req,res){ 
	res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify(_.shuffle(southAfricanJSON)));
    res.end();
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

