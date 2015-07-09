/**
 * Representa a classe de Roteamento
 * e seu comportamento.
 * @constructor
 * @param {Position} from - Posição de origem
 * na matriz de labirinto.
 * @param {Position} to - Posição de destino
 * na matriz de labirinto.
 */

var _ = require('lodash');

var Router = function(from, to, labirynth){
  this.from = from;
  this.to = to;
  this.routes = [];
  this.labirynth = labirynth;

  Array.prototype.clone = function() {
	   return this.slice(0);
  };

  /**
   * Função responsável por construir as
   * rotas até o rato.
   * Limpa as rotas antecendentes à chamada corrente da
   * função.
   * @constructor
   * @param {Labirynth} labirynth - Objeto principal
   * necessário para acessar os movimentos possíveis
   * @param {Router} self - Contexto do objeto roteador,
   * necessário para salvar as rotas calculadas.
   */
  this.buildRoutes = function(labirynth, self){
    self.routes = [];
    var m = labirynth.movementList;
    var route = [];

    var loop = function(origin, route, self){
      var rClone = route.clone();
      rClone.unshift(origin);

      if(origin.isEqual(self.labirynth.mouse)){
        self.routes.push(rClone);
      }

      for (var i = 0; i < m.length; i++) {
        var possible = m[i].movePosition(origin, self.labirynth);

        if(possible){
            loop(possible, rClone, self);
        }
      }
    };

    loop(labirynth.end, route, self);

  };

  /**
   * Retorna todas as rotas calculadas
   * @returns {Array}
   */
  this.getRoutes = function(){
    return this.routes;
  };

  /**
   * Retorna a menor das rotas
   * já calculadas pela função
   * @function buildRoutes
   *
   * @returns {Array}
   */

  this.refreshCosts = function(){
    for (var i = 0; i < this.routes.length; i++) {
      for (var j = 0; j < this.routes[i].length; j++) {
        var position = this.routes[i][j];
        if(position.isEqual(this.labirynth.cat)){
          position.cost = Infinity;
          this.routes[i][j] = position;
        }
      }
    }
  };

  this.getMinRoute = function(){

    if (this.labirynth.cat) {
      this.refreshCosts();
    }

    if(_.isEmpty(this.routes)){
      return;
    }

    var minRoute = this.routes[0];
    var minCost = getRouteTotalCost(0, this);
    for (var i = 1; i < this.routes.length; i++) {
      var cost = getRouteTotalCost(i, this);
      if(minCost > cost){
        minCost = cost;
        minRoute = this.routes[i];
      }
    }

    return minRoute;
  };

  /**
   * Retorna o custo total de
   * uma determinada rota
   * @returns {number}
   */
  var getRouteTotalCost = function(index, self){
    if (index < self.routes.length && index >= 0) {
      var route = self.routes[index];
      var totalCost = 0;

      for (var i = 0; i < route.length; i++) {
        totalCost += route[i].getCost();
      }

      return totalCost;
    }
  };


};

module.exports = Router;
