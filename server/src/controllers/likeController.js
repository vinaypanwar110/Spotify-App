import likeModel from "../models/likeModel.js";

const addLike = async (req,res)=>{
     try {
        const name = req.body.name;
        const album = req.body.album;
        console.log(name+" "+album);
        const likeData = {
            name,
            album,
        }
        const like = likeModel(likeData);
        await like.save();
        res.json({success:true,message:"song liked"});
     } 
     catch (error) {
        res.json({success:false,message:"error in backend while liked song"});
     }
};

const listLike = async (req,res) => {
    try {
        const allLikes = await likeModel.find({});
        res.json({success:true,likes:allLikes});
    } catch (error) {
        res.json({success:false,message:"error in backend while listing likes"});
    }
}

const removeLike = async (req,res) => {
    try {
        await likeModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"remove likes successfully"});
    } catch (error) {
        res.json({success:false,message:"Error while removing like in backend"})
    }
}

export {addLike,removeLike,listLike};