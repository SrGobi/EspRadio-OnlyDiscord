const Discord = require('discord.js');
const discordclient = new Discord.Client({disableEveryone: false});
const Distube = require('distube');
const fs = require('fs');
const { config } = require('dotenv');
discordclient.distube = new Distube(discordclient, { searchSongs: false, emitNewSongOnly: true });
discordclient.distube
.on("playSong", (message, queue, song) => message.channel.send(
    `**Escuchando** 🎶 \`${song.name}\` - \`${song.formattedDuration}\``
))
.on("addSong", (message, queue, song) => message.channel.send(
    `**Agregada** 👍 ${song.name} - \`${song.formattedDuration}\``
))
discordclient.commands = new Discord.Collection();
discordclient.aliases = new Discord.Collection();
discordclient.categories = fs.readdirSync('./commands/');
/////////////////////////////////////////////////////  ENV  /////////////////////////////////////////////////////
config({
    path: `${__dirname}/.env`
});
/////////////////////////////////////////////////////  Handler  /////////////////////////////////////////////////////
['command'].forEach(handler => {
    require(`./handlers/${handler}`)(discordclient);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Evento cargado '${evtName}'`);
        discordclient.on(evtName, evt.bind(null, discordclient));
    });
});
/////////////////////////////////////////////////////  STATUS  /////////////////////////////////////////////////////
discordclient.on("ready", () => {
    console.log('[DISCORD]', `Estoy en linea, mi nombre es ${discordclient.user.username}`);
    discordclient.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "ESP CUSTOMS",  // The message shown
            type: "LISTENING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
});
/////////////////////////////////////////////////////  Token Bot Developer  /////////////////////////////////////////////////////
discordclient.login(process.env.TOKEN);
