
Labirynth = require('../models/Labirynth.js');
Resume = require('../models/Resume.js');
var _ = require('lodash');

var SmartBrainController = function(labName){

  this.labirynth = new Labirynth(labName);
  this.gameOver = false;
  this.gameStatus = "running";
  this.catTeleports = [];
  this.mouseSteps = [];
  this.currentStep = 0;

  /**
   * Função responsável por mover o
   * rato para a próxima posição
   * @returns {void}
   */
  this.moveMouse = function(){
    var mRoute = this.labirynth.getMinRoute();

    //Pega o próximo passo após a posição atual do rato
    var nextPosition = mRoute[1];

    //Salva um histórico dos movimentos do rato
    this.mouseSteps.push(nextPosition);
    this.labirynth.mouseStepTo(nextPosition);
  };


  /**
   * Invoca o gato direto das profundezas
   * do inferno (Local que garantiu suas
   * habilidades singulares).
   * @returns {void}
   */
  this.summonCatFromTheHellsDephts = function(){
    var catsFuckingAwesomeUnpredictableMovement = this.labirynth.generateCat();
    this.catTeleports.push(catsFuckingAwesomeUnpredictableMovement);
  };

  /**
   * Atualiza as informações importantes do jogo
   * @returns {void}
   */
  this.updateInfo = function(){
    if(this.labirynth.mouseGetCaught()){
      this.gameOver = true;
      this.gameStatus = "lose";
    }

    if(this.labirynth.mouseFled()){
      this.gameOver = true;
      this.gameStatus = "won";
    }

  };

  this.getResume = function(){

    console.log('\n <--- Step '+this.currentStep+' Info --->');
    console.log("Game Status: "+this.gameStatus+"\n");
    console.log("Mouse Steps: \n");
    console.log(JSON.stringify(this.mouseSteps) + '\n');
    console.log("Cat Teleports: \n");
    console.log(JSON.stringify(this.catTeleports) + '\n');
    console.log(JSON.stringify(this.getLabirynthMap()));
  };

  this.getLabirynthMap = function(){
    return _.clone(this.labirynth.map, true);
  };

  /**
   * Roda um turno do programa, movendo
   * o rato para a próxima posição da
   * menor rota
   * @returns {Resume}
   */
  this.runStep = function(){
    if(! this.gameOver){
      this.moveMouse();
      this.summonCatFromTheHellsDephts();
      this.updateInfo();
      this.currentStep++;
      this.labirynth.buildRoutes();
    }else{
      console.log("The game already ended... See your results: \n");
    }

    var rsm = {
      map:this.getLabirynthMap().getClone(),
      status:this.gameStatus,
      mouse: this.mouseSteps[this.mouseSteps.length-1],
      cat: this.catTeleports[this.catTeleports.length-1],
      step: this.currentStep
    };

    return new Resume(rsm);
  };
};

module.exports = SmartBrainController;
