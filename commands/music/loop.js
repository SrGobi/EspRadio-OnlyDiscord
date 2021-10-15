const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
    name: 'loop',
    category: 'music',
    description: 'Puedes repetir la cola o cancion en bucle',
    aliases : ['loop'],
    usage: `loop`,
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {Distube.default} distube
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let mode = client.distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repetir cola" : "Repetir canción" : "Off";
        message.channel.send({ content: "Set repeat mode to `" + mode + "`" });
    }
}