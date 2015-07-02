/**
* Funções para ler e fazer o parse na matriz
* do laboratório.
**/

/* Imports: */
fs = require('fs');

/* Definindo variável de modelo */
var model = {};


var addAround = function (labirinto) {
  var barrier = new Array(labirinto[0].length+1).join('0');
  var newLab = [];

  labirinto.forEach(function(element, index, array){
    newLab[index] = ''+ element +'';
  });

  newLab.unshift(barrier);
  newLab.push(barrier);

  return newLab;
};

var contains = function(total, part){
  return (total.indexOf(part) > -1);
};

var parseLabirinto = function(data){
  var labirinto = [];
  var tabelaCustos = [];
  var lines = data.toString().split("\n");
  var toLoad = null;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if(contains(line,"labirinto")){
      toLoad = labirinto;
    }else if(contains(line, "custos")){
      toLoad = tabelaCustos;
    }else if (toLoad !== null) {
      toLoad.push(line);
    }
  }

  //Processando as listas
  labirinto = labirinto.filter(function (e){
    return e !== '';
  });

  tabelaCustos = tabelaCustos.filter(function (e){
    return e !== '';
  });

  labirinto = addAround(labirinto);
  tabelaCustos = addAround(tabelaCustos);

  return {
    "labirinto":labirinto,
    "tabelaCustos":tabelaCustos
  };
};

/**
* Carrega arquivo pertencente à pasta ../resources
**/
model.carregarArquivo = function(filename){
  var labirinto = fs.readFileSync(__dirname+'/../resources/'+filename);
  return parseLabirinto(labirinto);
};

module.exports = model;
