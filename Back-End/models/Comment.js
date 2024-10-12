const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    replies: [
      {
        content: String,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reactions: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            type: {
              type: String,
              enum: ["like", "love", "laugh"],
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reactions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          enum: ["like", "love", "laugh"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema); 
module.exports = Comment;
// (
//   {
//     content: {
//       type: String,
//       required: true,
//     },
//     post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // تغيير هنا
//     reactions: {
//       likes: { type: Number, default: 0 },
//       dislikes: { type: Number, default: 0 },
//     },
//   },
//   { timestamps: true }
// );
