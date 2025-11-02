 import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getAdmin, getCurrentUser } from '../controller/userController.js'
// import Add from '../../admin/src/pages/Add.jsx'
import adminAuth from '../middleware/adminAuth.js'

 let userRoute = express.Router()

 userRoute.get('/getCurrentUser',isAuth,getCurrentUser)
 userRoute.get('/getadmin',adminAuth,getAdmin)

 export default userRoute