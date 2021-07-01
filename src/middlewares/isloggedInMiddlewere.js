const isLoggedIn = (req, res, next) => {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	const response = {
		message: 'You need to login in order for you to use this function',
		status: 403,
		statusMessage: 'UNAUTHORIZED',
	};
	res.send(response).status(403);
};

module.exports = isLoggedIn;
