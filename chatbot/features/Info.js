module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("info", controller);
    // const nlu = require('../scripts/nlu.js');  flow.after(async (response, bot) => {

    console.log("Iniciando fluxo de conversa [info]");

    flow.addAction("info");
    //flow.addMessage({
    //    "type": "message",
    //    "section": "info",
    //    "body": "o que quer saber",
    //}, "info")

    const handleInfo = [
        {
            pattern: "medicamento",
            handler: async (response, flow, bot) => {
                console.log("Usuário escolheu medicamento");
                await bot.cancelAllDialogs();
                await bot.beginDialog("medicamento");
            },
        },
    ];

    flow.addQuestion(JSON.stringify({
        "type": "question",
        "section": "info",
        "body": "Que tipo de info quer saber?"
    }), handleInfo, "info_response", "info")

    flow.after(async (response, bot) => {
        console.log("Finalizando fluxo de conversa do info");
        await bot.cancelAllDialogs();
    });

    controller.addDialog(flow);

    controller.on("message", async (bot, message) => {
        console.log("Mensagem recebida: ", message.text);
    });
};
