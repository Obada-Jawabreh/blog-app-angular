const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

// router.post("/add", auth, commentController.addComment);
// router.get("/get",  commentController.);
router.get('/posts/:postId/comments',commentController.fetchComment);
router.post("/:postId/comments", auth, commentController.addComment);

router.post(
  "/:postId/comments/:commentId/reply",
  auth,
  commentController.addReply
);
module.exports = router;
