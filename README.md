# helper-glob-files [![NPM version](https://img.shields.io/npm/v/helper-glob-files.svg?style=flat)](https://www.npmjs.com/package/helper-glob-files) [![NPM monthly downloads](https://img.shields.io/npm/dm/helper-glob-files.svg?style=flat)](https://npmjs.org/package/helper-glob-files)  [![NPM total downloads](https://img.shields.io/npm/dt/helper-glob-files.svg?style=flat)](https://npmjs.org/package/helper-glob-files) [![Linux Build Status](https://img.shields.io/travis/helpers/helper-glob-files.svg?style=flat&label=Travis)](https://travis-ci.org/helpers/helper-glob-files)

> Generic template helper for creating an array of vinyl file objects from a glob pattern.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save helper-glob-files
```

## Usage

This can be used as a helper with [handlebars](http://www.handlebarsjs.com/), [lodash](https://lodash.com/), [assemble](https://github.com/assemble/assemble), [engine](https://github.com/jonschlinkert/engine) or directly as a utility function.

**Heads up!**

The purpose of this helper is to easily create an array of files to use in templates. This means that the source and dest patterns will need to be known at render time and, _as such, this helper expects a `dest` path to be defined as a string on the helper options or on the context, otherwise an error is thrown_.

```js
var glob = require('helper-glob-files');
console.log(glob('*.js', {dest: ''}));
//=> [ <File "example.js">, <File "index.js"> ]
```

## Handlebars usage

```js
var handlebars = require('handlebars');
handlebars.registerHelper('glob', glob);
```

Then in templates:

```handlebars
{{#each (glob "*") as |file|}}
  {{file.path}}
{{/each}}
```

**Tip**

Get the contents for each file:

```js
var fs = require('fs');
handlebars.registerHelper('read', function(filepath) {
  return fs.readFileSync(filepath, 'utf8');
});
```

Then in templates:

```handlebars
<!-- tmpl -->
{{#each (glob "*") as |file|}}
<p>{{read file.path}}</p>
{{/each}}
```
Then:

```js
// compile
var fn = handlebars.compile(tmpl);
// render 
console.log(fn());
```

## Lo-dash usage

```js
var template = require('lodash.template');
```

Then in templates:

```html
<!-- tmpl -->
<% glob("*", {dest: ""}).map(function(item) { %>
<%= item.stem %>
<% }) %>
```

Then:

```js
// compile
var fn = template(tmpl, {imports: {glob: glob}});
// render 
console.log(fn());
```

## About

### Related projects

* [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers): More than 130 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate… [more](https://github.com/assemble/handlebars-helpers) | [homepage](https://github.com/assemble/handlebars-helpers "More than 130 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate, Verb, Ghost, gulp-handlebars, grunt-handlebars, consolidate, or any node.js/Handlebars project.")
* [template-helpers](https://www.npmjs.com/package/template-helpers): Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or… [more](https://github.com/jonschlinkert/template-helpers) | [homepage](https://github.com/jonschlinkert/template-helpers "Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or any engine that supports helper functions.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
MIT

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.2, on February 10, 2017._