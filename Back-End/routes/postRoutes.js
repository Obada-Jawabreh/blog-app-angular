const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router.post("/add", auth, postController.addPost);
router.get("/get", auth, postController.getPosts);
router.post("/:postId", auth, postController.addReaction);

module.exports = router;
