var mongoose=require('mongoose')

const calorieschema=new mongoose.Schema({
    userid:{
        
    },
    food:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    calorie:{
        type:Number,
        required:true
    },
    caldate:{
        type:String,
        required:true
    }
})

const calorie=mongoose.model('calorie',calorieschema)

module.exports=calorie