exports.run = (client,message,args) => {
var nameResult = args.join(' ');
if (!nameResult) nameResult = null;
client.user.setActivity(nameResult, {type: "STREAMING"});

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
 message.channel.send('droga! você descobriu, ok vou mudar para ${nameResult}')
}
