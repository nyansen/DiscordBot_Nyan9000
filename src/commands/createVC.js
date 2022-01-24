const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed, Guild} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vc')
    .setDescription('create new voice channel.'),
    async execute(interaction) {
        const newChannelName = `${interaction.member.displayName}'s Channel`
        interaction.guild.channels.create(`${newChannelName}`, {
            type: 'GUILD_VOICE',
            parent: '589107550520082591',
            permissionOverwrites: [{
                id: interaction.member.user,
                allow: ['MANAGE_CHANNELS']
            }]
        })
        interaction.reply("Your channel is created.\nYou have all the rights to modify the channel.\nThe channel is automatically deleted after the last user has left it.")
    }
}