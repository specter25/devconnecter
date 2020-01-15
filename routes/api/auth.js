const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authmidde');
const User = require('../../models/usermodel');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');






//@route  GET api/auth/
//@desc   Test route
//@access Public

router.get('/', auth, async (req, res) => {
  try {
    //another way to leave of the password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});



//@route  POST api/auth/
//@desc   Authenticate user and get token
//@access Public

router.post(
  '/',
  [//name removeed as not needed while signin
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()//instead of checking the length we will check whether it exists or not
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if the user exits
      let user = await User.findOne({ email: email });
      //now check if the user does not exist 
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] }); // this format uses to have the error message in the same format as above
      }
      //Get users garvatar

      //now we  dont need the avatar

      // now we don;t need to create a user but not save it

      //verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }
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
