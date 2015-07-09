/**
 * Representa a classe de Resumo
 * e seu comportamento.
 * @constructor
 * @param {string[]} costs - Lista de strings
 * que representam os custos dos caminhos do mapa
 * @returns {Resume}
 */

var _ = require('lodash');

 var Resume = function(report){

 	String.prototype.replaceAt=function(index, character) {
    	return this.substr(0, index) + character + this.substr(index+character.length);
	};
 	
 	/**
 	 * This map is a snapshot of current status in labirynth
 	 */
 	this.map = (function (report){
 		var mouse = report.mouse;
 		var cat = report.cat;
 		var map = _.clone(report.map, true);
 		map.lab[mouse.x] = map.lab[mouse.x].replaceAt(mouse.y,"M");
 		map.lab[cat.x] = map.lab[cat.x].replaceAt(cat.y,"C");
 		map.costs[cat.x] = map.costs[cat.x].replaceAt(cat.y,"I");
 		return new Map(map);
	})(report);

 	this.status = report.status;
 	this.step = report.step;
 };

 module.exports = Resume;