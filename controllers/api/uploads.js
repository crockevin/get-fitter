const router = require('express').Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        const userId = req.session.user_id
        const filename = `profile-${userId}.jpg`
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('profilePicture'), (req, res) => {
    const file = req.file
    if (!file){
        return res.status(400).json('No file found')
    }
})

module.exports = router