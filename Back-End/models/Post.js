const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

// (
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
//     reactions: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },
//         type: {
//           type: String,
//           enum: ["like", "love", "laugh"],
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );
