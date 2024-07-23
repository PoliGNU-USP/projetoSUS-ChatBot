
module.exports = function (controller) {

  const { BotkitConversation } = require("botkit");
  const flow = new BotkitConversation("menu", controller);
  // const nlu = require('../scripts/nlu.js');

  flow.addAction("intro")


  flow.addMessage(JSON.stringify({
    "type": "message",
    "section": "Introdução",
    "body": "Oi, sou a Suzana, a Inteligência Artificial do SUS, Eu consigo te ajudar com x, y e z"
  }),
    "intro")

  flow.addMessage(JSON.stringify({
    "type": "message",
    "section": "Introdução",
    "body": "Não se esqueça de que a vacinação contra a Dengue já começou. [Essa mensagem pode ser alterada dependendo da campanha de saúde atual]"
  }, null, 10),
    "intro")


  flow.addAction("menuInicial", "intro")


  flow.addQuestion(JSON.stringify({
    "type": "question",
    "section": "Menu Inicial",
    "body": "No que posso ajudar hoje?"
  }),
    async (response, flow, bot) => { 
      if(response=="agendamento"){
        await bot.cancelAllDialogs();
        await bot.beginDialog("agendamento")
      }if(response == "informação"){
        await bot.cancelAllDialogs();
        await bot.beginDialog("info")
      }
    },
    "escolhaMenu",
    "menuInicial")


  flow.after(async (response, bot) => {
    await bot.cancelAllDialogs();
  });
  controller.addDialog(flow);
};