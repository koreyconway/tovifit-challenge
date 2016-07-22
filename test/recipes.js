var should = require('should');
var assert = require('assert');
var recipes = require('../models/recipes');

describe('Recipes', function () {
	var url = 'http://localhost:3000/recipes';
	
	before(function (done) {
		done();
	});
	
	it('should throw an error trying to add an invalid recipe to the list', function (done) {
		should.throws(() => {
			recipes.add({}, Error);
		});
		done();
	});
	
	it('should add a recipe to the list', function (done) {
		var recipe = {
			'name': 'Butter Chicken',
			'ingredients': 'butter, chicken',
			'instructions': 'cook it',
			'extra': 'useless info for testing'
		};
		
		var countBefore = recipes.get().length;
		
		recipe = recipes.add(recipe);
		recipe.should.have.property('id').which.is.a.Number();
		recipe.should.have.property('name', 'Butter Chicken');
		recipe.should.have.property('ingredients', 'butter, chicken');
		recipe.should.have.property('instructions', 'cook it');
		recipe.should.not.have.property('extra');
		
		var countAfter = recipes.get().length;
		countAfter.should.be.eql(countBefore + 1);
		
		done();
	});
	
	it('should remove a recipe from the list', function (done) {
		// Start by adding a couple recipes
		var recipe = {
			'name': 'Butter Chicken 2',
			'ingredients': 'butter, chicken',
			'instructions': 'cook it',
		};
		recipe = recipes.add(recipe);
		recipes.add(recipe);

		var countBefore = recipes.get().length;
		
		recipes.remove(recipe.id);
		
		var countAfter = recipes.get().length;
		countAfter.should.be.eql(countBefore - 1);
		
		done();
	});
});
