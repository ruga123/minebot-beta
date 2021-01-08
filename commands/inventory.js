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
const embed = new Discord.MessageEmbed
 if(!args[0]) {
     var user = message.author;
 } else {
     var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
 }
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
        embed.setTitle(`${bot.users.cache.get(user.id).username}'s Inventory`)
        embed.setDescription(`Your inventory is empty.`)
        embed.setColor(color.gold)
       return message.channel.send(embed);
    } else {
        embed.setTitle(`${bot.users.cache.get(user.id).username}'s Inventory`)
        embed.setColor(color.gold)
        embed.setDescription(`${data.dirt} dirt\n${data.gravel} gravel\n${data.wood} wood\n${data.stone} stone\n${data.coal} coal\n${data.iron} iron
        ${data.gold} gold\n${data.redstone} redstone\n${data.lapis} lapis\n${data.diam} diamonds\n${data.ems} emeralds.`)
       return message.channel.send(embed);
        }
    })
}

module.exports.help = {
    name:"inventory",
    aliases: ["inv","item","items","stuff"]
}