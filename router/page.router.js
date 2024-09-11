const express = require('express')
const router = express.Router();

const Page = require('../controllers/page.controller')

router.get('/', Page.pageHome);
router.get('/dictionary', Page.pageDictionary);
router.get('/login', Page.pageLogin);
router.get('/history', Page.pageHistory);
router.get('/profile', Page.pageProfile);
router.get('/word', Page.pageVocabulary);

module.exports = router