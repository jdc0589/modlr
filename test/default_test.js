'use strict';

var modlr = require('../modlr.js');

/*
======== A Handy Little Nodeunit Reference ========
https://github.com/caolan/nodeunit

	Test methods:
	test.expect(numAssertions)
	test.done()
	Test assertions:
	test.ok(value, [message])
	test.equal(actual, expected, [message])
	test.notEqual(actual, expected, [message])
	test.deepEqual(actual, expected, [message])
	test.notDeepEqual(actual, expected, [message])
	test.strictEqual(actual, expected, [message])
	test.notStrictEqual(actual, expected, [message])
	test.throws(block, [error], [message])
	test.doesNotThrow(block, [error], [message])
	test.ifError(value)
*/

var personSchema = new modlr.Schema({
	name: {
		type: String,
		required: true,
		default: "Davis"
	},
	age: {
		type: Number,
		required: true,
		default: 24
	},
	languages: {
		type: Array,
		required: true,
		default: ["english"]
	},
	friends: {
		type: Object,
		required: true,
		default: {
			"Jimmy": {
				knownSince: 2009
			}
		}
	}
});

var Person = new modlr.Model(personSchema);

exports['defaults'] = function(test) {
	var p = new Person({});

	var errors = p.validate();

	// everything is required but has a valid default. should validate
	test.deepEqual(errors, []);

	test.equal(p.name, "Davis");
	test.equal(p.age, 24);
	test.deepEqual(p.languages, ["english"]);

	test.done();
};

exports["string default override"] = function(test) {
	var p = new Person({
		name: "Someone"
	});

	test.equal(p.name, "Someone");
	test.done();
};

exports["number default override"] = function(test) {
	var p = new Person({
		age: 300
	});

	test.equal(p.age, 300);
	test.done();
};

exports["object default override"] = function(test) {
	var p = new Person({
		friends: {
			"Bobby": {
				knownSince: 1910
			}
		}
	});

	test.deepEqual(p.friends, {
		"Bobby": {
			knownSince: 1910
		}
	});

	test.done();
};

exports['array default override'] = function(test) {
	var p = new Person({
		languages: [
				"english",
				"gaulish",
				"latin"
		]
	});

	test.deepEqual(p.languages, ["english", "gaulish", "latin"]);
	test.done();
};