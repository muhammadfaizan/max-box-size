const router = require('express').Router()
const { boxGames } = require('../controllers')
router.route('/')
  .all(boxGames.calculateBox)

module.exports = router
