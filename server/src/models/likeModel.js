import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    name : {
        type :  String ,
        required : true,
    }
    ,
    album : {
        type : String , 
        required : true,
    }
})

const likeModel = mongoose.model("like", likeSchema);
export default likeModel;