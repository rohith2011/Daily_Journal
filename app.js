//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Edit as you wish...";
const aboutContent = "Edit as you wish...";
const contactContent = "Edit as you wish...";
const app = express();

let posts=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/posts/:title', function (req, res) {
  const requestedTitle=_.lowerCase(req.params.title);

  posts.forEach(function(post){
    const checkFlag= _.lowerCase(post.title);

    if(checkFlag === requestedTitle){
      res.render("post",{
        title: post.title,
        body: post.body
      });
    }
  });

});


app.get("/",function(req,res){
  //res.write("<p>"+homeStartingContent+"</p>");
  res.render('home',{
    startingContent:homeStartingContent,
    posts:posts
  });
  
});

app.get("/about",function(req,res){
  res.render("about",{
    content:aboutContent
  });
});

app.get("/contact",function(req,res){
  res.render("contact",{
    content:contactContent
  });
});

app.get("/compose",function(req,res){
  res.render("compose",{

  });
});

app.post("/compose",function(req,res){
  let post={
    title:req.body.addTitle,
    body:req.body.postbody
  };
  posts.push(post);
  res.redirect("/");


});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
