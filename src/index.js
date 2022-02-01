require("dotenv").config()
const fs = require("fs")

const {Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});

client.commands = new Collection()

const CommandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
CommandFiles.forEach(CommandFile => {
    const command = require(`./commands/${CommandFile}`)
    client.commands.set(command.data.name, command)
})

const EventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))
EventFiles.forEach(EventFile => {
    const event = require(`./events/${EventFile}`)
    client.on(event.name, (...args) => event.execute(...args))
})

client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`);
    client.user.setActivity({
        name: '2001: A Space Odyssey',
        type: 'WATCHING'
    })
});

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if(command) {
        try {
            await command.execute(interaction)
        } catch(error) {
            console.error(error)
            if(interaction.deferred || interaction.replied) {
                interaction.editReply("Es ist ein fehler beim ausführen aufgetreten!")
            } else {
                interaction.reply("Es ist ein fehler beim ausführen aufgetreten!")
            }
        }
    }
})

client.on('voiceStateUpdate', (oldState, newState) => {
    if(newState.channelId === process.env.CHANNEL_ID) {
        newState.guild.channels.create(`${newState.member.displayName}'s VC`, {
            type: 'GUILD_VOICE',
            parent: process.env.PARENT_CHANNEL_ID,
            permissionOverwrites: [{
                id: newState.member.user,
                allow: ["MANAGE_CHANNELS"]
            }]
        }).then(vc => {
            newState.setChannel(vc);
        })
    }
    if(oldState.channelId != null) {
        if(oldState.channel.parentId == process.env.PARENT_CHANNEL_ID) {
            if(oldState.channelId != process.env.CHANNEL_ID) {
                if(oldState.channel.members.size == 0) {
                    oldState.channel.delete('Delete empty Channel.')
                }
            }
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);