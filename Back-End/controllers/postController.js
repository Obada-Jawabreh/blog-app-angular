const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Post = require("./../models/Post");
require("dotenv").config();

// ----------------------------addPost-----------------------------------------
exports.addPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await Post.create({
      title,
      content,
      author: req.user.id
    });

    const populatedPost = await Post.findById(newPost._id)
      .populate('author', 'fullName')
      .lean()
      .exec();

    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  

// ----------------------------Get all posts-----------------------------------------

exports.getPosts = async (req, res) => {
  try {
    // const posts = await Post.find().populate('author').populate('comments');
    const posts = await Post.find()
      .populate("author", "fullName")
      .sort("-createdAt");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ----------------------------addReaction-----------------------------------------
exports.addReaction = async (req, res) => {
    try {
      const { type } = req.body;
      const post = await Post.findById(req.params.postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const existingReaction = post.reactions.find(
        reaction => reaction.user.toString() === req.user.id
      );
      
      if (existingReaction) {
        existingReaction.type = type;
      } else {
        post.reactions.push({ user: req.user.id, type });
      }
      
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
