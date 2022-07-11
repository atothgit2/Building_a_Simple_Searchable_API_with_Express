const _ = require('lodash');
const express = require('express');
const app = express();

const stores = require('./data/stores.js');
const { union } = require('lodash');

// if you have some query parameters that are not vital to the display, just list them here and check for them later
const possibleQueryVars = [
  'isOpen',
  'location'
];

app.get('/', function(req, res){
  res.send('Hello World!')
});

// GET
app.get('/api/stores', function(req, res){
  var response = [];
  var union = req.query.union;
  
  console.clear();

  stores.filter(store => {
    if(store.isOpen.toString() == req.query.isOpen) {
      response.push(store);
    }
    if(store.location.toString() == req.query.location) {
      response.push(store);
    }  
  })
  // de-duplication:
  response = _.uniqBy(response, 'id');
  
  var responseHolder = []
  
  if  (union == "true") {
    response.filter(item => {
      if(item.isOpen.toString() == req.query.isOpen && item.location.toString() == req.query.location) {

        console.log("YEY " + JSON.stringify(item))
        responseHolder.push(item)
      }
    })
    console.log(responseHolder);
    response = responseHolder
  }

  // query paraméterek ellenőrzése h léteznek e
  // response filterezése 
  // folyamatosan visszamentek a responseba (szűkített lista)
  // ua. a következő parameters alapján

  // in case no filtering has been applied, respond with all stores
  // if(Object.keys(req.query).length === 0){
  //   response = stores;
  // }

  res.json(response);
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});