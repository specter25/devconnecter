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
const request = require('request');
const Post = require('../../models/postmodel')


//@route  POST api/posts/
//@desc   Create a post
//@access Private

router.post('/', [auth, [
  check('text', 'tixt is required').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    var user = await User.findById(req.user.id).select('-password');
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }
    const post = new Post(newPost);
    await post.save();
    res.json(post);

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');

  }


});

//@route  GET api/posts/
//@desc   Get all posts
//@access Private as we have to log in to see the posts
router.get('/', auth, async (req, res) => {
  try {
    //to show the most recent posts first use this syntax of sort
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);


  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');


  }
})


//@route  GET api/posts/:id
//@desc   Get posts by id
//@access Private 
router.get('/:id', auth, async (req, res) => {
  try {
    //to show the most recent posts first use this syntax of sort
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: 'Post not found' })
    }
    res.json(post);


  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    console.log(error.message);
    res.status(500).send('Server Error');


  }
})


//@route  DELETE api/posts/:id
//@desc   Delete posts by id
//@access Private 
router.delete('/:id', auth, async (req, res) => {
  try {
    //to show the most recent posts first use this syntax of sort
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: 'Post not found' })
    }
    //now we have to check that the user creating the post is the user owning it
    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }
    await post.remove();


    res.json({ msg: 'Post removed' });


  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    console.log(error.message);
    res.status(500).send('Server Error');


  }
})

//@route  PUT api/posts/like/:id
//@desc   like a post by id
//@access Private 
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //now we have to check that this user has not already liked the post
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(404).json({ msg: 'Post alreafy liked' })
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);



  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    console.log(error.message);
    res.status(500).send('Server Error');


  }
})


//@route  PUT api/posts/unlike/:id
//@desc   unlike a post by id
//@access Private 
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //if we haven't liked the post yet then we cannot unlinke it
    if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
      return res.status(404).json({ msg: 'Post has not yet been liked' })
    }

    //get the removed index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
    post.likes.splice(removeIndex, 1)
    await post.save();
    res.json(post.likes);



  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    console.log(error.message);
    res.status(500).send('Server Error');


  }
})




//@route  POST api/posts/comment/:id
//@desc   Create a comment
//@access Private

router.post('/comment/:id', [auth, [
  check('text', 'text is required').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    var user = await User.findById(req.user.id).select('-password');
    var post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }
    post.comments.unshift(newComment)

    await post.save();
    res.json(post.comments);

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');

  }


});

//@route  PUT api/posts/comment/:id/:comment_id  as we need to know both the post id and comment id
//@desc   delete a comment
//@access Private 
router.delete
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'comment does not exist' });
    }
    //now we have to check that the user who is deleting the coment is the user who made the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    };
    const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);




  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');

  }
})


module.exports = router;
