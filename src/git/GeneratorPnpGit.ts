import * as Generator from 'yeoman-generator';

import { GeneratorPnpAppOptions } from '../app/GeneratorPnpAppOptions';
import utils from '../app/utils';
export class GeneratorPnpGit extends Generator {
  options: GeneratorPnpAppOptions;
  constructor(args: any, opts: any) {
    super(args, opts);
    opts.force = true;
    this.option('root', {
      type: String,
      default: '',
      description: 'Package root'
    });
  }

  end() {
    this.destinationRoot(this.destinationPath(this.options.root));
    if (this.fs.exists(this.destinationPath('package.json'))) {
      const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      this.spawnCommandSync('git', ['init', '--quiet'], {
        cwd: this.destinationPath()
      });

      if (pkg.repository) {
        const repoSSH = utils.gitRepoSSH(pkg.repository);
        this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
          cwd: this.destinationPath()
        });
      }
    } else {
      throw new Error("Can't find a package.json file");
    }
  }
}
