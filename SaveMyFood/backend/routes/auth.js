const router = require('express').Router();
const {loginMiddleware,signupMiddleware} = require('../middlewares/authMiddleware');
const {signup,login} = require('../controllers/authController');


router.post('/signup',signupMiddleware,signup);
router.post('/login',loginMiddleware,login);

module.exports = router;