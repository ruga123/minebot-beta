const color = require("../colors.json");
const functions = require("../functions");
const Discord = require("discord.js")
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
embed.setDescription(`Fortune 25 emeralds per level`)
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
            fortune:0
        })
        newData.save().catch(err => console.log(err))
        return message.reply(`You dont have any money!`)
    } else {
        if(args[0]=="fortune"||args[0]=="fort")
        {
            if(data.fortune==3) return message.reply(`The max level of fortune is 3`)
            if(args[1]*25>data.ems) return message.reply(`You dont have enough emeralds!`)
            data.ems-=args[1]*25
            data.fortune+=1
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully bought ${args[1]} Fortune Upgrades!`)
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