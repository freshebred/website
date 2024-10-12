const { Client, GatewayIntentBits } = require('discord.js');
require("dotenv").config()

const client = new Client({
     intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


//client.once(Events.ClientReady, readyClient => {
//	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
//});
client.on('ready',()=>{
    console.log(`Ready! Logged in as ${client.user.tag}`);
})

client.on('messageCreate', (msg)=>{
    if (msg.author.bot){
        return
    }
    if (msg.content.startsWith("oh!") == true) {
        msg.reply("you used `oh!` tool, nice job!")
    }
})

client.login(process.env.TOKEN);