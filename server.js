//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use(express.static('./public'));
app.get('/', (req, res) => {
  res.render('index');
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
const config = {
 
}

//GET API
app.get("/api/employees", function(req , res){
    sql.connect(config).then(pool => {
        return pool.request()
          .execute('crud_getEmployees')
        }).then(result => {
            res.json(result.recordset);
        //    console.log(r);
            sql.close();
        }).catch(err => {
            // ... error checks
            // console.log(err)
            res.status(400);
            res.json(err);
            sql.close();
        })
        sql.on('error', err => {
            // console.log(err)
            res.status(400);
            res.json(err);
        })
});

app.post('/api/doEmp', (req, res) => {
  console.log(req.body);
    sql.connect(config).then(pool => {
        return pool.request()
        .input('action', sql.VarChar(10), req.body.action)
        .input('ID', sql.INT, req.body.ID)
        .input('name', sql.VarChar(100), req.body.name)
        .input('address', sql.VarChar(255), req.body.address)
        .input('department',sql.VarChar(25), req.body.department)
        .input('city', sql.VarChar(100), req.body.city)
        .execute('crud_employees')
    }).then(result => {
        
        res.sendStatus(200);
        sql.close();
    }).catch(err => {
      console.log(err);
        // ... error checks
        res.sendStatus(404);
        sql.close()
    })
    
    sql.on('error', err => {
        res.sendStatus(500);
        res.json(err);
    })
  }
);
