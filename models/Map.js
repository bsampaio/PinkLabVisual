/**
 * Representa a classe de Mapa
 * e seu comportamento.
 * @constructor
 * @param {string[]} lab - Lista de strings
 * que representam os caminhos no mapa
 * @param {string[]} costs - Lista de strings
 * que representam os custos dos caminhos do mapa
 * @returns Map
 */

var _ = require('lodash');

 var Map = function(obj){
   this.lab = obj.lab;
   this.costs = obj.costs;

   this.getClone = function(){
   	return _.clone(this, true);
   };
 };

 module.exports = Map;
