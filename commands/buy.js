const color = require("../colors.json");
const functions = require("../functions");
const Discord = require("discord.js")
const ms = require('parse-ms');
const mongoose = require('mongoose')
const mongopass = process.env.mongoPass

mongoose.connect(mongopass, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})

const Data = require('../models/data.js');

module.exports.run = async (bot, message, args) => {
    var user = message.author;
const embed = new Discord.MessageEmbed
 if(!args[0]) {
embed.setColor(color.gold)
embed.setTitle("Shop")
embed.setDescription(`Fortune 25 emeralds per level\nEfficiency 20 emeralds per level`)
return message.channel.send(embed)

 }
 if(!args[1]||args[1]<1)
 args[1]=1
Data.findOne({
    userID: user.id
},(err, data) => {
    if(err) console.log(err);
    if(!data) {
        const newData = new Data({
            name: bot.users.cache.get(user.id).username,
            userID: user.id,
            lb:"all",
            bonus: 0,
            dirt:0,
            gravel:0,
            stone:0,
            coal:0,
            wood:0,
            iron:0,
            gold:0,
            redstone:0,
            lapis:0,
            diam:0,
            ems:0,
            mining:0,
            minetime:0,
            fortune:0,
            eff:2,
            mod:0,
            mod1:0,
            mod2:0,
            mod3:0,
            mod4:0,
            mod5:0,
            mod6:0,
            mod7:0,
            mod8:0,
            mod9:0
        })
        newData.save().catch(err => console.log(err))
        return message.reply(`You dont have any money!`)
    } else {
        if(data.minetime - (Date.now() -data.mining) > 0){
            return message.reply(`Your mining session is still in progress for ${Math.round((data.minetime - (Date.now() -data.mining))/60000)} minutes`);
        }
        if(args[0]=="fortune"||args[0]=="fort")
        {
            if(data.fortune==3) return message.reply(`The max level of fortune is 3`)
            if(25>data.ems) return message.reply(`You dont have enough emeralds!`)
            data.ems-=25
            data.fortune+=1
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully bought a Fortune Upgrade!`)
        } else
        if(args[0]=="eff"||args[0]=="efficiency")
        {
            if(data.eff==7) return message.reply(`The max level of efficiency is 5`)
            if(20>data.ems) return message.reply(`You dont have enough emeralds!`)
            data.ems-=20
            data.eff+=1
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully bought a Efficiency Upgrade!`)
        } else
        {
            return message.reply("That item doesnt exist!")
        }
        }
    })
}

module.exports.help = {
    name:"buy",
    aliases: ["shop","store"]
}