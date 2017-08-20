var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config ={
    user: 'deepaktomar2031',
    database: 'deepaktomar2031',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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
                    ${date.toDateString()}
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

var names = [];
//app.get('/submit-name/:name', function(req,res) {
app.get('/submit-name', function(req,res) { // /submit-name?name=something
   //Get the name from the request
   //var name = req.params.name;
   var name = req.query.name;
   
   names.push(name);
   //JSON: Javascript Object Notation
   res.send(JSON.stringify(names));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



function hash (input, salt) {
    //How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}



app.get('/hash/:input', function(req,res){
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
    
});

app.post('/create-user', function(req, res){
   //username, password
   // {"username": "Deepak", "password": "password"}
   //JSON
   
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           res.send('User successfully created: ' + username);
       }
   });
});

app.post('/login', function(res, req)
{
   var username = req.body.username;
   var password = req.body.password;
   pool.query('SELECT * FROM "user" username = $1', [username], function (err, result)
   {
       if (err) 
       {
           res.status(500).send(err.toString());
       } 
       else
       {
           if (result.rows.length === 0) 
           {
               res.send(403).send('username/password is invalid');
           }
           else
           {
               //Match the password
               var dbString = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hashedPassword = hash(password, salt); // Creating a hash based on password submitted and original salt
               if (hashedPassword === dbString)
               {
                   res.send('Correct username and password ');
               }
               else
               {
                   res.send(403).send('username/password is invalid');
               }
           }
       }
   });
});








var pool = new Pool(config);
app.get('/test-db', function(req,res){
    //make a select request
    //return a request with results
    pool.query('SELECT * FROM test', function (err,result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           res.send(JSON.stringify(result.rows));
       }
    });
    
});

/*
app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
*/

app.get('/articles/:articleName',function(req,res) {
    //articleName ==article-one
    //articles[articleName] =={} content object for article-one
    
    //SELECT * FROM article WHERE title = 'article-one'
    pool.query("SELECT * FROM article WHERE title = $1" ,[req.params.articleName], function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(404).send('Article Not Found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
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
