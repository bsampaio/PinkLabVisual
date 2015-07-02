var express = require('express')
  , cors = require('cors')
  , app = express();

app.use(cors());

app.set('view engine', 'ejs');

function startService(){

}

app.get('/report/lab/:id', function(req, res, next){
  var PinkController = require('./controller/PinkController.js');
  var Controller = new PinkController('lab'+req.param("id"));
  var responseList = [];

  while (Controller.ratoVivo && !Controller.acabouJogo){
    Controller.rodaTurno();
    responseList.push(Controller.getReport());
  }

  var obj = {
    "responses":responseList
  }

  res.json(obj);
});

app.get('/lab/:id', function(req, res, next){
  res.render('index',{ id:req.param("id") });
});

app.listen(3000, function(){
  console.log('CORS-enabled web server listening on port 3000');
});
