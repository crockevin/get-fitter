const router = require('express').Router()
const { Workout, User } = require('../../models')
const { v4: uuidv4 } = require('uuid')

router.post('/', async (req, res) => {
    try {
        console.log('Request Body:', req.body)
        const { userId, bodyPart, equipment, gifUrl, id, name, target, secondaryMuscles} = req.body

        const userData = await User.findByPk(userId)
        if (!userData) {
            res.status(404).json({ message: 'User not Found' })
            return
        }
        const workout = await Workout.create({
            user_id: userId,
            bodyPart,
            equipment,
            gifUrl,
            id,
            name,
            target,
            secondaryMuscles
        })
        res.status(200).json(workout)
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get('/:id', async (req, res) => {
    try {
        const userWorkout = await Workout.findAll({ where: { user_id: req.params.id } })
        res.json(userWorkout)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router