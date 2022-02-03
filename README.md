# @httptoolkit/HTTPSnippet [![Build Status](https://github.com/httptoolkit/httpsnippet/workflows/CI/badge.svg)](https://github.com/httptoolkit/httpsnippet/actions) [![Available on NPM](https://img.shields.io/npm/v/@httptoolkit/httpsnippet.svg)](https://npmjs.com/package/@httptoolkit/httpsnippet)

> _Part of [HTTP Toolkit](https://httptoolkit.tech): powerful tools for building, testing & debugging HTTP(S)_

Httpsnippet is an HTTP request snippet generator for *many* languages & tools including: `cURL`, `HTTPie`, `Javascript`, `Node`, `C`, `Java`, `PHP`, `Objective-C`, `Swift`, `Python`, `Ruby`, `C#`, `Go`, `OCaml` and [more](https://github.com/httptoolkit/httpsnippet/tree/main/src/targets)!

This library relies on the popular [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format to import data and describe HTTP calls.

_This is a fork of Kong's (previous Mashape's) [httpsnippet](https://github.com/Kong/httpsnippet/) library, which appears to no longer be maintained. This version is in active production use in [HTTP Toolkit](https://httptoolkit.tech)._

## Install

```shell
# to use in cli
npm install --global @httptoolkit/httpsnippet

# to use as a module
npm install --save @httptoolkit/httpsnippet
```

## Usage

```

  Usage: httpsnippet [options] <files ...>

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -t, --target <target>     target output
    -c, --client [client]     target client library
    -o, --output <directory>  write output to directory
    -x, --extra [{"optionKey": "optionValue"}]  provide extra options for the target/client

```

###### Example

process single file: [`example.json`](test/fixtures/requests/full.json) in [HAR Request Object](http://www.softwareishard.com/blog/har-12-spec/#request) format, or full [HAR](http://www.softwareishard.com/blog/har-12-spec/#log) log format:

```shell
httpsnippet example.json --target node --client unirest --output ./snippets
```

```shell
$ tree snippets
snippets/
└── example.js
```

process multiple files:

```shell
httpsnippet ./*.json --target node --client request --output ./snippets
```

```shell
$ tree snippets/
snippets/
├── endpoint-1.js
├── endpoint-2.js
└── endpoint-3.js
```

provide extra options:

```shell
httpsnippet example.json --target http --output ./snippets -x '{"autoHost": false, "autoContentLength": false}'
```


## API

### HTTPSnippet(source)

#### source

*Required*
Type: `object`

Name of [conversion target](TARGETS.md)

```js
var HTTPSnippet = require('httpsnippet');

var snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request'
});
```

### convert(target [, options])

#### target

*Required*
Type: `string`

Name of [conversion target](TARGETS.md)

#### options

Type: `object`

Target options, *see [target docs](https://github.com/httptoolkit/httpsnippet/blob/main/TARGETS.md) for details*

```js
var HTTPSnippet = require('httpsnippet');

var snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request'
});

// generate Node.js: Native output
console.log(snippet.convert('node'));

// generate Node.js: Native output, indent with tabs
console.log(snippet.convert('node', {
  indent: '\t'
}));
```

### convert(target [, client, options])

#### target

*Required*
Type: `string`

Name of [conversion target](TARGETS.md)

#### client

Type: `string`

Name of conversion target [client library](TARGETS.md)

#### options

Type: `object`

Target options, *see [target docs](https://github.com/httptoolkit/httpsnippet/blob/main/TARGETS.md) for details*

```js
var HTTPSnippet = require('httpsnippet');

var snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request'
});

// generate Shell: cURL output
console.log(snippet.convert('shell', 'curl', {
  indent: '\t'
}));

// generate Node.js: Unirest output
console.log(snippet.convert('node', 'unirest'));
```

### addTarget(target)
#### target

*Required*
Type: `object`

Representation of a [conversion target](https://github.com/httptoolkit/httpsnippet/blob/main/CONTRIBUTING.md#creating-new-conversion-targets). Can use this to use targets that are not officially supported.

```js
const customLanguageTarget = require('httpsnippet-for-my-lang');
HTTPSnippet.addTarget(customLanguageTarget);
```

### addTargetClient(target, client)
### target

*Required*
Type: `string`

Name of [conversion target](TARGETS.md)

### client

*Required*
Type: `object`

Representation of a [conversion target client](https://github.com/httptoolkit/httpsnippet/blob/main/CONTRIBUTING.md#creating-new-conversion-targets). Can use this to use target clients that are not officially supported.

```js
const customClient = require('httpsnippet-for-my-node-http-client');
HTTPSnippet.addTargetClient('node', customClient);
```

## Documentation

At the heart of this module is the [HAR Format](http://www.softwareishard.com/blog/har-12-spec/#request) as the HTTP request description format, please review some of the sample JSON HAR Request objects in [test fixtures](/test/fixtures/requests), or read the [HAR Docs](http://www.softwareishard.com/blog/har-12-spec/#request) for more details.

For detailed information on each target, please review the [target docs](./TARGETS.md).

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](/issues).

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

For info on creating new conversion targets, please review this [guideline](https://github.com/httptoolkit/httpsnippet/blob/main/CONTRIBUTING.md#creating-new-conversion-targets)

Moreover, if your pull request contains JavaScript patches or features, you must include relevant unit tests.

Editor preferences are available in the [editor config](.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, this project is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.
