/**
  * Seção de imports
  */
var _ = require('underscore');

/**
 * Representa a classe de Células
 * e seu comportamento.
 * @constructor
 * @param {Position} position - Posição da célula
 * na matriz de labirinto.
 */

var Cell = function(position){
  this.position = position;
  this.destinations = [];
  this.valid = null;


  //FIXME: Cria uma árvore de dependencia.
  //TODO: Criar uma rota simples e válida
  /**
   * Encontra os possíveis movimentos e
   * instancia novas células, adiconando no laboratório.
   * Ao adicionar, automaticamente buscará a próxima
   * até retornar a primeira chamada de função.
   * @param {Labirynth} labirynth - Labirinto para busca
   */
  this.findNext = function(labirynth, movementList){
    var m = movementList;
    for (var i = 0; i < m.length; i++) {
      var finded = m[i].movePosition(this.position, labirynth);

      if(finded){
        var cell = new Cell(finded);
        cell.registerDestination(this);
        labirynth.registerCell(cell);
      }
    }
  };

  /**
   * Calcula o custo mínimo do próximo
   * movimento. Caso não haja movimentos,
   * retorna a própria posição.
   * @returns {Cell}
   */
  this.getMinDestination = function(){
    if(this.destinations.length === 0){
      return this.position;
    }

    var minCost = this.position.cost + this.destinations[0].position.cost;
    var minCell = this.destinations[0];

    for (var i = 1; i < this.destinations.length; i++) {

      var auxCost = this.position.cost + this.destinations[i].position.cost;

      if(auxCost < minCost){
        minCost = auxCost;
        minCell = this.destinations[i];
      }
    }

    return minCell;
  };

  /**
   * Retorna o custo da célula
   * @returns {int}
   */
  this.getCost = function(){
    return this.position.cost;
  };

  /**
   * Procedimento para registrar um novo
   * destino possível caso não tenha cadastrado ainda
   * @returns {void}
   * @param {Cell} - posição para inserção
   */
  this.registerDestination = function(cell){
    if(! findInDestinations(cell)){
      this.destinations.push(cell);
    }
  };

  /**
   * Função para verificar se o destino já foi cadastrado
   * na lista dos destinos
   * @returns {boolean}
   * @param {Position} position - posicao verificada
   */
  var findInDestinations = function(cell){

    if(_.isEmpty(this.destinations)){
      return false;
    }

    var finded = this.destinations.some(function(element){
      var condition = _.isEqual(element, cell);
      return condition;
    });

    return (finded);
  };
};

module.exports = Cell;
