const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = Router()

const me = (req, res) => {
  res.status(200).json({ data: req.user })
}

const updateMe = async (req, res) => {
  try {
    if (req.body.password) {
      const hash = await bcrypt.hash(req.body.password, 8)
      req.body.password = hash
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec()

    res.status(200).json({ data: user })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

router.get('/', me)
router.put('/', updateMe)

module.exports = router
