const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', (req, res, next) => {
	User.findOne({where: {email: re.body.email}})
		.then(user => {
			if (!user) {
				res.status(401).send('User not found');
			} else if (!user.correctPassword(req.body.password)) {
				res.status(401).send('Incorrect password')
			} else {
				req.login(user, err => (err ? next(err) : res.json(user)))
			}
		})
		.catch(next);
});

router.post('/signup', (req, res, next) => {
	User.create(req.body)
		.then(user => {
			req.login(user, err => (err ? next(err) : req.json(user)))
		})
		.catch(err => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				res.status(401).send('User already exists')
			} else {
				next(err)
			}
		})
});

router.post('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/me', (req, res) => {
	res.json(req.user)
});
