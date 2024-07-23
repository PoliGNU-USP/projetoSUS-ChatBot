module.exports = function (controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("medicamento", controller);
    // const nlu = require('../scripts/nlu.js');
  
    flow.addAction("medicamento")  
    
    flow.addMessage(JSON.stringify({
        "type":"message",
        "section":"medicamento",
        "body":"não podemos passar receita, consulte um medico"
    }))
    
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
      });
      controller.addDialog(flow);
};