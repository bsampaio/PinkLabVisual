/**
 * Funções para ler e fazer o parse na matriz
 * do laboratório.
 */

/* Imports: */
fs = require('fs');
Map = require('./Map.js');

/* Definindo variável de modelo */
var model = {};

var contains = function(total, part){
  return (total.indexOf(part) > -1);
};

var parse = function(data){
  var labirinto = [];
  var tabelaCustos = [];
  var lines = data.toString().split("\n");
  var toLoad = null;

  //Verifica se montará a tabela de custos ou o labirinto
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
  //Remove todo e qualquer espaço das linhas lidas.

  labirinto = labirinto.filter(function (e){
    return e !== '';
  });

  tabelaCustos = tabelaCustos.filter(function (e){
    return e !== '';
  });

  return new Map({
    "lab":labirinto,
    "costs":tabelaCustos
  });
};

/**
 * Função que retorna o movimento a partir
 * de outra posicao, de acordo com alguma direção
 * @returns {lab:lab, costs:costs};
 */
model.load = function(filename){
  var lab = fs.readFileSync(__dirname+'/../resources/'+filename);
  return parse(lab);
};

module.exports = model;
