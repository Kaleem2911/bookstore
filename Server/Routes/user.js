const express = require('express');
const { Singup, Login, Auth, UpdateAddress, updateAvatar, forgotPassword, resetPassword,getAllUsers,deleteUser } = require("../Controller/user");
const { Authentication } = require('../Routes/userAuth');
const { avatarUpload } = require('../config/multerConfig');

const router = express.Router();

router.post('/Singup', Singup);

router.post('/login', Login);

router.get('/get-user-info', Authentication, Auth);

router.put('/update-address', Authentication, UpdateAddress);

router.put('/update-avatar', Authentication, avatarUpload.single('avatar'), updateAvatar);

router.get('/get-all-users',Authentication,getAllUsers);

router.delete("/delete-user/:id", Authentication,deleteUser);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

module.exports = router;
