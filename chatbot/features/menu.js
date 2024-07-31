
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("menu", controller);
    // const nlu = require('../scripts/nlu.js');

    flow.addAction("menu");

    const handleMenuInicial = [
        {
            pattern: "agendamento",
            handler: async (response, flow, bot) => {
                console.log("Usuário escolheu agendamento");
                await bot.cancelAllDialogs();
                await bot.beginDialog("agendamento");
            },
        },
        {
            pattern: "informação",
            handler: async (response, flow, bot) => {
                console.log("Usuário escolheu informação");
                await bot.cancelAllDialogs();
                await bot.beginDialog("info");
            },
        },
        {
            pattern: "medicamento",
            handler: async (response, flow, bot) => {
                console.log("Usuário escolheu medicamento");
                await bot.cancelAllDialogs();
                await bot.beginDialog("medicamento");
            },
        },
        {
            default: true,
            handler: async (response, flow, bot) => {
                console.log("Resposta não reconhecida: ", response);
                await flow.repeat();
            },
        },
    ];

    flow.addQuestion(JSON.stringify({
        type: "question",
        section: "Menu Inicial",
        body: "No que posso ajudar hoje?",
    }), handleMenuInicial, "menu_response", "menu");

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
    });

    controller.addDialog(flow);

    controller.on("message", async (bot, message) => {
        console.log("Mensagem recebida: ", message.text);
    });
};
