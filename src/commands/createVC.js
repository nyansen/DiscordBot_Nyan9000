const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed, Guild} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vc')
    .setDescription('create new voice channel')
    .addSubcommand(subCcommand => subCcommand.setName('Create').setDescription('Create new Voice Channel'))
    .addSubcommand(subCcommand => subCcommand.setName('Rename').setDescription('Rename Voice Channel'))
    .addSubcommand(subCcommand => subCcommand.setName('Delete').setDescription('Delete Voice Channel')),
    async execute(interaction) {
        switch(interaction.options.getSubcommand()) {
            case 'Create': {
                const newChannelName = `${interaction.member.displayName}'s Channel`
                interaction.guild.channels.create(`${newChannelName}`, {
                    type: 'GUILD_VOICE',
                    parent: '589107550520082591',
                    permissionOverwrites: [{
                        id: interaction.member.user,
                        allow: ['MANAGE_CHANNELS']
                    }]
                })

                await Tags.create({
                    name: interaction.guild.channels.getId(`${newChannelName}`),
                    description: 'channelID',
                    username: interaction.user.username,
                })
                break
            }
            case 'Rename': {
                break
            }
            case 'Delete': {
                break
            }
        }
    }
}