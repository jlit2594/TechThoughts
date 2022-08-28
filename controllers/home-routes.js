const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// this will get all posts to display on the homepage
router.get('/', (req, res) => {
    console.log('=============');
    Post.findAll({
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
        // creates array of posts for front-end
        const posts =dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// gets single post info to display by itself
router.get('/post/:id', (req, res) => {
    Post.findOne({
        // where id matches
        where: {
            id: req.params.id
        },
        // same attributes as before
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include: [
            {
                Model: Comment,
                attributes: [
                    'id',
                    'comment_text', 
                    'post_id', 
                    'user_id', 
                    'created_at'
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // if there's no post, 404 error
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with that id' });
            return
        } else {
            const post = dbPostData.get({ plain: true });

            // renders the blog-post partial
            res.render('blog-post', {
                post
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res
    // }

    // renders login page
    res.render('login')
});

module.exports = router;