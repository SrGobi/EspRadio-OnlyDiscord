const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
    name: 'play',
    category: 'music',
    description: 'Puedes indicar los títulos de las canciones o poner los enlaces',
    aliases : ["p","music"],
    usage: `play`,
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {Distube.default} distube
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(message.member.permissions.has('SPEAK')){
            if (!message.member.voice.channel) return message.channel.send({ content: 'Debes estar en un canal de voz para usar este comando.' });
            const music = args.join(' ');
            client.distube.play(message, music)
        }else{
            let Embed_Error = new Discord.MessageEmbed()
                .setColor('#EF0B0B')
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
            message.channel.send({ embeds: [Embed_Error] }).then(m => m.delete({timeout: 5000}))
        }
    }
}