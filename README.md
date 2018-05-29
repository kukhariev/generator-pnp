# generator-pnp

> Generate TypeScript or JavaScript node project.

[![npm version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]

## Install

```sh
npm install -g yo
npm install -g generator-pnp
```

## Usage

```sh
yo pnp [project name] [options]
```

## Options

* `name` (String, default current folder) Project name.
* `description`(String) Project description.
* `version` (String) Package version
* `tsc` (Boolean, default true) Typescript project.
* `license` (Boolean, default true) Include or not a `LICENSE` file (MIT).
* `githubAccount` (String) Account name for GitHub repo location.
* `repositoryName` (String) GitHub repo name.
* `travis` (Boolean, default true) Include .travis.yml.
* `appveyor` (Boolean, default false) Include appveyor.yml.
* `git` (Boolean, default true) Intialize a git repository and add remote.

## Sub generators

* `pnp:tsc`
* `pnp:js`
* `pnp:readme`
* `pnp:license`
* `pnp:ci`
* `pnp:git`

Use `yo pnp:[sub] --help` for more

## License

MIT

[npm-image]: https://img.shields.io/npm/v/generator-pnp.svg
[npm-url]: https://www.npmjs.com/package/generator-pnp
[travis-image]: https://img.shields.io/travis/kukhariev/generator-pnp/master.svg
[travis-url]: https://travis-ci.org/kukhariev/generator-pnp
