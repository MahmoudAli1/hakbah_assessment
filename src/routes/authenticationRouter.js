const express = require('express');
const authenticationRouter = express.Router();
const passport = require('passport');
const User = require('../models/user');
const isLoggedIn = require('../middlewares/isloggedInMiddlewere');
const userController = require('../controllers/modelsControllers/userController');

/* ---------------------------- User Authentication routes  ---------------------------- */

/*'/login' to login user to the application*/
authenticationRouter.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			const message = { message: 'password or username is incorrect' };
			return res.json(message).status(400);
		}
		req.logIn(user, async (err) => {
			if (err) {
				return next(err);
			}

			const response = {
				message: `successfully logged in as ${user.username}`,
				status: 200,
				statusMessage: 'OK',
				user: userController.formatUserObject(user),
			};
			return res.json(response).status(200);
		});
	})(req, res, next);
});

/*'/login' to signup user to the application*/
authenticationRouter.post('/signup', async (req, res) => {
	try {
		const isExist = await User.findOne({
			$or: [{ username: req.body.username }, { email: req.body.email }],
		});
		if (isExist) {
			const response = {
				message: 'Duplicate email or username please try again later',
				status: 409,
				statusMessage: 'Conflict',
			};
			return res.json(response).status(409);
		}
		const user = await userController.postUser(req.body);
		const response = {
			message: `User ${user.username} is signed up successfully!`,
			status: 200,
			statusMessage: 'OK',
		};
		return res.json(response).status(200);
	} catch (e) {
		console.log('error is signing up', e);
	}
});

/* '/logout'  to log out user from the application */
authenticationRouter.get('/logout', async (req, res) => {
	req.logOut();
	const response = { message: 'logged out successfully' };
	res.json(response).status(200);
});

/* '/reset-password'  to reset user password in the application */
authenticationRouter.put('/reset-password', isLoggedIn, async (req, res) => {
	try {
		const isPasswordCorrect = await User.findOne({ password: req.body.oldpassword });
		if (isPasswordCorrect) {
			const response = {
				message: 'Wrong old password',
				status: 400,
				statusMessage: 'Bad Request',
			};
			return res.json(response).status(400);
		}
		await userController.putUser(req.user.id, { password: req.body.newpassword });
		const response = {
			message: `Password for ${req.session.passport.user} is changed successfully!`,
			status: 200,
			statusMessage: 'OK',
		};
		return res.json(response).status(200);
	} catch (e) {
		console.log('error is resetting the password', e);
	}
});

module.exports = authenticationRouter;
