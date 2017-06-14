"use strict";

//require necessary node packages
const express = require("express");
const serve = require("express-static");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

//configure port env
app.set("port", (process.env.PORT || 5001));

//set express handlebars as view engine
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//configure middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//configure express-static
app.use(serve("public"));

var budget = 0;

//GET
//page that displays the app name
app.get("/", function(req, res){
  res.send("home");
});

//POST
//click a button to begin the process
app.post("/", function(req, res){
  var nextButton = req.body.nextButton;
  if(nextButton){
    res.redirect("/instructions");
  }
})

//GET
//Display instructions
app.get("/instructions", function(req, res){

  res.send("instructions");
});

//POST
//"Begin budgetting" button
app.post("/instructions", function(req, res){
  var beginButton = req.body.beginButton;
  if(beginButton){
    res.redirect("/week1");
  }
});

//GET
//Displays choices for additional expenses
//Displays mandatory expenses
//mandatory expenses are deducted from the budget
app.get("/week1", function(req, res){
  //the starting budget is determined by the persona object
  budget = sophia.budgetAmount;

  var data = {
    weekOneOptions : sophia.weekOneOptions,
    currentBudget : sophia.budgetAmount
  }
  res.render("week1", data);
});

//POST
//Optional expenses are deducted from budget, and user
//is redirected to following week after submission is clicked
app.post("/week1", function(req, res){
  const submitButton = req.body.submitButton;

  if(submitButton){
    var checkboxOptions = req.body.weekOneOptions;
    var total = 0;

    checkboxOptions.forEach((price) => total += Number(price));

    budget -= total;
    res.redirect("/week2");
  };
});

//GET
//Displays choices for additional expenses
//Displays mandatory expenses
//mandatory expenses are deducted from the budget
app.get("/week2", function(req, res){
  //the starting budget is determined by the persona object
  budget = sophia.budgetAmount;

  var data = {
    weekOneOptions : sophia.weekOneOptions,
    currentBudget : sophia.budgetAmount
  }
  res.render("week2", data);

});

//POST
//Optional expenses are deducted from budget, and user
//is redirected to the unexpectedexpense route
app.post("/week2", function(req, res){
  const submitButton = req.body.submitButton;

  if(submitButton){
    var checkboxOptions = req.body.weekOneOptions;
    var total = 0;

    checkboxOptions.forEach((price) => total += Number(price));

    budget -= total;
    res.redirect("/week3");
  };
});

//GET
//Displays choices for additional expenses
//Displays mandatory expenses
//mandatory expenses are deducted from the budget
app.get("/week3", function(req, res){
  //the starting budget is determined by the persona object
  budget = sophia.budgetAmount;

  var data = {
    weekOneOptions : sophia.weekOneOptions,
    currentBudget : sophia.budgetAmount
  }
  res.render("week3", data);
});

//POST
//Optional expenses are deducted from budget, and user
//is redirected to following week after submission is clicked
app.post("/week3", function(req, res){
  const submitButton = req.body.submitButton;

  if(submitButton){
    var checkboxOptions = req.body.weekOneOptions;
    var total = 0;

    checkboxOptions.forEach((price) => total += Number(price));

    budget -= total;
    res.redirect("/week4");
  };
});

//GET
//Displays choices for additional expenses
//Displays mandatory expenses
//expenses are deducted from the budget
app.get("/week4", function(req, res){
  //the starting budget is determined by the persona object
  budget = sophia.budgetAmount;

  var data = {
    weekOneOptions : sophia.weekOneOptions,
    currentBudget : sophia.budgetAmount
  }
  res.render("week4", data);
});

//POST
//Optional expenses are deducted from budget, and user
//is redirected to the testimony page when clicking submit
app.post("/week4", function(req, res){
  const submitButton = req.body.submitButton;

  if(submitButton){
    var checkboxOptions = req.body.weekOneOptions;
    var total = 0;

    checkboxOptions.forEach((price) => total += Number(price));

    budget -= total;
    res.redirect("/week4");
  };
});

//GET
//Displays an unexpected expense associated with the persona
//Shows the amount deducted, as well as the current budget after the deduction
app.get("/unexpectedexpense", function(req, res){

});

//POST
//After clicking next, user is redirected to the following week
app.post("/unexpectedexpense", function(req, res){

});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
