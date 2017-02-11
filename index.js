'use strict';

var fs = require('fs');
var path = require('path');
var Vinyl = require('vinyl');
var extend = require('extend-shallow');
var glob = require('matched');

module.exports = function(patterns, options) {
  options = options || {};

  var ctx = this || {};
  var opts = extend({}, ctx.options, options, options.hash);
  var data = extend({}, ctx.context, ctx);

  var app = ctx.app || {};
  opts.cwd = path.resolve(opts.cwd || app.cwd || process.cwd());
  var File = app.View || Vinyl;
  var list = [];

  var dest = data.dest;
  if (typeof dest === 'undefined') {
    dest = opts.dest;
  }

  if (typeof dest !== 'string') {
    throw new Error('expected "dest" path to be defined on data');
  }

  var files = glob.sync(patterns, opts);
  dest = path.resolve(dest);

  for (var i = 0; i < files.length; i++) {
    var fp = path.resolve(opts.cwd, files[i]);
    var file = new File({path: fp});
    if (!file.stat) file.stat = fs.lstatSync(file.path);
    file.options = {};
    file.data = {};
    file.base = dest;
    file.cwd = dest;
    list.push(file);
  }
  return list;
};
