let express = require('express');
let body = require('body-parser');
var cors = require('cors');

let app = express();
app.use(body.urlencoded({extended: true}));
var request = require('request');


app.use(cors())
app.set('port', (process.env.PORT || 8080));



var Birth = function () {
this.age = null;
this.year = null;
this.college = null;
this.calcYear = null;
}



Birth.prototype.Year = function (cb){
this.age = cb
var year =  2018 - parseInt(this.age);
return year;

}


Birth.prototype.prompt = function (cb){
   this.year = cb;
   var grad = parseInt(this.year) + 2018;
   return grad;
   }


var newYear;
var newAge;

app.route('/')
.get(function(req, res, next){
     res.sendFile(__dirname + '/main.html');

	
})
.post(function(req,res, next){
	
	
	
});

app.route('/c')
.get(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    request('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
var newBody = JSON.parse(body)
   
    res.json({body:newBody.quoteText, Y: newYear, A:newAge});
});	
})
.post(function(req,res, next){
	
	
	
});

app.route('/calc')
.get(function(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     	var newBirth = new Birth();
       newYear = newBirth.Year(JSON.parse(req.query.age));

	   newAge = newBirth.prompt(JSON.parse(req.query.year));
	   console.log(req.query);
		res.redirect('/calculated');
})
app.route('/calculated')
.get(function(req, res, next){
	     res.sendFile(__dirname + '/calculated.html');

})







app.listen(port, function (req, res){
	
	console.log('listening sir!');
})

