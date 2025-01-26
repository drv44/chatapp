const express =  require('express')

//2 routes ,first for sending msg ,sec to fetch all of msg in a parti chat
const { protect } = require('../middlewares/authMiddlewares');
const { sendMessage, allMessages } = require('../controllers/messageControllers');

const router = express.Router();

router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessages)

module.exports = router;