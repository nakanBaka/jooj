const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
 
  let args = message.content.split(" ").slice(1);
  // The list of if/else is replaced with those simple 2 lines:
 
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
 
});
client.on("message", message => {
  if(message.content == '<@445957259684478985>'){
var embedz = new Discord.RichEmbed()
.setAuthor('Bork! olá humano', message.author.displayAvatarURL)
.setColor(message.guild.member(message.author.id).displayHexColor)
.setDescription('Estou disponivel para ajuda-lo digite n.help!')
.setTimestamp()
.setFooter('DOGE')
message.channel.send({embed : embedz})
}})

client.on('messageDelete', async (message) => {
    const logs = message.guild.channels.find('name', 'logs');
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        await message.guild.createChannel('logs', 'text');
    }
    if (!logs) {
        return console.log('O canal de logs não esta criado')
    }
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first())
    let user;
    if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else {
        user = message.author
    }
    const logembed = new Discord.RichEmbed()
        //.setTitle('Message Deleted')
        .setAuthor(user.tag, message.author.displayAvatarURL)
        .addField(`**Mensagem de  ${message.author.username} deletada em ${message.channel.name}**\n\n`, message.content)
        .setColor(message.guild.member(client.user).displayHexColor)
        .setFooter(`<#${message.channel.id}>`)
        .setTimestamp()
    //console.log(entry)
    logs.send(logembed);
})

let xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if (!xp[message.author.id]) {
    xp[message.author.id] = {
        xp: 0,
        level: 1
    };
}


let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp = curxp + xpAdd;
if (nxtLvl <= xp[message.author.id].xp) {
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
        .setTitle("Parabéns!")
        .addField("Você passou de nivel", `${message.author}`)
        .setColor("#08ff00")
        .addField("Para o level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {
        msg.delete(5000)
    });
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            if (err) console.log(err)



            // Goes in commands fold in a file name "level.js"


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
