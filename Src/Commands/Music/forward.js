const { MessageEmbed } = require("discord.js");
const config = require("../../../config.js");
const ee = require("../../../JSON/embed_Config.json");
const { format } = require("../../../function.js")
module.exports = {
    name: "forward",
    category: "Music",
    aliases: ["fwd"],
    cooldown: 4,
    useage: "forward <Time in Seconds>",
    description: "Forwards for a specific amount of Time",
    execute: async (client, message, args, cmduser, text, prefix) => {
    try{
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Please join a Channel first`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | I am not playing Something`)
          .setDescription(`The Queue is empty`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Please join **my** Channel first`)
          .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | You didn't provided a Time you want to seek to!`)
          .setDescription(`Usage: \`${prefix}seek 10\``)
        )

      let queue = client.distube.getQueue(message);
      let seektime = queue.currentTime + Number(args[0]) * 1000;
      if(seektime < 0)
        seektime = queue.songs[0].duration * 1000;
      if(seektime >= queue.songs[0].duration * 1000)
        seektime = queue.songs[0].duration * 1000 - 1000;

      client.distube.seek(message, seektime);

      message.channel.send(new MessageEmbed()
        .setColor(ee.Green)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle(`⏩ Forwarded for \`${args[0]} Seconds\` to: ${format(seektime)}`)
      ).catch(e=>console.log(e.message))
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}