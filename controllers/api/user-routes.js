const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// gets all users in the database
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// gets a particular user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        // if no user
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        } else {
            res.json(dbUserData);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// creates a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        // creates a session for the new user, logs them in
        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in' });
        });
    });
});

// logs current user in
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: "This user doesn't exist" })
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        } else {
            req.session.save(() => {
                req.session.user_id = dbUserData.id,
                req.session.username = dbUserData.username,
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in' })
            });
        }
    });
});

// logs out current user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;