/* eslint-disable no-unused-vars */
/* ----------------- importing packages and files ---------------- */
const express = require('express'),
	userRouter = express.Router(),
	userController = require('../controllers/modelsControllers/userController'),
	validate = require('../utils/userValidators'),
	isLoggedIn = require('../middlewares/isloggedInMiddlewere'),
	{ validationResult } = require('express-validator/check');

/* ----------------- Routes ---------------- */
/*          VALIDATION BE AS A MIDDLE WARE              */
/* '/' this route is GET ROUTE where it gets all the users from the database */
userRouter.get('/', validate('getUsers'), isLoggedIn, async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.getUsers();
		res.json(response).status(200);
	}
});

/* '/' this route is GET ROUTE where it gets a user from the database by the id */
userRouter.get('/:id', validate('getUserById'), isLoggedIn, async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.getUserById(req.params.id);
		res.json(response).status(200);
	}
});

/* '/' this route is post ROUTE where it posts a user to the database*/

userRouter.post('/', validate('postUser'), isLoggedIn, async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.postUser(req.body);
		res.json(response).status(200);
	}
});

/*'/:id' this route is PUT ROUTE where it updates a user in the database */
userRouter.put('/:id', validate('putUser'), isLoggedIn, async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.putUser(req.params.id, req.body);
		res.json(response).status(200);
	}
});

/*'/:id' this route is DELETE ROUTE where it deletes a user from the database */
userRouter.delete('/:id', validate('deleteUser'), isLoggedIn, async (req, res) => {
	var err = validationResult(req);
	if (!err.isEmpty()) res.send(err.mapped()).status(400);
	else {
		const response = await userController.deleteUser(req.params.id);
		res.json(response).status(200);
	}
});

module.exports = userRouter;
