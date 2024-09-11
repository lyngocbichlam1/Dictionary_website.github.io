const HistoryDict = require('../models/history')
const Vocabulary = require('../models/vocabulary')
const gTTS = require('gtts')
const fs = require('fs');
const path = require('path')

const Dictionary = require('../algorithm/dictionary')

var myDict = new Dictionary()

async function saveHistory(ta, googleId) {
    try {
        const result = await HistoryDict.deleteMany({ googleId: googleId, word: ta })
        const his = new HistoryDict({ googleId: googleId, word: ta }).save()
    } catch (err) {
        console.log(err)
    }
}

class API {
    async searchDictionary(req, res) {
        try {
            var word = myDict.search(req.query.word)
            if (word) {
                if (req.user) {
                    saveHistory(word.ta, req.user.googleId)
                }
                var gtts = new gTTS(word.ta, 'en');
                gtts.save('test.mp3', async  function (err) {
                    if (err) { throw new Error(err) }
                    var contents = await fs.readFileSync(path.resolve(__dirname, '../test.mp3'));
                    contents = contents.toString('base64')
                    res.status(200).json({
                        word,
                        contents
                    })
                })
            } else {
                res.status(400).send()
            }
        } catch (error) {
            res.status(400).send()
        }
    }

    async saveVoabulary(req, res) {
        try {
            req.body.googleId = req.user.googleId
            await Vocabulary.create(req.body)
            res.status(200).send()
        } catch (err) {
            console.log(err)
            res.status(400).send()
        }
    }

    async deleteVocabulary(req, res) {
        try {
            await Vocabulary.deleteOne({ _id: req.query.id })
            res.status(200).send()
        } catch (err) {
            console.log(err)
            res.status(400).send()
        }
    }

    logout(req, res) {
        try {
            if (req.user) {
                res.clearCookie('session')
                res.clearCookie('session.sig')
            }
            res.redirect('/')
            return
        } catch (err) {
            console.log(err)
            res.status(400).send()
        }
    }
}

module.exports = new API