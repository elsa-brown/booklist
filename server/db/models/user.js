const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
	email: {
		type: Sequelize.STRING,
		unique: true,
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
	},
	salt: {
		type: Sequelize.STRING,
	},
	googleId: {
		type: Sequelize.STRING,
	},
});


module.exports = User;

// instance methods
User.prototype.correctPassword = candidatePwd => {
	return User.encryptPassword(candidatePwd, this.salt) === this.password
};

// class methods
User.generateSalt = () => {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = (plainText, salt) => {
	return crypto
		.createHash('RSA-SHA256')
		.update(plainText)
		.update(salt)
		.digest('hex')
};

// hooks
const setSaltAndPassword = user => {
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password, user.salt);
	}
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
