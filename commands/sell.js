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
            eff:1,
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
        return message.reply(`You dont have any items to sell!`)
    } else {
        if(!args[0])
        return message.reply(`Please enter an item name!`)
        if(args[0]=="stone")
        {
            if(data.stone<30)
            return message.reply(`You dont have enough stone!`)
            var stone = data.stone-(data.stone%30)
            var money = Math.floor(data.stone/30)
            data.stone -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} stones for ${money} emeralds!`)
        } else
        if(args[0]=="dirt")
        {
            if(data.dirt<40)
            return message.reply(`You dont have enough dirt!`)
            var stone = data.dirt-(data.dirt%40)
            var money = Math.floor(data.dirt/40)
            data.dirt -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} dirt for ${money} emeralds!`)
        } else
        if(args[0]=="gravel")
        {
            if(data.gravel<40)
            return message.reply(`You dont have enough gravel!`)
            var stone = data.gravel-(data.gravel%40)
            var money = Math.floor(data.gravel/40)
            data.gravel -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} gravel for ${money} emeralds!`)
        } else
        if(args[0]=="coal")
        {
            if(data.coal<15)
            return message.reply(`You dont have enough coal!`)
            var stone = data.coal-(data.coal%15)
            var money = Math.floor(data.coal/15)
            data.coal -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} coal for ${money} emeralds!`)
        } else
        if(args[0]=="iron")
        {
            if(data.iron<8)
            return message.reply(`You dont have enough iron!`)
            var stone = data.iron-(data.iron%8)
            var money = Math.floor(data.iron/8)
            data.iron -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} iron for ${money} emeralds!`)
        } else
        if(args[0]=="gold")
        {
            if(data.gold<6)
            return message.reply(`You dont have enough gold!`)
            var stone = data.gold-(data.gold%6)
            var money = Math.floor(stone/6)
            data.gold -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} gold for ${money} emeralds!`)
        } else
        if(args[0]=="redstone")
        {
            if(data.redstone<10)
            return message.reply(`You dont have enough redstone!`)
            var stone = data.redstone-(data.redstone%10)
            var money = Math.floor(stone/10)
            data.redstone -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} redstone for ${money} emeralds!`)
        } else 
        if(args[0]=="lapis"||args[0]=="lazuli"||args[0]=="lapislazuli")
        {
            if(data.lapis<10)
            return message.reply(`You dont have enough lapis!`)
            var stone = data.lapis-(data.lapis%10)
            var money = Math.floor(stone/10)
            data.lapis -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} lapis for ${money} emeralds!`)
        } else
        if(args[0]=="diamonds"||args[0]=="diamond"||args[0]=="diam")
        {
            if(data.diam<1)
            return message.reply(`You dont have enough diamonds!`)
            var stone = data.diam
            var money = stone
            data.diam -=stone
            data.ems+=money
            data.save().catch(err => console.log(err))
            return message.reply(`Succesfully sold ${stone} diamonds for ${money} emeralds!`)
        } else
        {
            return message.reply("That item doesnt exist!")
        }
        }
    })
}

module.exports.help = {
    name:"sell",
    aliases: []
}