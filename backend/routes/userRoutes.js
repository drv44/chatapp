// //all routes which are related to user
// const express = require("express");


// // const {
    // //   registerUser,
    // //   authUser,
    // //   allUsers,
    // // } = require("../controllers/userControllers");
    // // const { protect } = require("../middleware/authMiddleware");
    
const express = require("express");

const {registerUser, allUsers}=require("../controllers/userControllers")
const { authUser } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddlewares")
const router = express.Router();


// Routes

router.route("/").get(protect,allUsers);
router.route("/").post(registerUser);
// router.route("/").post((req, res, next) => {
//     const { registerUser } = require("../controllers/userControllers");
//     registerUser(req, res, next);
// });
router.post('/login',authUser);
// router.post('/login', (req, res, next) => {
//     const { authUser } = require("../controllers/userControllers"); // Lazy load
//     authUser(req, res, next);
// });

module.exports = router;
