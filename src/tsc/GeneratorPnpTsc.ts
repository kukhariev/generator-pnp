import * as Generator from 'yeoman-generator';

import { GeneratorPnpAppOptions } from '../app/GeneratorPnpAppOptions';
import utils from '../app/utils';

const devdeps = [
  '@types/chai',
  '@types/mocha',
  '@types/node',
  'chai',
  'mocha',
  'rimraf',
  'tslint',
  'ts-node',
  'typescript'
];
export class GeneratorPnpTsc extends Generator {
  options: GeneratorPnpAppOptions;
  constructor(args, opts) {
    super(args, opts);
    opts.force = true;
    this.option('root', {
      type: String,
      description: 'Package root',
      default: ''
    });
  }
  public initializing() {
    this.destinationRoot(this.destinationPath(this.options.root));
  }
  public writing() {
    this.log('TSC\n');
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const { scope, localName, safeName } = utils.nameParts(pkg.name);
    try {
      this.fs.copy(this.templatePath('config/*'), this.destinationPath());
    } catch {}
    try {
      this.fs.copy(this.templatePath('config/.*'), this.destinationPath());
    } catch {}
    this.fs.copy(this.templatePath('test/mocha.opts'), this.destinationPath('test/mocha.opts'));
    this.fs.copyTpl(
      this.templatePath('test/template._ts'),
      this.destinationPath(`test/${localName}.spec.ts`),
      { localName, safeName }
    );
    this.fs.copyTpl(this.templatePath('src/index._ts'), this.destinationPath('src/index.ts'), {
      localName
    });
    this.fs.copyTpl(
      this.templatePath('src/template._ts'),
      this.destinationPath(`src/${localName}.ts`),
      { localName, safeName }
    );
    pkg.files = ['lib'];
    pkg.main = 'lib/index.js';
    pkg.typings = 'lib/index.d.ts';
    pkg.scripts = {
      clean: 'rimraf lib',
      build: 'npm run tslint && npm run clean && npm run build-ts',
      test: 'mocha',
      'test:watch': 'mocha --watch',
      'build:ts': 'tsc',
      tslint: 'tslint -c tslint.json -p tsconfig.json',
      postversion: 'npm run build && git push --follow-tags'
    };
    const generatorPkg = require('../../package.json');

    if (this.options.skipInstall) {
      pkg.devDependencies = {};
      devdeps.forEach(m => {
        pkg.devDependencies[m] = generatorPkg.devDependencies[m];
      });
    }
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  public install() {
    this.npmInstall(devdeps, { 'save-dev': true });
  }
}
