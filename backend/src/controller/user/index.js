import express from 'express'
import userController from './user'

const router = express.Router()

router.get('/github', userController.githubLogin)
router.get('/githublogin', userController.handleGithubCallback)
router.get('/verify', userController.verifyToken)

/* user API */
router.get('/', userController.getUsers)

module.exports = router
