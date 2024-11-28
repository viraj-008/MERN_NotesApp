import express, { Request, Response } from "express";
import { hashPassword, generateToken, comparePassword } from '../utils/Auth' 
import User from '../model/Usermodel'

const router = express.Router();

router.post("/register", async (req:any, res:any) => {
    const { username, email, password } = req.body;
    const userCheck = await User.findOne({ email });
    if(userCheck) return res.json({msg:"this user allready exist"})
    try {
      const hashedPassword = await hashPassword(password);
  
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
  
      const token = generateToken(user.id);
      res.status(201).json({ token,user });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  });



  router.post("/login", async (req:any, res:any) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
      
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      
      const token = generateToken(user.id);
      res.json({ token ,user});
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  });

export default  router;