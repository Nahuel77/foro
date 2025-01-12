const express = require('express');
const { getSection } = require('../controllers/sectionController');
const router = express.Router();

router.get('/getsection', getSection);

module.exports = router;