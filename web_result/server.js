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

var data_record, data_alluser;

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/public/html/list.html'));
});

app.get('/searchdata', function(request, response){
    response.json(data_record);
});

app.get('/alldata', function(request, response){
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


axios.get('http://10.80.162.7:8080/searchRecord' + '?code=' + '1')
.then((response) => {
    //console.log(response.data);
    //this.$emit('removeList', this.findlist);
    this.findlist = response.data;
    //console.log(this.findlist);
    //console.log(Object.keys(response.data).length);
    data_record = response.data;
    //this.$emit('updateList', this.findlist);
})
.catch((error) => {
    console.log(error);
    //this.testAct = !this.testAct;
});



app.listen(3000);