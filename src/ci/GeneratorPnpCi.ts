import * as Generator from 'yeoman-generator';

import { GeneratorPnpAppOptions } from '../app/GeneratorPnpAppOptions';
import utils from '../app/utils';
export class GeneratorPnpCi extends Generator {
  pkg: any = {};
  options: GeneratorPnpAppOptions;
  constructor(args: any, opts: any) {
    super(args, opts);
    opts.force = true;
    this.option('root', {
      type: String,
      description: 'Package root',
      default: ''
    });
    this.option('travis', {
      type: Boolean,
      description: 'use travis'
    });
    this.option('appveyor', {
      type: Boolean,
      description: 'use appveyor'
    });
  }
  public initializing() {
    this.destinationRoot(this.destinationPath(this.options.root));
  }
  public prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'travis',
        when:
          this.options.travis === undefined &&
          this.options.appveyor === undefined,
        message: 'Create .travis.yml file'
      },
      {
        type: 'confirm',
        name: 'appveyor',
        when:
          this.options.travis === undefined &&
          this.options.appveyor === undefined,
        message: 'Create appveyor.yml file'
      }
    ];
    return this.prompt(prompts).then(answers => {
      this.options = {
        ...this.options,
        ...answers
      };
    });
  }
  public writing() {
    if (this.options.travis) {
      this.fs.copy(
        this.templatePath('.travis.yml'),
        this.destinationPath('.travis.yml')
      );
    }
    if (this.options.appveyor) {
      this.fs.copy(
        this.templatePath('appveyor.yml'),
        this.destinationPath('appveyor.yml')
      );
    }
  }
}
