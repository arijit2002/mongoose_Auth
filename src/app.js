const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcrypt');

require('./db/conn');
const Register = require("./models/registers")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path ));
app.use(express.json())
app.set("view engine", "hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.get("/", function(req, res) {
    //res.send("hello");
    res.render('index');
});

app.get("/login", function(req, res) {
    res.render('login');
});

app.post("/login",async function(req, res){
    try{
        
        const useremail = await Register.findOne({email:req.body.email});
        //console.log(useremail.password);
        if(await bcrypt.compare(req.body.password,useremail.password)){
            res.send('logged in');
        }else{
            res.send('not logged in');
        }
    }catch{

    }
});

app.get("/register", function(req, res) {
    res.render('register');
});

app.post("/register",async function(req, res) {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if(password === confirmpassword){
            const salt=await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password, salt);
            const registerUser = new Register({
                username: req.body.username,
                email: req.body.email,
                password: hashedpassword,
            });
            const registered = await registerUser.save();
            res.status(201).render("index")
        }else{
            res.send("passwords are not matching");
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(port, function() {   
    console.log("listening on port " + port); 
});