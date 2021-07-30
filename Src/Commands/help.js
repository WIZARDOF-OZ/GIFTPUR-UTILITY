const { MessageEmbed, Collection, Client, Message } = require('discord.js');




module.exports = {
    name: "help",
    cooldown: 3,
    memberPermissions: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {String} text 
     * @param {Object} instance 
     */
    execute: async (client, message, args, text, instance) => {

        const WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ = await client.users.cache.get("583666642010112000");
        let commands = message.client.commands.array();

        const { author, channel } = message;
        let category = await client.commands.map(x => x.category);
        let embed = new MessageEmbed()
            .setAuthor(author.tag , author.displayAvatarURL())
            .setFooter(`Coded with 🍵 by ${WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ.tag}`, WIZARDOFOZᶫᵒᵛᵉᵧₒᵤ.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(`RANDOM`);
            
        let catList = []
        for (let i = 0; i < category.length; i++) {
            if (!catList.includes(category[i])) {
                catList.push(category[i])
                let cmdList = await client.commands.filter(x => x.category === category[i]).map(x => "`" + x.name + "`").join(", ")
                embed.addField(category[i] || "Misc", cmdList)
            }
        }
      message.channel.send(embed)
    }
}