const express = require('express');
const session = require('express-session');
const path = require('path');
var cors = require('cors');
const mysql = require('mysql');
var jsdom = require('jsdom');
const fs = require('fs');
$ = require('jquery')(new jsdom.JSDOM().window);
var bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser());

var data_breakfast, data_lunch, data_dinner, data_housein, data_houseout, data_alluser;

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/public/html/list.html'));
});

app.get('/dataBreakfast', function(req, res){
  res.json(data_breakfast);
});

app.get('/dataLunch', function(req, res){
  res.json(data_lunch);
})

app.get('/dataDinner', function(req, res){
  res.json(data_dinner);
})

app.get('/dataHouseIn', function(req, res){
  res.json(data_housein);
})

app.get('/dataHouseOut', function(req, res){
  res.json(data_houseout);
})

app.get('/userdata', function(request, response){
    response.json(data_alluser);
});



axios.get('http://10.80.162.7:8080/allUser')
  .then((response) => {
    //console.log(response);
    console.log('allUser receive Complete');
    data_alluser = response.data;
    console.log(data_alluser);
    //this.res = response.data;
    //this.testres = response.data;
  })
  .catch((error) => {
    console.log(error);
    //this.testAct = !this.testAct;
  });


axios.get('http://10.80.162.7:8080/searchRecord' + '?code=' + '1')  // 아침 정보
.then((response) => {
    this.findlist = response.data;
    data_breakfast = response.data;
})
.catch((error) => {
    console.log(error);
});

axios.get('http://10.80.162.7:8080/searchRecord' + '?code=' + '2')  // 점심 정보
.then((response) => {
    this.findlist = response.data;
    data_lunch = response.data;
})
.catch((error) => {
    console.log(error);
});

axios.get('http://10.80.162.7:8080/searchRecord' + '?code=' + '3')  // 저녁 정보
.then((response) => {
    this.findlist = response.data;
    data_dinner = response.data;
})
.catch((error) => {
    console.log(error);
});

axios.get('http://10.80.162.7:8080/searchRecord' + '?code=' + '4')  // 입실 정보
.then((response) => {
    this.findlist = response.data;
    data_housein = response.data;
})
.catch((error) => {
    console.log(error);
});

axios.get('http://10.80.162.7:8080/searchRecord' + '?code=' + '5')  // 퇴실 정보
.then((response) => {
    this.findlist = response.data;
    data_houseout = response.data;
})
.catch((error) => {
    console.log(error);
});



app.listen(3000);