exports.run = (client,message,args)=>{
    var sugest = args.slice(0).join(" ")
    if(!rbug) return message.reply("Escreva qual é o bug...?")
        client.guilds.get("380871687702446080").channels.get("465639549075324928").send("um bug!\n Bug:"+ sugest + "\n bug encontrado por:  <@" + message.author.id + "> ou " + message.author.tag")
    message.channel.send("bug enviado!")
}
