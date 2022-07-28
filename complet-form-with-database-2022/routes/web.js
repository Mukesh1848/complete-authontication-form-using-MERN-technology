import express from 'express'
const router = express.Router();
import homeController from '../controller/homeController.js';


router.get('/',homeController.getAllDoc);
router.get('/register',homeController.getRegisterDoc);
router.post('/register',homeController.createRegisterDoc)
router.get('/login',homeController.getLoginDoc)
router.post('/login',homeController.verifyLoginDoc)
router.get('/dashboard',homeController.getDashboardDoc)



export default router;