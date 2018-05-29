import * as Generator from 'yeoman-generator';

import { GeneratorPnpAppOptions } from '../app/GeneratorPnpAppOptions';
import utils from '../app/utils';
export class GeneratorPnpLicense extends Generator {
  pkg: any = {};
  options: GeneratorPnpAppOptions;
  constructor(args: any, opts: any) {
    super(args, opts);
    opts.force = true;
    this.option('root', {
      type: String,
      default: '',
      description: 'Package root'
    });
    this.option('authorName', {
      type: String,
      default: this.user.git.name(),
      description: 'Author full name'
    });
  }
  initializing() {
    this.destinationRoot(this.destinationPath(this.options.root));
  }
  public writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const year = new Date().getFullYear();
    const authorName = this.options.authorName || pkg.author.name;
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        year,
        authorName
      }
    );
  }
}
