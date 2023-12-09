const express=require("express")
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const bodyparser=require("body-parser");

//connecting mongoose to the database
mongoose.connect('mongodb://0.0.0.0:27017/contactdance',{useNewUrlParser:true});
const port=8000;

// Define Mongoose schema (structure of data)
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// Finalise our schema by making it a model and assign its name as Contact
var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))  // For serving Static files
app.use(express.urlencoded());  // to store the response sumitted by user in express

//PUG Specific stuff
app.set('view engine','pug');  //setting template engine as pug
app.set('views',path.join(__dirname,'views'));  //set views directory

// ENDPOINTS

// It will store the url of form which we submitted 
app.get("/",(req,res)=>{
   const parameter = {  }
   res.status(200).render('home.pug',parameter);
});

// it will display contact page when user press contact in website
app.get("/contact",(req,res)=>{
    const parameter = {  }
    res.status(200).render('contact.pug',parameter);
 });

app.get("/plans",(req,res)=>{
    const parameter = {  }
    res.status(200).render('plans.pug',parameter);
 });

app.get("/about",(req,res)=>{
    const parameter = {  }
    res.status(200).render('about.pug',parameter);
 });

app.get("/timings",(req,res)=>{
    const parameter = {  }
    res.status(200).render('timings.pug',parameter);
 });

// It will take the data from req.body when user fill the form and save it in database 
 app.post('/contact',(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This data has been saved to the databse")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug');
 });

// Start the server
app.listen(port,()=>{
    console.log(`Application starts successfully on port ${port}`);
})
