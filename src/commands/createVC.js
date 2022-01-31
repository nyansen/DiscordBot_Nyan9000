const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed, Guild} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vc")
        .setDescription("create new voice channel.")
        .addStringOption(option => 
            option.setName("vcname")
            .setDescription("Enter your channel Name.")
            .setRequired(false)),
    async execute(interaction) {
        var selectedVCName = interaction.options.getString("vcname")
        var newChannelName = `${interaction.member.displayName}'s Channel`
                
        if (selectedVCName) {
            newChannelName = selectedVCName
        }

        interaction.guild.channels.create(`${newChannelName}`, {
            type: 'GUILD_VOICE',
            parent: process.env.PARENT_CHANNEL_ID,
            permissionOverwrites: [{
                id: interaction.member.user,
                allow: ['MANAGE_CHANNELS']
            }]
        })

        var replyMsg = "Your channel is created.\nYou have all the rights to modify the channel.\nThe channel is automatically deleted after the last user has left it.";
        await interaction.reply({ content: replyMsg, ephemeral: true });
    }
}