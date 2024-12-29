const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captain.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 letters long'),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long "),
    body('vehicle.color').isLength({min:3}).withMessage("color must be atleast 3 characters long "),
    body('vehicle.plate').isLength({min:6}).withMessage("plate must be atleast 6 characters long "),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid')
],
    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],
    captainController.loginCaptain
)

router.get("/profile", authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain , captainController.logoutCaptain)

module.exports = router;