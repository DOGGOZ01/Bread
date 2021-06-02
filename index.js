const Discord = require('discord.js');

require('dotenv').config({path: '/root/botsbiscord/breadbot/.env'});

let token = process.env.DISCORD_TOKEN;

const client = new Discord.Client({disableMentions: "everyone"});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(token);