module.exports = function (controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("info", controller);
    // const nlu = require('../scripts/nlu.js');  flow.after(async (response, bot) => {
        flow.addAction("info")

        flow.addMessage(JSON.stringify({
          "type": "message",
          "section": "info",
          "body": "o que quer saber"
        }),
          "info")
      
        flow.addQuestion(JSON.stringify({
          "type": "question",
          "section": "info",
          "body": "Que tipo de info quer saber   ?"
        }),
        async(response, flow, bot)=>{
            if(response == "medicamento"){
                await bot.cancelAllDialogs();
                await bot.beginDialog("medicamento");
            }
        },"info_response"
        /*onde fica a resposta do usuario*/, "info"
      )
      
        flow.after(async (response, bot) => {
          await bot.cancelAllDialogs();
        });
        controller.addDialog(flow);
};