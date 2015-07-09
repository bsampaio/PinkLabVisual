
/**
 * Definindo constantes de configuração
 */
var CONSTANTS = (function() {
     var private = {
         'END': 'F',
         'START': 'S',
         'BLOCK': '0',
         'PASSAGE': '1'
     };

     return {
        /**
         * Retorna o valor correspondente à constante
         */
        get: function(name) { return private[name]; }
    };
})();

/**
 * Seção de imports:
 */
var _ = require('underscore');
LabParser = require('./LabirynthParser.js');
Position = require('./Position.js');
Movement = require('./Movement.js');
Router = require('./Router.js');
/**
 * Definição da classe Labirinto
 */

var Labirynth = function(filename){

  /**
   * Função que instancia uma Posição
   * a partir da coordenada no mapa
   * caso a posição seja a do gato,
   * o custo é infinito
   * @return {Position}
   */
  this.getPosition = function (x, y){

    if(this.validPosition(x,y)){
      var cost = this.map.costs[x][y];
      var position = new Position(x, y, cost);

      if(this.cat){
        if(position.isEqual(this.cat)){
          return this.cat;
        }
      }

      return position;
    }
  };

  /**
   * Busca um elemento pelo seu valor char no mapa
   * e cria uma posição com suas coordenadas e custo
   * @return {Position}
   * @param {char} - Caractére buscado
   */
  this.findElementByChar = function(char){
    for (var i = 0; i < this.map.lab.length; i++) {
      for (var j = 0; j < this.map.lab[i].length; j++) {
        if(this.map.lab[i][j] === char){
          return new Position(i,j,this.map.costs[i][j]);
        }
      }
    }
  };

  //Carrega o labirinto e os custos e atribui à 'map'
  this.map = LabParser.load(filename);
  this.end = this.findElementByChar(CONSTANTS.get('END'));
  this.start = this.findElementByChar(CONSTANTS.get('START'));
  this.cat = null;
  this.mouse = this.start;
  // this.cells = [];
  this.movementList = [];


  /**
   * Procedimento para adicionar os movimentos
   * na lista de direções possíveis
   * @returns {void}
   */
  (function (self){
    var cima = new Movement(-1,0,'Cima');
    var esquerda = new Movement(0,-1,'Esquerda');
    self.movementList.push(cima);
    self.movementList.push(esquerda);
  })(this);

  /**
   * A função gera um aleatório inteiro
   * limitado pelos parametros da função
   * @returns {void}
   * @param {int} start - Limite inferior
   * @param {int} end - Limite superior
   */
  function getRandInt(start, end){
    return Math.floor(Math.random() * end) + start;
  }

  /**
   * A função cria um "gato" em uma
   * posição aleatória, elevando seu custo
   * até o valor {number} Infinity
   * @returns {Position}
   */
  this.generateCat = function(){

    var cost = Infinity;
    var x = -1;
    var y = -1;

    var genXY = function(self){
      //x = getRandInt(0, self.map.lab.length-1);
      //y = getRandInt(0, self.map.lab[0].length-1);
       x = 1;
       y = 1;
    };

    while(! this.validPosition(x,y)){
      genXY(this);
    }

    this.cat = new Position(x, y, cost);
    return this.cat;
  };

  this.setRouter = function(){
    router = new Router(this.end, this.mouse, this);
  };

  this.buildRoutes = function(){
    this.router.buildRoutes(this, this.router);
  };

  this.getRoutes = function(){
    return this.router.getRoutes();
  };

  this.getMinRoute = function(){
    return this.router.getMinRoute();
  };

  this.mouseStepTo = function(position){
    this.mouse = position;
  };

  this.mouseGetCaught = function(){
    return this.mouse.isEqual(this.cat);
  };

  this.mouseFled = function(){
    return this.mouse.isEqual(this.end);
  };

  this.validPosition = function(x, y){
    if(x < this.map.lab.length && x >= 0){
      if(y < this.map.lab[0].length && y >= 0){
        if (this.map.lab[x][y] !== CONSTANTS.get('BLOCK')) {
          return true;
        }
      }
    }

    return false;
  };

  this.router = new Router(this.end, this.mouse, this);

  this.buildRoutes();
};

var LabirynthFactory = function(filename){
  /**
   * Cria o labirinto
   *
   */
  var l = new Labirynth(filename);
  return l;
};

module.exports = LabirynthFactory;
