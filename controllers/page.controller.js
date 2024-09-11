const HistoryDict = require('../models/history')
const Vocabulary = require('../models/vocabulary')

class Page {
    pageLogin(req, res) {
        try {
            if (req.user) {
                res.redirect('/')
                return
            }
            res.render('login', { user: req.user, css: '/css/login.css', js: '/js/login.js', name_page: 'Login', title: 'Đăng nhập/Đăng ký || Dictionary' })
        } catch (err) {
            console.log(err)
            return
        }
    }

    pageHome(req, res) {
        try {
            res.render('home', { user: req.user, css: '/css/home.css', js: '/js/home.js', name_page: 'Home', title: 'Trang chủ || Dictionary' })
        } catch (err) {
            console.log(err)
            reurn
        }
    }

    pageDictionary(req, res) {
        try {
            res.render('dictionary', { user: req.user, css: '/css/dictionary.css', js: '/js/dictionary.js', name_page: 'Dictionary', title: 'Tra từ điển || Dictionary' })
        } catch (err) {
            console.log(err)
            return
        }
    }

    pageProfile(req, res) {
        try {
            if (!req.user) {
                res.redirect('/login')
                return
            }
            res.render('profile', { user: req.user, css: '/css/profile.css', js: '/js/profile.js', name_page: 'Profile', title: req.user.name + ' || Dictionary' })
        } catch (err) {
            console.log(err)
            return
        }
    }

    async pageHistory(req, res) {
        try {
            if (!req.user) {
                res.redirect('/login')
                return
            }
            var list = await HistoryDict.find({ googleId: req.user.googleId }).select('-_id word')
            list.reverse()
            res.render('history', { user: req.user, css: '/css/history.css', js: '/js/history.js', name_page: 'History', title: 'Lịch sử || Dictionary', list: list })
        } catch (err) {
            console.log(err)
            return
        }
    }

    async pageVocabulary(req, res) {
        try {
            if(!req.user){
                res.redirect('/login')
                return
            }
            const words = await Vocabulary.find({googleId: req.user.googleId})
            res.render('word', { user: req.user, css: '/css/word.css', js: '/js/word.js', name_page: 'Word' ,title: 'Từ đã lưu || Dictionary', words: words})
        } catch(err){
            console.log(err)
            return
        }
    }
}

module.exports = new Page