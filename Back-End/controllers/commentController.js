const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Comment = require("./../models/Comment");
require("dotenv").config();

// -------------------------addComment-----------------------------------------
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = new Comment({
      content,
      author: req.user.id,
      post: req.params.postId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};         
// ----------------------------fetchComment-----------------------------------------
exports.fetchComment = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .populate('author', 'fullName') 
      .populate('replies.author', 'fullName')
      .exec();
console.log(comments);

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};
// ----------------------------addReply-----------------------------------------
exports.addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replies.push({
      content,
      author: req.user.id,
    });

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
