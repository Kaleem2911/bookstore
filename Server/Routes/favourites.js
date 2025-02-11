const router = require('express').Router();
const User = require("../Model/User");
const { Authentication } = require("../Routes/userAuth");


router.put("/add-book-to-favourites",Authentication,async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message : "book is already in favourites"})
        }
         await User.findByIdAndUpdate(id,{$push: {favourites:bookid}});
         return res.status(200).json({message:"book added to favourites"})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
});

router.delete("/remove-book-from-favourites",Authentication,async(req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite)
         await User.findByIdAndUpdate(id,{$pull: {favourites:bookid}});
         return res.status(200).json({message:"book remove from favourites"})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
});

router.get("/get-favourite-books",Authentication,async(req,res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favroutieBooks = userData.favourites;
        return res.json({status : "success",data: favroutieBooks})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
})

module.exports = router;