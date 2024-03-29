const { MessageEmbed } = require("discord.js");
const { transliterate: tr } = require("transliteration");

module.exports = {
    name: "nickname",
    aliases: ['nick', 'nk'],
    cooldown: 0,
    category: "Moderation",
    memberPermissions: ['MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_NICKNAMES'],
 usage: '<@mention | id> [nickname]',
    description: 'Used to decancer someone\'s nickname.',
    execute: async (client, message, args, text, instance) => {
        const { guild, member, mentions, channel } = message;
        const target = mentions.members.first() || guild.members.cache.get(args[0]);
        if (!target) return channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} Please mention or provide ID of someone.`))
        if (target.roles.highest.position >= member.roles.highest.position) return channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} You cannot change nickname of that member.`));
        if (target.roles.highest.position >= guild.me.roles.highest.position) return channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} You cannot change nickname of that member.`));

        const nickname = args[1] ? text.replace(args[0] , "") : undefined|| target.displayName || target.user.username;
        const decancer = tr(nickname);
        try {
            target.setNickname(decancer, `De-Cancer: ${member.user.tag}`)
            channel.send(new MessageEmbed().setColor(instance.color.success).setDescription(`${instance.emoji.success} Changed the nickname of ${target} to **${decancer}**.`));
        } catch (e) {
            channel.send(new MessageEmbed().setColor(instance.color.error).setDescription(`${instance.emoji.error} I cannot change nickname of that member.`));
        }
    }
}