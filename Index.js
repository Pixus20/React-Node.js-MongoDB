import bcrypt from 'bcrypt';
import express from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';



import { registerValidation } from './Validation/auth.js';
import UserModel from './models/User.js';

mongoose
   .connect('mongodb+srv://admin:wwwwww@cluster0.t8lee5e.mongodb.net/blog')
   .then(()=>   console.log('DB ok'))
   .catch(()=> console.log('DB error'));

const app =express();

app.use(express.json());

app.post('/auth/register', registerValidation, async(req,res)=>{
   try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json(errors.array())
      }

      const password=req.body.password;
      const salt= await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc= new UserModel({
         email: req.body.email,
         fullName: req.body.fullName,
         avatarUrl: req.body.avatarUrl,
         passwordHash:hash,
      });

      const user= await doc.save();

      const token=jwt.sign(
         {
            _id: user._id,
         },
            'secret123',
         {
            expiresIn:'30d',
         },
      );

      const{passwordHash, ...userData }=user._doc;

      res.json({
         ...userData,
         token,
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Не вдалося зареєструватися!"
      });
   }
});

app.listen(4444, (err)=>{
   if (err){
      return console.log(err);
   }
   console.log("Server OK!");
});