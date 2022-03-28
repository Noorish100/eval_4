const mongoose=require("mongoose")

module.exports=()=>{
    return mongoose.connect("mongodb+srv://noorish:noorishes123@cluster0.ihmzw.mongodb.net/todo?retryWrites=true&w=majority")
}