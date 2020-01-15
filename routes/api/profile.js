const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authmidde');
const Profile = require('../../models/profilemodel')
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/usermodel');
const Post = require('../../models/postmodel');
const request = require('request');



//@route  GET api/profile/me
//@desc   Get indivisual profile
//@access Private

router.get('/me', auth, async (req, res) => {

  try {

    //populate method used to fetch data from other model
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }

    res.json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});


//@route  POST api/profile
//@desc   Create or update a profile
//@access Private
//to put 2 middlewares i.e. ayth and validation enclose them inside a bracket
router.post('/', [auth, [

  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    company, website, location, bio, status, githubusername, skills,
    youtube, facebook, twitter, instagram, linkedin } = req.body;


  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername)
    profileFields.githubusername = githubusername;
  if (skills) {
    //we have to convert the skills into an array and trim any spaces for each element in that array
    profileFields.skills = await skills.split(',').map(skills => skills.trim());// , is the delimeter
  }
  //Build social array 
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  //insert this data
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      //update

      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);

    }
    //Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);



  } catch (err) {
    console.log(err.message)
    res.status(600).send('server error');
  }

}
)

//@route  GET api/profile
//@desc   GET all profiles
//@access Public

router.get('/', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
})

//@route  GET api/profile/user/:user_id
//@desc   GET profile by user id
//@access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'profile not found' });
    }

    res.json(profile);

  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(500).send('profile not found');
    }
    res.status(500).send('server error');
  }
})



//@route  Delete api/profile
//@desc   Delete users , profile and posts
//@access Private


router.delete('/', auth, async (req, res) => {
  try {
    //@ todo -remove users posts
    await Post.deleteMany({ user: req.user.id });

    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'user deleted' });

  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
})

//@route  Put api/profile/experience
//@desc   Add profile experience
//@access Private
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'company is required').not().isEmpty(),
  check('from', 'date is required').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() })
  }
  const {
    title, company, location, from, to, current, description
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //unshift pushes to the front of array rathet than push that pushes at the back
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);

  } catch (error) {
    console.log(error.message);
    res.status(400).send('server error')
  }



})


//@route  Delete api/profile/experience/:exp_id
//@desc   Delete a experience
//@access Private


router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {

    const profile = await Profile.findOne({ user: req.user.id });
    // //get the removee index 
    // const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    // profile.experience.splice(removeIndex, 1)

    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // Splice out of array
    profile.experience.splice(removeIndex, 1);



    await profile.save();
    res.json(profile);


    res.json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
})




//@route  Put api/profile/education
//@desc   Add profile experience
//@access Private
router.put('/education', [auth, [
  check('school', 'school is required').not().isEmpty(),
  check('degree', 'degree is required').not().isEmpty(),
  check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
  check('from', 'date is required').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() })
  }
  const {
    school, degree, fieldofstudy, from, to, current, description
  } = req.body;

  const newEdu = {
    school, degree, fieldofstudy, from, to, current, description
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //unshift pushes to the front of array rathet than push that pushes at the back
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);

  } catch (error) {
    console.log(error.message);
    res.status(400).send('server error')
  }



})



//@route  Delete api/profile/experience/:exp_id
//@desc   Delete a experience
//@access Private


router.delete('/education/:edu_id', auth, async (req, res) => {
  try {

    const profile = await Profile.findOne({ user: req.user.id });
    // //get the removee index 
    // const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    // profile.experience.splice(removeIndex, 1)

    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    // Splice out of array
    profile.education.splice(removeIndex, 1);



    await profile.save();
    res.json(profile);


    res.json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
})




//@route  Get api/profile/github/:username 
//@desc   Get user repos from github
//@access Public
router.get('/github/:username', async (req, res) => {


  try {
    var options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode != 200) return res.status(404).json({ msg: "no github profile found" });
      res.json(JSON.parse(body))
    })


  } catch (err) {
    console.log(err.messsage);
    res.status(500).send('server error')
  }
})





module.exports = router;
