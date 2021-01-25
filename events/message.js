
module.exports = async (discordclient, message) => {
    if (message.author.bot) return;

    const prefix = process.env.PREFIX;

    // si la gente nos menciona, cuéntales sobre nuestro prefijo
	if(message.mentions.users.size){
		if(message.mentions.users.first().id == discordclient.user.id){
			return message.reply(`Mi prefijo es \`\`${prefix}\`\``)
		}
    }
    
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command.length === 0) return;

    let commandFile = discordclient.commands.get(command);

    if (!commandFile) commandFile = discordclient.commands.get(discordclient.aliases.get(command));

    if (commandFile){
        commandFile.run(discordclient, message, args);
    }
};