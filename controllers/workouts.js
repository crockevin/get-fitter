const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('signup')
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/landing', (req, res) => {
    res.render('landing');
})


module.exports = router