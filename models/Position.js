/**
 * Representa a classe de posição
 * e seu comportamento.
 * @constructor
 * @param {int} x - Posição de x
 * na matriz do labirinto
 * @param {int} y - Análogo a x
 * @param {int} y - Custo de (x,y)
 */
var Position = function(x, y, cost) {
  this.x = x;
  this.y = y;
  this.cost = cost;

  this.getCost = function(){
    return this.cost;
  };

  this.isEqual = function(other){
    var equal = this.x === other.x;
    equal = equal && (this.y === other.y);

    return equal;
  };

  this.setCost = function(cost) {
    this.cost = cost;
  };
};

module.exports = Position;
