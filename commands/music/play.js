const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
    name: 'play',
    category: 'music',
    description: 'Puedes indicar los títulos de las canciones o poner los enlaces',
    aliases : ["p","music"],
    usage: `play`,
    run: async (discordclient, message, args) => {
        if(message.member.hasPermission('SPEAK')){
            if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz para usar este comando.');
            const music = args.join(' ');
            discordclient.distube.play(message, music)
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor('#EF0B0B')
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
            message.channel.send(embed).then(m => m.delete({timeout: 5000}))
        }
    }
}