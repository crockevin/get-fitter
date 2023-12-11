const router = require('express').Router()
const { User } = require('../../models/')

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body)
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true
            res.json({ user: userData, message: 'You are logged in!' })
        })

    }
    catch (err) {
        res.status(400).json(err)
    }
})


module.exports = router