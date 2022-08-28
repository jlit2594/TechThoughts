const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;