const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
const prefix = "+";

client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`Você passou de nível para **${curLevel}**! Isso é bom né.`);
  }

  if (message.content.startsWith(config.prefix + "level")) {
    message.reply(`seu level atual é: ${userData.level}, seus pontos são: ${userData.points} points.`);
  }
  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

});
