import express from 'express';
import uploadImg from '../config/cloudinary.config.js';
import {v2 as  cloudinary} from 'cloudinary';
import * as dotenv from 'dotenv';
import isAuth from '../middlewares/isAuth.js';
import attachCurrentUser from '../middlewares/attachCurrentUser.js';

dotenv.config();



//conexão com cloudinary

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


const uploadRoute = express.Router();

uploadRoute.post('/upload', uploadImg.single('picture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ errorMessage: 'O upload da imagem falhou' });
  }
  return res.status(201).json({ url: req.file.path });
});

uploadRoute.post('/signature', isAuth, attachCurrentUser, async (req, res) => {
  let deleteSignature=null
   const timestamp = Math.round(new Date().getTime() / 1000)
  
  if(req.body.publicIdToDelete){

    deleteSignature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        public_id:req.body.publicIdToDelete
      },
      cloudinaryConfig.api_secret
    )
  }

 
  const uploadSignature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder:req.currentUser._id.toString()
    },
    cloudinaryConfig.api_secret
  )
  res.json({ timestamp, uploadSignature, deleteSignature })
})

export default uploadRoute;
