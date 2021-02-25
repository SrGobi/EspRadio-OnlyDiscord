const Discord = require('discord.js');
const discordclient = new Discord.Client({disableEveryone: false});
const Distube = require('distube');
const fs = require('fs');
const { config } = require('dotenv');
discordclient.distube = new Distube(discordclient, {
    youtubeCookie: config.cookie,
    searchSongs: true,
    emitNewSongOnly: true,
    highWaterMark: 1<<24,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: true,
    searchSongs: false,
    youtubeDL: true,
    updateYouTubeDL: false
})
discordclient.distube
.on("playSong", (message, queue, song) => message.channel.send(
    `**Escuchando** 🎶 \`${song.name}\` - \`${song.formattedDuration}\``
))
.on("addSong", (message, queue, song) => message.channel.send(
    `**Agregada** 👍 ${song.name} - \`${song.formattedDuration}\``
))
.on("empty", message => {message.channel.send(
    "El canal está vacío. Sin embargo esperaré 24/7"
)})
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
    let statuses = [
        "Esp Customs Radio",
        "/play",
        "Radio 24/7 Free",
        "https://esp-customs.herokuapp.com"
    ]
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        discordclient.user.setActivity(status, {type: "LISTENING"});
    }, 20000)
});
/////////////////////////////////////////////////////  Token Bot Developer  /////////////////////////////////////////////////////
discordclient.login(process.env.TOKEN);