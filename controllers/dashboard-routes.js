const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

//gets all posts for user's dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('====================');
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include: [
            {
                // in order to display comments
                model: Comment,
                attributes: [
                    'id',
                    'comment_text', 
                    'post_id', 
                    'user_id', 
                    'created_at'
                ],
                // shows username for every comment
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                // to display the user who made the blog post
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // creates array of user's posts to display
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', {posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/add-post', (req, res) => {
    res.render('add-post', {
        loggedIn: req.session.loggedIn
    })
})

module.exports = router;