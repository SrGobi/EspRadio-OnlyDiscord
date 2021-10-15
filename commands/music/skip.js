const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
    name: 'skip',
    category: 'music',
    description: 'Dejar de reproducir música y si hay cola pasa a la siguiente',
    aliases : ["sk"],
    usage: `skip`,
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {Distube.default} distube
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(message.member.permissions.has('SPEAK')){
            if (!message.member.voice.channel) return message.channel.send({ content: 'Debes estar en un canal de voz para usar este comando.' });
            let queue = await client.distube.getQueue(message);
            if(queue) {
                client.distube.skip(message)
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.guild.name, client.user.displayAvatarURL())
                    .setColor(process.env.COLOR)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setDescription("⏭️  **|**  Se ha utilizado el comando omitir!")
                    .setFooter('Created by SrGobi | BLD SRGOBI#0001 | patreon.com/espcustoms')
                message.channel.send({ embeds: [embed] });    
            } else if (!queue) {
                return
            };
        }else{
            let Embed_Error = new Discord.MessageEmbed()
                .setColor('#EF0B0B')
                .setTitle(`⛔ **No tienes permiso para usar este comando** ⛔`)
            message.channel.send({ embeds: [Embed_Error] }).then(m => m.delete({timeout: 5000}))
        }
    }
}