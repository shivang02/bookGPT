const express = require('express');
const router = express.Router();
const chatGPTController = require('../controllers/chatGPTController');

router.get('/sections', chatGPTController.getSections);

router.get('/summary', chatGPTController.getSummary);

module.exports = router;
