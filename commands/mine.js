const color = require("../colors.json");
const functions = require("../functions");
const Discord = require("discord.js");
const ms = require('parse-ms');
const mongoose = require('mongoose');
const mongopass = process.env.mongoPass

mongoose.connect(mongopass, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
const Data = require('../models/data.js');
module.exports.run = async (bot, message, args) => {
    var user = message.author;
    var time = 10;
    if(args[0])
    time=parseInt(args[0]);
    if(time>180) return message.reply("You can only mine for at most 3 hours!");
    time=time*60000
    Data.findOne({
        userID: message.author.id
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
                mining:Date.now(),
                minetime:time,
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
           return message.reply(`Your mining session is now in progress for ${Math.round(time/60000)} minutes`);
        } else {
            if(data.minetime - (Date.now() -data.mining) > 0){
            return message.reply(`Your mining session is still in progress for ${Math.round((data.minetime - (Date.now() -data.mining))/60000)} minutes`);
            } else {
                var eff=data.eff;
                data.stone+=Math.floor((functions.range(30,50)*3.8*data.minetime/functions.range(1,3)/60000)*(eff+1)/2)
                data.gravel+=Math.floor((functions.range(7,15)*0.8*data.minetime/functions.range(1,2)/60000)*(eff+1)/2)
                data.dirt+=Math.floor((functions.range(7,12)*0.6*data.minetime/functions.range(1,2)/60000)*(eff+1)/2)
                data.coal+=Math.floor((functions.range(8,12)*0.8*data.minetime*(data.fortune+1)/60000)*(eff+1)/2)
                data.iron+=Math.floor((functions.range(8,12)*0.6*data.minetime)*(eff+1)/2)
                data.gold+=Math.floor((functions.range(8,10)*0.4*data.minetime)*(eff+1)/2)
                data.redstone+=Math.floor((functions.range(6,12)*0.5*data.minetime*(data.fortune+1)*functions.range(4,5)/60000)*(eff+1)/2)
                data.lapis+=Math.floor((functions.range(3,8)*0.3*data.minetime*(data.fortune+1)*functions.range(4,8)/60000)*(eff+1)/2)
                data.diam+=Math.floor(Math.floor((functions.range(0,10+Math.floor(data.minetime/2400000))*0.2)*data.minetime*(data.fortune+1)/60000)*(eff+1)/3)
                data.minetime=time;
                data.mining = Date.now();
                data.save().catch(err => console.log(err))
                return message.reply(`Your mining session is now in progress for ${Math.round(time/60000)} minutes`);
            }
        }
    })
}

module.exports.help = {
    name:"mine",
    aliases: ["mining","caving","cave","min"]
}