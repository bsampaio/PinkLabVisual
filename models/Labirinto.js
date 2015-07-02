
/*Imports: */

var rl = require('./readLab.js');



//Funcao construtora
var Labirinto = function (lab, tabCustos) {

  var Pos = function(x, y){
    return {"x":x,"y":y};
  };

  this.isEqual = function (posA, posB) {
    return (posA.x === posB.x) && (posB.y === posA.y);
  };

  this.acharChar = function(c){
    c = c.toUpperCase();
    for (var i = 0; i < this.labirinto.length; i++) {
      for (var j = 0; j < this.labirinto[i].length; j++) {
        var currChar = this.labirinto[i][j];
        if(currChar === c){
          return new Pos(i,j);
        }
      }
    }
  };

  this.moverRato = function(newPos){
    this.rato = newPos;
  };

  this.criarGato = function(){
    var x_maximum = this.labirinto.length-1;
    var y_maximum = this.labirinto[0].length-1;
    var minimum = 0;

    var x = Math.floor(Math.random() * (x_maximum - minimum )) + minimum;
    var y = Math.floor(Math.random() * (y_maximum - minimum )) + minimum;

    if(this.labirinto[x]){
      if(this.labirinto[x][y] == '0'){
        return this.criarGato();
      }
    }else{
      console.log("Não existe o índice X="+x+" na matrix de labirintos");
      console.log(this.labirinto);
    }

    return new Pos(x,y);
  };

  this.possiveisMovimentos = function (pos){
    var possiveis = [];
    var posX, posY;
    posX = pos.x;
    posY = pos.y;
    var mov = [this.movimentos.cima, this.movimentos.esquerda]
    for (var i = 0; i < mov.length; i++) {
      var x = (mov[i].x + posX);
      var y = (mov[i].y + posY);

      if ( (x >= 0 && x < this.MaxLines) && (y >= 0 && y < this.MaxColumns) ){
        if(this.labirinto[x][y] !== '0'){
          possiveis.push(new Pos(x,y));
        }
      }
    }

    return possiveis;
  };

  this.fazRotas = function(pos){
    var rotas = [];

    var loop = (function (self) {
      return function(pos, r){
        r.push(pos);
        if(self.isEqual(pos,self.rato)){
          rotas.push(r);
        }else{
          var pMovimentos = self.possiveisMovimentos(pos);
          for (var i = 0; i < pMovimentos.length; i++) {
            var mov = pMovimentos[i];
            loop(mov, r);
          }
        }
      };
    }(this));

    loop(this.fim, []);
    return rotas;
  };

  this.calcularCustoRota = function(rota){
    var peso = 0;

    for (var i = 0; i < rota.length; i++) {
      var p = rota[i];
      if(this.isEqual(p,this.gato)){
        peso = peso + Infinity;
      }else{
        peso = peso + parseInt(this.tabelaCustos[p.x][p.y]);
      }
    }

    return peso;
  };

  this.acharMenorRota = function(pos){
    var rotasPossiveis = this.fazRotas(pos);

    if(rotasPossiveis.length === 0){
      console.log("!!! Não tem rotas !!!");
      return;
    }

    var menorRota = rotasPossiveis[0];
    var menorPesoRota = this.calcularCustoRota(menorRota);

    for (var i = 0; i < rotasPossiveis.length; i++) {
      var p = rotasPossiveis[i];
      var pesoRota = this.calcularCustoRota(p);

      if (menorPesoRota > pesoRota) {
        menorPesoRota = pesoRota;
        menorRota = p;
      }
    }

    return {
      "menorRota":menorRota,
      "menorPesoRota":menorPesoRota
    };
  };

  this.labirinto = lab || [];
  this.tabelaCustos = tabCustos;
  this.inicio = this.acharChar('S');
  this.fim = this.acharChar('F');
  this.rato = this.inicio;
  this.gato = this.criarGato();
  this.MaxLines = this.labirinto.length;
  this.MaxColumns = this.labirinto[0].length;

  this.movimentos = {
    cima:{ x:0, y:-1 },
    baixo:{ x:0, y:1 },
    direita:{ x:1, y:0},
    esquerda:{ x:-1, y:0}
  };

  this.printLabirinto = function(){console.log(this.labirinto)};
  this.printTabelaCustos = function(){console.log(this.tabelaCustos)};
};

var LabirintoFactory = function(filename){
  this.file = rl.carregarArquivo(filename);
  this.getLabirinto = function(){
    return new Labirinto(this.file.labirinto, this.file.tabelaCustos);
  };
};

module.exports = LabirintoFactory;
