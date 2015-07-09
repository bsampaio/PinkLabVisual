var express = require('express'),
cors = require('cors'),
app = express(),
Controller = require ('./controllers/SmartBrainController');

//Utilizando o middleware para CORS
app.use(cors());

//Cadastrando a view engine EJS
app.set('view engine', 'ejs');

app.get('/report/lab/:id', function(req, res, next){
  var id = req.params.id;
  var c = new Controller('lab'+id);
  var logs = [];
  while(! c.gameOver){
  	logs.push(c.runStep());
  }
  res.json(logs);
});

app.listen(3000, function(){
  console.log('CORS-enabled web server listening on port 3000');
});

/*Controller de Console*/
// var ConsoleController = require ('./controllers/ConsoleController');
// var cc = new ConsoleController(c);
// cc.start();

// //XXX: Insane test. Don't use in production
// while(! c.gameOver){
//   c.runStep();
// }
