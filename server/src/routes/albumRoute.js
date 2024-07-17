import { addAlbum,listAlbum,removeAlbum } from '../controllers/albumController.js';
import upload from '../middleware/multer.js'
import express from 'express';

const albumRouter = express.Router();
// defining routes for album
albumRouter.post('/add',upload.single('image'),addAlbum);
albumRouter.get('/list',listAlbum);
albumRouter.post('/remove',removeAlbum);

export default albumRouter;