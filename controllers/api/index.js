const router = require('express').Router()
const userRoutes = require('./usersRoutes')
const signupRoutes = require('./signupRoutes')
const workouts = require('./workouts')
const uploads = require('./uploads')

router.use('/users', userRoutes)
router.use('/signup', signupRoutes)
router.use('/workouts', workouts)
router.use('/uploads', uploads)

module.exports = router