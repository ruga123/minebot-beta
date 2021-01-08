const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
name: String,
userID: String,
lb: String,
bonus: Number,
dirt:Number,
gravel:Number,
stone:Number,
coal:Number,
wood:Number,
iron:Number,
gold:Number,
redstone:Number,
lapis:Number,
diam:Number,
ems:Number,
mining:Number,
minetime:Number,
fortune:Number,
})

module.exports = mongoose.model("Data",dataSchema);