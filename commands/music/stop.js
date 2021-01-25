const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
    name: 'stop',
    category: 'music',
    description: 'Deja de reproducir música y se sale del canal',
    aliases : ["st","disconnect","dc"],
    usage: `stop`,
    run: async (discordclient, message, args) => {
        if(message.member.hasPermission('SPEAK')){
            if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz para usar este comando.');
            let queue = await discordclient.distube.getQueue(message);
            if(queue) {
                discordclient.distube.stop(message)
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.guild.name, discordclient.user.displayAvatarURL())
                    .setColor(process.env.COLOR)
                    .setThumbnail(discordclient.user.displayAvatarURL())
                    .setDescription("⏹️  **|**  Se ha utilizado el comando detener!")
                    .setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms')
                message.channel.send(embed);    
            } else if (!queue) {
                return
            };
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor('#EF0B0B')
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
            message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
}