const router = require('express').Router();
const User = require("../Model/User");
const { Authentication } = require("../Routes/userAuth");

router.put("/addToCart",Authentication,async(req,res) => {
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);

        if(isBookInCart){
            return res.json({
                status : "success",
                message : "book is already in cart"
            })
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
        return res.json({
            status : "success",
            message : "book added to card",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "An error occurs"})
    }
})

router.delete("/removeBookFromCart",Authentication,async(req,res) => {
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart){
           await User.findByIdAndUpdate(id,{$pull: {cart :bookid}});
           return res.status(200).json({message:"book removed from cart"})
        }
    } catch (error) {
          console.log(error)
        res.status(500).json({message : "An error occurs"})
    }
});

router.get("/get-cart-books",Authentication,async(req,res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cartBooks = userData.cart;
        return res.json({status : "success",data: cartBooks})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
})


module.exports = router;