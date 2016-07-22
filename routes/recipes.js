var express = require('express');
var router = express.Router();
var recipes = require('../models/recipes');

// List recipes
router.get('/', function (req, res, next) {
	var recipeList = recipes.get();
	res.status(200).json(recipeList);
});

// Create recipe
router.post('/', function (req, res, next) {
	var recipe = req.body;
	var recipe = recipes.add(recipe);
	res.status(201).json(recipe);
});

// Show recipe
router.get('/:id', function (req, res, next) {
	var recipeId = req.params.id;
	var recipe = recipes.get(recipeId);
	res.status(200).json(recipe);
});

// Update
router.put('/:id', function (req, res, next) {
	var recipe = req.body;
	var recipeId = req.params.id;
	var recipe = recipes.update(recipeId, recipe);
	res.status(200).json(recipe);
});

// Delete recipe
router.delete('/:id', function (req, res, next) {
	var recipeId = req.params.id;
	var recipe = recipes.get(recipeId);
	recipes.remove(recipeId);
	res.status(200).json(recipe);
});

module.exports = router;
