var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
    title: 'Article-One | PCSR |',
    heading: 'Article-One',
    date: '9th September., 2017',
    content:  `
        <p>
	        THis is first paragraph of the artice one and it has some random content.
	    </p> 
        <p>
	        THis is second paragraph of the artice one and it has some random content same as above.
	    </p>`
},
    'article-two' : {
    title: 'Article-Two | PCSR |',
    heading: 'Article-Two',
    date: '12th September., 2017',
    content:  `
        <p>
	        THis is first paragraph of the artice two and it has some random content.
	    </p> 
        `
	},
    'article-three' : {
    title: 'Article-Three | PCSR |',
    heading: 'Article-Three',
    date: '12th September., 2017',
    content:  `
        <p>
	        THis is first paragraph of the artice three and it has some random content.
	    </p> 
        `
}
};
	
function createTemplate (data) {    
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
    
var htmlTemplate= `
		<html>
			<head>
				<title>
			    	${title}
				</title>
				<meta name="viewport" content="width-device-width, initial scale=1" />
				<link href="/ui/style.css" rel="stylesheet" />
			</head>
			<body>
			<div class="container">
				<div>
				<a href="/">Home></a>
				</div>
				<h3>
					${heading}
				</h3>
				<div>
					${date}
				</div>
					${content}
			</div>
			</body>
		</html>`;
		
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function(req,res) {
    //articleName==articleOne
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});