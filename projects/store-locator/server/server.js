const _ = require('lodash');
const express = require('express');
const app = express();

const stores = require('./data/stores.js');

// if you have some query parameters that are not vital to the display, just list them here and check for them later
const possibleQueryVars = [
  'nsfw',
  'location'
];

app.get('/', function(req, res){
  res.send('Hello World!')
});

app.get('/api/stores', function(req, res){
  var response = [];
  console.log(req.query)

  // this would usually adjust your database query
  if(typeof req.query.nsfw != 'undefined'){
    stores.filter(function(store){
      if(store.nsfw.toString() == req.query.nsfw){
        response.push(store);
        console.log(store)
      }
    });
  }

  // this would usually adjust your database query
  if(typeof req.query.location != 'undefined'){
    stores.filter(function(store){
      if(store.location === req.query.location){
        response.push(store);
        console.log(store)
      }
    });
  }

  // de-duplication:
  response = _.uniqBy(response, 'id');

  // in case no filtering has been applied, respond with all stores
  if(Object.keys(req.query).length === 0){
    response = stores;
  }

  res.json(response);
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});