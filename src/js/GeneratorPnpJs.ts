import * as Generator from 'yeoman-generator';

import { GeneratorPnpAppOptions } from '../app/GeneratorPnpAppOptions';
import utils from '../app/utils';

const devdeps = ['chai', 'mocha', 'eslint'];
export class GeneratorPnpJs extends Generator {
  pkg: any = {};
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
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const { scope, localName, safeName } = utils.nameParts(this.options.name || pkg.name);
    try {
      this.fs.copy(this.templatePath('config/*'), this.destinationPath());
    } catch {}
    try {
      this.fs.copy(this.templatePath('config/.*'), this.destinationPath());
    } catch {}
    this.fs.copy(this.templatePath('test/mocha.opts'), this.destinationPath('test/mocha.opts'));
    this.fs.copyTpl(
      this.templatePath('test/template._js'),
      this.destinationPath(`test/${localName}.spec.js`),
      { localName, safeName }
    );
    this.fs.copyTpl(this.templatePath('lib/index._js'), this.destinationPath('lib/index.js'), {
      localName,
      safeName
    });
    this.fs.copyTpl(
      this.templatePath('lib/index.dt._ts'),
      this.destinationPath('lib/index.dt.ts'),
      { localName, safeName }
    );
    pkg.files = ['lib'];
    pkg.main = 'lib/index.js';
    pkg.typings = 'lib/index.d.ts';

    pkg.scripts = {
      test: 'mocha',
      'test:watch': 'mocha --watch',
      lint: 'eslint lib/**/*.js',
      preversion: 'npm run lint',
      postversion: 'git push --follow-tags'
    };

    const generatorPkg = require('../../package.json');

    if (this.options.skipInstall) {
      pkg.devDependencies = {};
      devdeps.forEach(m => {
        pkg.devDependencies[m] = generatorPkg.devDependencies[m] || '*';
      });
    }
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  public install() {
    this.npmInstall(devdeps, { 'save-dev': true });
  }
}
