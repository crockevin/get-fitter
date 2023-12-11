const router = require('express').Router()
const withAuth = require('../utils/auth')
const { User } = require('../models')
const fs = require('fs/promises')
const path = require('path')

router.get('/', (req, res) => {
    res.render('landing', { logged_in: req.session.logged_in })

})
router.get('/test', (req, res) => {
    res.render('test')
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('login');
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
})

router.get('/signup', (req, res) => {
    res.render('signup');
})
router.get('/profile', withAuth, (req, res) => {

    res.redirect(`/profile/${req.session.user_id}`)
})
router.get('/profile/:id', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json('user not found')
        }
        const sameUser = user.id == req.session.user_id
        const imageExists = await doesItExists(path.resolve(__dirname, '..', 'uploads', `profile-${user.id}.jpg`))
        const profileImage = imageExists ? `../uploads/profile-1.jpg` : '../uploads/placeholder.jpg'
        res.render('profile', {
            profile_id: user.id,
            sameUser,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage,
        })
    } catch (error) {
        res.status(500).redirect('/')
    }
})

async function doesItExists(path) {
    try {
        await fs.access(path)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/landing', (req, res) => {
    res.render('landing');
})
router.get('/profile', (req, res) => {
    res.render('profile');
})


module.exports = router