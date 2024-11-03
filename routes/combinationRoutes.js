const express = require('express');
const { generateCombination } = require('../controllers/combinationController');

const router = express.Router();

router.post('/generate', generateCombination);

module.exports = router;
