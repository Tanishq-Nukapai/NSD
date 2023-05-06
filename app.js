const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/SignUpData", {useNewUrlParser : true});

const userSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    Password : String
})

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/signUp", function(req, res){
    const newUser = new User({
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password
      });
      
    newUser.save();
    res.sendFile(__dirname + "/success.html");
})

app.listen(3000, function() {
    console.log('Server started on port 3000.');
});
