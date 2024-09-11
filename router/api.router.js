const passport = require('passport');
const express = require('express')
const router = express.Router();

const API = require('../controllers/api.contriller')

router.get('/api/check/anh-viet', API.searchDictionary);
router.post('/api/save', API.saveVoabulary)
router.delete('/api/word/delete', API.deleteVocabulary)
router.get('/logout', API.logout)
router.get('/api/auth/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
    return
});
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

module.exports = router