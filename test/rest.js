var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('REST', function () {
	var url = 'http://localhost:3000/recipes';
	var recipeId;
	
	before(function (done) {
		done();
	});
	
	it('should return a list of recipes in JSON format', function (done) {
		request(url)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;
				res.body.should.be.an.Array();
				done();
			});
	});
	
	it('should return error when adding an invalid recipe', function (done) {
		request(url)
			.post('/')
			.send({
				id: 1,
				ingredients: 'Butter, Chicken',
				directions: 'Step 1. Cook chicken\nStep 2. Add butter'
			})
			.expect('Content-Type', /json/)
			.expect(400)
			.end(function (err, res) {
				if (err) throw err;
				res.body.should.have.property('error').which.is.a.String();
				done();
			});
	});
	
	it('should add a new recipe', function (done) {
		request(url)
			.post('/')
			.send({
				name: 'Butter Chicken',
				ingredients: 'Butter, Chicken',
				instructions: 'Step 1. Cook chicken\nStep 2. Add butter'
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.end(function (err, res) {
				if (err) throw err;
				res.body.should.have.property('id').which.is.a.Number();
				recipeId = res.body['id'];
				done();
			});
	});
	
	it('should add another recipe', function (done) {
		request(url)
			.post('/')
			.send({
				name: 'Butter Popcorn',
				ingredients: 'Butter, Popcorn',
				instructions: 'Step 1. Cook popcorn\nStep 2. Add butter'
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.end(function (err, res) {
				if (err) throw err;
				res.body.should.have.property('id').which.is.a.Number();
				done();
			});
	});
	
	it('should fail when trying to delete an invalid recipe', function (done) {
		request(url)
			.delete('/booglyboo')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(function (err, res) {
				if (err) throw err;
				res.body.should.have.property('error').which.is.a.String();
				done();
			});
	});
	
	it('should update a recipe', function (done) {
		recipeId.should.be.a.Number();
		request(url)
			.put('/' + recipeId)
			.send({
				'name': 'Butter Waffle',
				'ingredients': 'Butter, Waffle',
				'instructions': 'Step 1. Make waffle\nStep 2. Add butter'
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;
				res.body.should.have.property('id', recipeId);
				res.body.should.have.property('name', 'Butter Waffle');
				res.body.should.have.property('ingredients', 'Butter, Waffle');
				res.body.should.have.property('instructions', 'Step 1. Make waffle\nStep 2. Add butter');
				done();
			});
	});
	
	it('should delete a recipe', function (done) {
		recipeId.should.be.a.Number();
		
		// Get recipe count
		getRecipeCount((err, count) => {
			// Do delete
			request(url)
				.delete('/' + recipeId)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) throw err;
					res.body.should.have.property('id', recipeId);
					res.body.should.have.property('name', 'Butter Waffle');
					res.body.should.have.property('ingredients', 'Butter, Waffle');
					res.body.should.have.property('instructions', 'Step 1. Make waffle\nStep 2. Add butter');
					
					// Verify recipe count has gone down
					getRecipeCount((err, count2) => {
						count2.should.be.eql(count - 1);
						done();
					})
				});
		});
		
	});
	
	function getRecipeCount(cb) {
		request(url)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;
				res.body.should.be.an.Array();
				cb(null, res.body.length);
			});
	}
});
