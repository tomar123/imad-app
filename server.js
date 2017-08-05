var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={

        'article-one':{
         title:'Article One | Deepak Tomar',
         heading:'Article One',
         date:'4 Aug,2017',
         content:` <p>
                    This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page.
                </p>
                <p>
                    This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page.
                </p>
                <p>
                    This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page. This is the content of my 1st article page.
                </p>`
            },
        'article-two':{
        title:'Article Two | Deepak Tomar',
        heading:'Article Two',
        date:'5 Aug,2017',
          content:` <p>
                    This is the content of my 2nd article page.
                </p>`
            },
        'article-three':{
        title:'Article Three | Deepak Tomar',
        heading:'Article Three',
        date:'6 Aug,2017',
        content:` <p>
                    This is the content of my 3rd article page.
                </p>`
    },
};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
    var htmlTemplate=`
    <html>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet"/>
        <body>
            <div class="container">
                <div>
                <a href='/'>Home</a>
            </div>
        
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
            
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}



var counter = 0;
app.get('/counter', function(req, res){
   counter = counter+1;
   res.send(counter.toString()); 
    
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
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
