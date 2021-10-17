const Discord = require('discord.js');
const client = new Discord.Client({intents: 32767});
const Distube = require('distube');
const fs = require('fs');
const { config } = require('dotenv');
client.distube = new Distube.default(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    searchSongs: 5,
});
client.distube.on("addList", (queue, playlist) => {
    queue.textChannel.send({ content: `**Playlist: **${playlist.name}\` - \`${message.author}\`` })
});
const status = (queue) => `Volumen: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Cola del servidor" : "Esta canción" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube.on("playSong", (queue, song) => {
    queue.voice.setSelfDeaf(false);
    queue.textChannel.send(`**Escuchando** 🎶 \`${song.name}\` - \`${song.formattedDuration}\`\nSolicitado por: ${song.user}\n${status(queue)}`)
});
client.distube.on("addSong", (queue, song) => {
    queue.textChannel.send({ content: `**Agregada** 👍 ${song.name} - \`${song.formattedDuration}\` a la cola por ${song.user}.`})
});
client.distube.on("empty", queue => {
    queue.textChannel.send({ content: "El canal está vacío. Sin embargo esperaré 24/7"})
});
client.distube.on("searchNoResult", (queue, query) => {
    queue.textChannel.send({ content: `No se encontraron resultados para ${query}!` })
});
client.distube.on("searchCancel", queue => {
    queue.textChannel.send({ content: `Búsqueda cancelada`})
});
client.distube.on("searchInvalidAnswer", queue => {
    queue.textChannel.send({ content: `¡Respondiste un número inválido!` })
});
client.distube.on("searchDone", queue => {
    queue.textChannel.send({ content: `Done` })
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');
/////////////////////////////////////////////////////  ENV  /////////////////////////////////////////////////////
config({
    path: `${__dirname}/.env`
});
/////////////////////////////////////////////////////  Handler  /////////////////////////////////////////////////////
['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Evento cargado '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});
/////////////////////////////////////////////////////  STATUS  /////////////////////////////////////////////////////
client.on("ready", () => {
    console.log('[DISCORD]', `Estoy en linea, mi nombre es ${client.user.username}`);
    let statuses = [
        "Esp Customs Radio",
        "Radio 24/7 Free",
        "https://espcustoms.xyz"
    ]
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "LISTENING"});
    }, 20000)
});
/////////////////////////////////////////////////////  Token Bot Developer  /////////////////////////////////////////////////////
client.login(process.env.TOKEN);