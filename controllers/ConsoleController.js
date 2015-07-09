
var ConsoleController = function(labController){

  this.start = function(){
    var readline = require('readline');
    var rl = readline.createInterface(process.stdin, process.stdout);

    rl.setPrompt('SmartBrain > ');
    rl.prompt();
    console.log('Pressione enter para iniciar. \n Digite \'next\' para avançar ao proximo passo');
    rl.on('line', function(line) {
        if (line === "close") rl.close();
        if (line === 'next') labController.runStep();
        rl.prompt();
    }).on('close',function(){
        process.exit(0);
    });
  };
};

module.exports = ConsoleController;
