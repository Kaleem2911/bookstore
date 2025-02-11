const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailerConfig");
require('dotenv').config();




const Singup = async (req, res) => {
  try {
    const { username, password, email, address } = req.body;
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    const existingusername = await User.findOne({ username: username });
    if (existingusername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingemail = await User.findOne({ email: email.toLowerCase() }); 
    if (existingemail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 5" });
    }

    const hashpass = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      username: username,
      password: hashpass,
      email: email.toLowerCase(),
      address: address,
    });
    if (newuser) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exisitingemail = await User.findOne({ email: email.toLowerCase() }); 
    if (!exisitingemail) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    await bcrypt.compare(password, exisitingemail.password, (err, data) => {
      if (data) {
        let authCalims = [
          { email: exisitingemail.email },
          { role: exisitingemail.role },
        ];
        let token = jwt.sign({ authCalims }, process.env.SECREAT_KEY, {
          expiresIn: "1d",
        });
        res.status(200).json({
          id: exisitingemail._id,
          role: exisitingemail.role,
          token: token,
        });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const Auth = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const UpdateAddress = async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { id } = req.headers; 
    const avatarUrl = req.file?.path;

    if (!avatarUrl) {
      return res.status(400).json({ message: "Avatar upload failed" });
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: avatarUrl },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Avatar updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); 
    user.resetPasswordExpires = Date.now() + 3600000;
    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It is valid for 1 hour.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email"});
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword} = req.body;
   const user = await User.findOne({
      otp,
    resetPasswordExpires: { $gt: Date.now() },
    });

     console.log(req.body)
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP or OTP has expired" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordExpires = undefined;
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from results
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { Singup, Login, Auth, UpdateAddress, updateAvatar, forgotPassword, resetPassword , getAllUsers,deleteUser };


