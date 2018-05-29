import * as Generator from 'yeoman-generator';

import { GeneratorPnpAppOptions } from '../app/GeneratorPnpAppOptions';
import utils from '../app/utils';
export class GeneratorPnpReadme extends Generator {
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
    this.option('githubAccount', {
      type: String,
      default: this.user.git.name(),
      description: 'GitHub username or organization'
    });
    this.option('travis', {
      type: Boolean,
      description: 'Add travis badge'
    });
    this.option('appveyor', {
      type: Boolean,
      description: 'Add appveyor badge'
    });
  }
  initializing() {
    this.destinationRoot(this.destinationPath(this.options.root));
  }
  public writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const props = {
      ...pkg,
      ...utils.nameParts(pkg.name),
      githubAccount: this.options.githubAccount,
      travis: this.options.travis,
      appveyor: this.options.appveyor
    };
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      props
    );
  }
}
