'use strict';

require('mocha');
var hbs = require('handlebars');
var template = require('lodash.template');
var engine = require('engine')();
var assert = require('assert');
var glob = require('..');

describe('helper-glob-files', function() {
  it('should export a function', function() {
    assert.equal(typeof glob, 'function');
  });

  it('should return an array of files', function() {
    assert(glob('*.js', {dest: ''}).length >= 1);
  });

  it('should work with handlebars', function() {
    hbs.registerHelper('glob', glob);
    var str = [
      '{{#each (glob "*") as |item|}}',
      '{{item.stem}}',
      '{{/each}}'
    ].join('\n');

    var fn = hbs.compile(str);
    var actual = fn({dest: ''});
    assert(/index/.test(actual));
    assert(/package/.test(actual));
  });

  it('should work with engine', function() {
    engine.helper('glob', glob);
    var str = [
      '<% glob("*", {dest: ""}).map(function(item) { %>',
      '<%= item.stem %>',
      '<% }) %>'
    ].join('\n');

    var actual = engine.render(str);
    assert(/index/.test(actual));
    assert(/package/.test(actual));
  });

  it('should work with lodash', function() {
    var str = [
      '<% glob("*", {dest: ""}).map(function(item) { %>',
      '<%= item.stem %>',
      '<% }) %>'
    ].join('\n');

    var actual = template(str, {imports: {glob: glob}})();
    assert(/index/.test(actual));
    assert(/package/.test(actual));
  });

  it('should throw an error when options.dest is not passed', function(cb) {
    try {
      glob('*.js');
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected "dest" path to be defined on data');
      cb();
    }
  });
});
