const db = require("old-wio.db");
const {MessageEmbed, Message, Client} = require('discord.js');
const Discord = require("discord.js");
const config = require("../../../config.js")
const { version: discordjsVersion} = require('discord.js')
const moment = require("moment");
const ms = require("pretty-ms");
const package = require("../../../package.json");
const fetch = require("node-fetch");
const { version } = require("../../../package.json");
const { re } = require("mathjs");


module.exports = {
    name:"ping",
    cooldown:0,
    aliases: ["bot"],
    category: "Information",

/**
 * @param {Client} client
 * @param {Message} message
 */


    execute: async(client, message, args, text, instance) => {
const mongoApi = await latency(config.mongoDB)
        const generalAPI = await latency(`https://tke-general.screeneros.repl.co/`);
        const GeneralStatus = [
            `Dependencies: ${Object.keys(package.dependencies).length}`,
            `MongoDB [Database]: ${mongoApi ? `<:online:846303129418465350>` : "<:offline:846311028177895444>"}`,
            `Wizard's UtitliyGeneral APIs: ${generalAPI.status ? `<:online:846303129418465350>` : "<:offline:846311028177895444>"}`,
            
           
            
        ]
        const WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ = await client.users.cache.get("583666642010112000");
        const botinfo = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${client.user.username} v${version}`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .addField('❯ Uptime :', `${ms(client.uptime)}`, true)
        .addField('❯ WebSocket Ping:', `${client.ws.ping}ms`, true)
        .addField('❯ Memory:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
        .addField('❯ Erros Detected',`${client.errors.size || "0"}`, true)
        .addField('❯ Last Updated',`${moment(instance.lastUpdated).format("DD/MM/YYYY")}`, true)
        .addField('❯ Functions',`5 addons, 2 workers`, true)
        .addField('❯ Events',`${client.events}`, true)
      .addField('❯ Guild Count:', `${client.guilds.cache.size} guilds`, true)
        .addField(`❯ User Count:`, `${client.guilds.cache.reduce((users , value) => users + value.memberCount, 0)} users`, true)
        .addField('❯ Commands:', `${client.commands.size} cmds`,true)
        .addField('❯ Node:', `${process.version} on ${process.platform} ${process.arch}`, true)
        .addField('❯ Cached Data:', `${client.users.cache.size} users\n${client.emojis.cache.size} emojis`, true)
        .addField('❯ Discord.js:', `${discordjsVersion}`, true)
        .addField('❯ Api Status ', btf(GeneralStatus))

        .setFooter(`Coded with 🍵 by ${WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ.tag}`, WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        message.channel.send(botinfo)

        function btf(array) {
            return array.map(x => `**❯** ${x}`).join("\n")
        }
        
        async function latency(uri) {
            const current = new Date();
            try {
                await fetch(uri).then(res => res.json());
                return {
                    status: true,
                    latency: Math.abs(Math.round(current - new Date()) || 0)
                }
            } catch (e) {
                return {
                    status: false,
                    latency: null
                }
            }
        }
        
    
    }
}