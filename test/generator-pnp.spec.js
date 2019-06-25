const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const generatorPkg = require('../package.json');

describe('#basic', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true })
      .withOptions({ name: '@sc/lre' });
  });

  it('should create correct package.json', () => {
    assert.jsonFileContent('package.json', {
      name: '@sc/lre',
      license: 'MIT'
    });
  });
  it('should create misc files', () => {
    assert.file('.travis.yml');
    assert.file('LICENSE');
    assert.file('README.md');
    assert.file('.gitignore');
    assert.file('.npmignore');
  });
});

describe('#tsc option', () => {
  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true })
      .withOptions({ name: '@sc/lre' });
  });

  it('should create correct package.json', () => {
    assert.jsonFileContent('package.json', {
      name: '@sc/lre',
      license: 'MIT',
      devDependencies: {
        typescript: generatorPkg.devDependencies.typescript
      }
    });
  });
  it('should create typescript specific files', () => {
    assert.file('tslint.json');
    assert.file('tsconfig.json');
    assert.file('src/index.ts');
    assert.file('src/lre.ts');
  });
});
describe('#no-tsc option', () => {
  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true })
      .withOptions({ name: '@sc/lre', tsc: false });
  });

  it('should create correct package.json', () => {
    assert.jsonFileContent('package.json', {
      name: '@sc/lre',
      license: 'MIT',
      devDependencies: {
        mocha: generatorPkg.devDependencies.mocha
      }
    });
  });
  it('should create javascript specific files', () => {
    assert.file('.eslintrc.json');
    assert.file('lib/index.js');
  });
});
