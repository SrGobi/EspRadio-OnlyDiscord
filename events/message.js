const Discord = require('discord.js');
const Distube = require('distube');

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message
 * @returns 
 */
module.exports = async (client, message) => {
    if (message.author.bot) return;

    const prefix = process.env.PREFIX;

    // si la gente nos menciona, cuéntales sobre nuestro prefijo
	if(message.mentions.users.size){
		if(message.mentions.users.first().id == client.user.id){
			return message.reply(`Mi prefijo es \`\`${prefix}\`\``)
		}
    }
    
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command.length === 0) return;

    let commandFile = client.commands.get(command);

    if (!commandFile) commandFile = client.commands.get(client.aliases.get(command));

    if (commandFile){
        commandFile.run(client, message, args);
    }
};