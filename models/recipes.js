'use strict';

// recipe properties: id, name, instructions, ingredients
// Note: id will simply be the index in the array, this is simply for this test
// and would not be acceptable in production environment.
var recipes = [];

exports.add = function (recipe) {
	var recipe = validate(recipe);
	var len = recipes.push(recipe);
	recipe.id = len - 1;
	return recipe;
};

exports.remove = function (recipeId) {
	if (undefined === recipes[recipeId]) throw new Error('Invalid recipe ID provided');
	var recipe = recipes[recipeId];
	recipes.splice(recipeId, 1);
	for (var id in recipes) {
		recipes[id].id = id;
	}
	return recipe;
};

exports.update = function (recipeId, recipe) {
	var recipeId = parseInt(recipeId);
	if (undefined === recipes[recipeId]) throw new Error('Invalid recipe ID provided');
	var recipe = validate(recipe);
	recipe.id = recipeId;
	recipes[recipeId] = recipe;
	return recipe;
};

exports.get = function (recipeId) {
	if (undefined === recipeId) {
		return recipes;
	}
	
	if (recipeId in recipes) {
		return recipes[recipeId];
	}
	
	throw new Error('Invalid recipe ID provided');
};

function validate(recipe) {
	var cleanRecipe = {};
	
	// Name
	if (recipe.name && typeof recipe.name === 'string') {
		cleanRecipe.name = recipe.name;
	} else {
		throw new Error('Invalid recipe name');
	}
	
	// Instructions
	if (recipe.instructions && typeof recipe.instructions === 'string') {
		cleanRecipe.instructions = recipe.instructions;
	} else {
		throw new Error('Invalid recipe instructions');
	}
	
	// Ingredients
	if (recipe.ingredients && typeof recipe.ingredients === 'string') {
		cleanRecipe.ingredients = recipe.ingredients;
	} else {
		throw new Error('Invalid recipe ingredients');
	}
	
	return cleanRecipe;
}
