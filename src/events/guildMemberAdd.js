const {GuildMember, MessageEmbed} = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        member.guild.channels.cache.get("814661833642344520").send({
            embeds: [
                new MessageEmbed()
                    .setTitle("")
                    .setDescription(`Moin ${member.toString()}\n\nHerzlich Willkommen und viel Spaß`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor("BLURPLE")
            ]
        })
    }
}