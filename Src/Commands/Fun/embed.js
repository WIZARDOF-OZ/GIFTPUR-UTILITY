const Discord = require('discord.js');
const Client = new Discord.Client();
module.exports = {
    name:"embed",
    category:"Fun",

    execute: (Client, message, args) => {
        const embed = new Discord.MessageEmbed()

        .setTitle(`Embed`)
        .setColor(`RANDOM`)
        .setThumbnail(message.guild.iconURL({dynamic:true}))
        .setDescription(message.content.substring(7))
        .setFooter(`REQUESTED BY ${message.author.tag}`,`${message.author.displayAvatarURL({dynamic:true})}`)
        .setTimestamp();
        message.channel.send(embed)
                
    }
}