const express = require('express')
const { registerUser, loginUser, LogoutUser } = require('../controllers/userCont')
const { getUserProfile, updateUserProfile, deleteUserProfile , getAllUsers, getUserById, updateUserById,deleteUserById, loginRecovery, passwordRest } = require('../controllers/userCont');
const router = express.Router()


router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/recovery', loginRecovery)
router.post('/password-reset', passwordRest)
router.post('/logout', LogoutUser)

router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.delete('/profile', deleteUserProfile)

router.get('/users', getAllUsers);        
router.get('/users/:id', getUserById);      
router.put('/users/:id', updateUserById);  
router.delete('/users/:id', deleteUserById);


module.exports = router