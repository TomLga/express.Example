const express = require('express') 
const path = require('path')
const app = express();
const db = require('./config')
const bodyParser = require('body-parser')
const port = +process.env.PORT || 3000


app.use(express.urlencoded({extended: false}))
//staic file
//to register middleway we use app.use
// app.use(express.static('./static'))

// we want to send a file to the user 
 app.get('/', (req, res) =>{
    res.status(200).
    sendFile(path.resolve(__dirname, './static/HTML/index.html'))
 })

app.get('/about', (req, res ) =>{
    res.json(
    {
        msg: "ABOUT Page"
    })
})

//reterveing data f the db
// retervign all users 
app.get('/users',(req, res)=>{
    const query = 
    `SELECT userID, firstName, lastName
     FROM users;    
    `
    // to run the query 
    db.query(query,(err,data) =>{
        if (err) throw err
        res.json({  
            status: res.statusCode,
            results: data
        })
    })
})

// RETREVE ONE USER
app.get('/user/:id', (req, res) =>{
    const quest = `SELECT userID, firstName, lastName
    FROM users
    WHERE userID = ${req.params.id};`

    db.query(quest,(err, data)=>{ // 1st param needs to be the smae as what i put the const 
        if(err) throw err
        res.json({
            status: res.statusCode,
            results:data
        })
    })
})

// UPDATE USER
app.put('/user/:id', bodyParser.json(), (req, res)=>{
    const query = ` 
    UPDATE users SET ?
    WHERE userID =?;`

    db.query(query,[req.body, req.params.id], (err)=>{
        if (err) throw err
        res.json({
            status: res.statusCode,
            msg: "The user was updated"
        })
    })
})

// deleting user
app.delete('/user/:id',(req, res)=>{
    const dlt = `
    DELETE FROM users
    WHERE userID = ${req.params.id};`
    
    db.query(dlt, (err)=>{
        if (err) throw err;
        res.json({
            status:res.statusCode,
            msg:"The user was deleted"
        })
    })
})

// resgerter  a new user 
app.post("/register", bodyParser.json(), (req, res) => {
  const query = `
    INSERT INTO users
     SET ?`;


  db.query(query, [req.body], (err) => {
    if (err) throw err;
    res.json({
      status: res.statusCode,
      msg: "Register was successful", //to user
    });
  });
});

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})

/*
------update------ 
patch in update will allows us to update a part of the recordd 

app.put('/user/:id', bodyParser.json(), (req, res)=>{
    const query = ` 
    UPDATE users SET ?
    WHERE userID =?;`

    db.query(query,[req.body, req.params.id], (err)=>{
        if (err) throw err
        res.json({
            status: res.statusCode,
            msg: "The user was updated"
        })
    })
})

----retreving a single user----
app.get('/user/:id', (req, res) =>{
    const quest = `SELECT userID, firstName, lastName
    FROM users
    WHERE userID = ${req.params.id}`

    db.query(query,(err, data)=>{
        if(err) throw err
        res.json({
            status: res.statusCode,
            results:data
        })
    })
})


------delete------

app.delete('/user/:id',(req, res)=>{
    const dlt = `
    DELETE FROM USERS
    WHERE userID = ${req.params.id}:`
    
    db.query(dlt, (err)=>{
        if (err) throw err;
        res.json({
            status:res.statusCode,
            msg:"The user was deleted"
        })
    })
})

*/