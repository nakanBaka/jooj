const superagent = require('superagent');
module.exports.run = async (client, message, args) => {

try {
   function clean(text) {
      if (typeof(text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else
        return text;
    }
    const bug = args.join(" ")
    if (!bug) return message.channel.send('Especifique o Bug!')
    const content = clean(`**${message.author.username}**#${message.author.discriminator} (${message.author.id}) Achou o seguinte bug:\n${bug}\nServer: **${message.guild.name}**\nID: **${message.guild.id}**`);
    const id = '465639549075324928';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${client.token}`).send({ content })
        .end((err, res) => {
          if (err) {
            reject(err);
            message.reply('Ops. Ocorreu um erro ao enviar, tente de novo mais tarde...');
          } else {
            resolve(res);
            message.channel.send(`:white_check_mark: **${message.author.username}**, O bug foi enviado com sucesso. Obrigado!.`);
          }
        });
    });
}  catch (err) {
console.log(err)
}
}
