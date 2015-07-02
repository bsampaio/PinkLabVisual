
var PinkController = function(filename){
  var LabirintoFactory = require('../models/Labirinto.js');
  var labirinto = new LabirintoFactory(filename).getLabirinto();

  this.isEqual = function (posA, posB) {
    return (posA.x === posB.x) && (posB.y === posA.y);
  };

  this.labirinto = labirinto;
  this.ratoVivo = true;
  this.acabouJogo = false;
  this.rota = [];
  this.gameStatus = "running";
  this.rodada = 0;

  this.perdeuJogo = function(){
    this.ratoVivo = false;
    this.acabouJogo = true;
    this.gameStatus = "perdeu";
  };

  this.ganhouJogo = function(){
    this.acabouJogo = true;
    this.gameStatus = "ganhou";
  };

  this.rodaTurno = function(){
    if(! this.acabouJogo){
      try {
        var menorRota = this.labirinto.acharMenorRota(this.labirinto.rato);
        var route = menorRota.menorRota;
        var weight = menorRota.menorPesoRota;
      } catch (e) {
        console.log(e);
        this.perdeuJogo();
        return;
      }

      this.labirinto.gato = this.labirinto.criarGato();
      this.labirinto.moverRato(route[route.length-2]);
      this.rota.push(route[route.length-2]);

      if( this.isEqual(this.labirinto.gato, this.labirinto.rato)){
        this.perdeuJogo();
      }

      if( this.isEqual(this.labirinto.rato, this.labirinto.fim)){
        this.ganhouJogo();
      }
    }
    this.rodada += 1;
  };

  this.getGatoPos = function(){
    return this.labirinto.gato;
  };

  this.getRatoPos = function(){
    return this.labirinto.rato;
  };

  this.getLabirinto = function(){
    return this.labirinto.labirinto;
  };

  this.getTabelaCustos = function(){
    return this.labirinto.tabelaCustos;
  };

  this.checkPerdeuJogo = function(){
    return (this.getGatoPos() == this.getRatoPos());
  };

  this.getReport = function(){
    return {
      "catPosition":this.getGatoPos(),
      "mousePosition":this.getRatoPos(),
      "labyrinth":this.getLabirinto(),
      "costs":this.getTabelaCustos(),
      "status":this.gameStatus,
      "rodada":this.rodada
    };
  };

  if(this.checkPerdeuJogo()){
    this.perdeuJogo();
  }
};


module.exports = PinkController;
