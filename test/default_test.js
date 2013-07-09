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

var schemaTemplate = {
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
	},
	isAwesome: {
		type: Boolean,
		required: true,
		default: true
	}
};

var personSchema = new modlr.Schema(schemaTemplate);
var Person = new modlr.Model(personSchema);

var template = {
	name: "Jim",
	age: 50,
	languages: ["spanish"],
	friends: {
		"Bob": {
			knownSince: 1850
		}
	},
	isAwesome: false
};

exports['defaults'] = function(test) {
	var p = new Person();
	var errors = p.validate();

	// everything is required but has a valid default. should validate
	test.deepEqual(errors, []);

	Object.keys(schemaTemplate).forEach(function(key) {
		test.deepEqual(p[key], schemaTemplate[key]["default"]);
	});

	test.done();
};

exports["override defaults"] = function(test) {
	var p = new Person(template);

	Object.keys(template).forEach(function(key) {
		test.deepEqual(p[key], template[key]);
	});

	test.done();
}