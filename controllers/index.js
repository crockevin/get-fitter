const router = require('express').Router()

const workRoutes = require('./workouts')

router.use('/', workRoutes)

module.exports = router