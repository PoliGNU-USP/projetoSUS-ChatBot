//  __   __  ___        ___ 
// |__) /  \  |  |__/ |  |   
// |__) \__/  |  |  \ |  |   

// This is the main file for the Raya bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
// Import a platform-specific adapter for webex.

const { WebAdapter } = require('botbuilder-adapter-web');

// const { MongoDbStorage } = require('botbuilder-storage-mongodb');

// Load process.env values from .env file
require('dotenv').config();

let storage = null;
// if (process.env.MONGO_URI) {
//     storage = mongoStorage = new MongoDbStorage({
//         url : process.env.MONGO_URI,
//     });
// }

const adapter = new WebAdapter({});

const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: adapter,
    storage
});

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

    // controller.interrupts("PARAR", "message", async (bot, message) => {
    //     await bot.say({"type":"message","text":{
    //         "type": "message",
    //         "section": "stop",
    //         "body": "Até a próxima! Se precisar, é só chamar."
    //     }});
    //     console.log("Encerramento")
    //     await bot.cancelAllDialogs();
    // });

    controller.on("channel_join", async (bot, message) => {
        await bot.beginDialog("welcome")
    })

    controller.on("message", async (bot, message) => {
        // flowType = message.incoming_message.channelData.userData.flowType
        // console.log(flowType)
        try {
            console.log(message.incoming_message.channelData.userData)
            await bot.cancelAllDialogs();
            await bot.beginDialog("menu")//, { "userData": message.incoming_message.channelData.userData });
        }
        catch (err) {
            console.log(err)
            //console.log(message.incoming_message.channelData.userData.userData.phoneNumber + " - "+ "NO FLOW ERROR" + String(err))
            await bot.cancelAllDialogs();
        }
    });
});
