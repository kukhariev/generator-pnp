# <%= localName %>

> <%= description %>

[![npm version][npm-image]][npm-url]
<% if (travis) { %>[![Build status][travis-image]][travis-url]<% } -%>

<% if (appveyor) { %>[![Build status][appveyor-image]][appveyor-url]<% } -%>


## Install

```sh
npm install --save <%= name %>
```

## Usage

```js
const { <%= safeName %> } = require('<%= safeName %>');

<%= safeName %>('par')
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(result);
  });
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/<%= name %>.svg
[npm-url]: https://www.npmjs.com/package/<%= name %>
<% if (travis) { %>
[travis-image]: https://img.shields.io/travis/<%= githubAccount %>/<%= localName %>/master.svg
[travis-url]: https://travis-ci.org/<%= githubAccount %>/<%= localName %>
<% } -%>
<% if (appveyor) { %>
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/<%= githubAccount %>/<%= localName %>
[appveyor-url]: https://ci.appveyor.com/project/<%= githubAccount %>/<%= localName %>
<% } -%>
