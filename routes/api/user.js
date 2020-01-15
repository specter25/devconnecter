const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/usermodel');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route  POST api/users/
//@desc   Register user
//@access Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please include a valid password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if the user exits
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] }); // this format uses to have the error message in the same format as above
      }
      //Get users garvatar
      const avatar = gravatar.url(email, {
        s: '200', //size of the image
        r: 'pg', //rating of the image wso that we do not get anything rubbish
        d: 'mm' // gives a default img like a user icon if we use 404 we get file not found error
      });
      // create a user but not save it
      user = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password
      });
      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //save the user
      await user.save();
      //Return jsonwebToken
      const payload = {
        user: {
          id: user._id
        }
      }
      jwt.sign(payload, config.get('jwtToken'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        else {
          res.json({ token });
        }
      }); //generally kept 3600 ie 1hr but as now testing it is kept more change it before deployment


    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }

  }
);

module.exports = router;
