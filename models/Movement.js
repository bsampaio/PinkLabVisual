/**
 * Representa a classe de movimentos
 * e seu comportamento.
 * @constructor
 * @param {int} x - Valor somado à x
 * no momento do movimento. (1,0,-1);
 * @param {int} y - Análogo a x
 * @param {string} direction - Descrição da direção
 */

var Movement = function(x, y, direction){
  this.direction = direction;
  this.x = x;
  this.y = y;

  /**
   * Função que retorna o movimento a partir
   * de outra posicao, de acordo com alguma direção
   * @returns Position
   * @param {Position} position - Posição inicial a mover
   * @param {Labirynth} lab - Objeto Labirinto relacionado
   */
  this.movePosition = function(position, lab){
    var x = position.x + this.x;
    var y = position.y + this.y;

    return lab.getPosition(x, y);
  };
};

module.exports = Movement;
