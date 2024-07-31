module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("intro", controller);

    console.log("Iniciando fluxo de conversa [intro]");

    flow.addAction("intro");

    flow.addMessage(JSON.stringify({
        "type": "message",
        "section": "Introdução",
        "body": "Oi, sou a Suzana, a Inteligência Artificial do SUS, Eu consigo te ajudar com x, y e z",
    }), "intro");

    flow.addMessage(JSON.stringify({
        "type": "message",
        "section": "Introdução",
        "body": "Não se esqueça de que a vacinação contra a Dengue já começou. [Essa mensagem pode ser alterada dependendo da campanha de saúde atual]",
    }), "intro");

    flow.after(async (response, bot) => {
        console.log("Finalizando fluxo de conversa [intro]");
        await bot.cancelAllDialogs();
        flow.beginDialog("menu")
    });

    controller.addDialog(flow);
};
