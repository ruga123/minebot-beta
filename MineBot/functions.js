const color = require("./colors.json");
const mongoose = require('mongoose')

module.exports.rng = function rng(length) {
    if(length<=0||length>=19||!length)
    length=16
    var noise=0;
    for(var a=1;a<=length;a++)
    {
        noise+=this.range(1,9)*Math.pow(10,a-1)
    }
    return noise;
}
module.exports.range = function range(min,max) {
    return Math.floor(Math.random() * Math.floor(max-min))+min;
}

module.exports.loot = function loot(rng,item,id)
{
    
}
