import * as mkdirp from 'mkdirp';
import * as yosay from 'yosay';
import * as chalk from 'chalk';
import { basename } from 'path';
import * as Generator from 'yeoman-generator';
import { GeneratorPnpAppOptions } from './GeneratorPnpAppOptions';
import utils from './utils';
const generatorPkg = require('../../package.json');

export class GeneratorPnpApp extends Generator {
  options: GeneratorPnpAppOptions;
  private pkg;
  constructor(args: any, opts: any) {
    super(args, opts);
    opts.force = true;
    this.argument('name', { type: String, required: false });
    this.option('name', {
      type: String,
      description: 'Package name'
    });
    this.option('description', {
      type: String,
      description: 'Package description'
    });
    this.option('version', {
      type: String,
      description: 'Package version'
    });

    this.option('tsc', {
      type: Boolean,
      description: 'Use Typescript'
    });
    this.option('license', {
      type: Boolean,
      default: true,
      description: 'Include a license'
    });
    this.option('githubAccount', {
      type: String,
      default: this.user.git.name(),
      description: 'GitHub username or organization'
    });
    this.option('repositoryName', {
      type: String,
      description: 'Name of the GitHub repository'
    });
    this.option('travis', {
      type: Boolean,
      description: 'Include .travis.yml file'
    });
    this.option('appveyor', {
      type: Boolean,
      description: 'Include appveyor.yml file'
    });

    this.option('git', {
      type: Boolean,
      description: 'Initialize a git repository'
    });
  }
  initializing() {
    this.log(
      yosay(
        'Welcome to the ' + chalk.yellow(`Node module generator (${generatorPkg.version})`)
      )
    );
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  private _askForModuleName() {
    if (this.options.name) {
      return Promise.resolve({
        name: utils.kebabCase(this.options.name)
      });
    }
    return this.prompt({
      name: 'name',
      message: 'Package name',
      default: basename(process.cwd()),
      filter: utils.kebabCase,
      validate: input => {
        return input.length > 0 && input.length <= 16;
      }
    }).then(answer => {
      this.options.name = utils.kebabCase(answer.name);
    });
  }

  public async prompting() {
    const prompts = [
      {
        name: 'description',
        when: !this.options.description,
        default: '',
        message: 'Package description'
      },
      {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        when: !this.options.keywords,
        filter(keywords) {
          return keywords.split(/\s*,\s*/g);
        }
      },
      {
        type: 'confirm',
        name: 'tsc',
        when: typeof this.options.tsc !== 'boolean',
        default: true,
        message: 'Use typescript?'
      },
      {
        name: 'authorName',
        message: "Author's Name",
        when: !this.options.authorName,
        default: this.user.git.name()
      },
      {
        name: 'authorEmail',
        message: "Author's Email",
        when: !this.options.authorEmail,
        default: this.user.git.email()
      },
      {
        type: 'confirm',
        name: 'travis',
        default: true,
        when: this.options.travis === undefined && this.options.appveyor === undefined,
        message: 'include .travis.yml file'
      },
      {
        type: 'confirm',
        name: 'appveyor',
        default: false,
        when: this.options.travis === undefined && this.options.appveyor === undefined,
        message: 'include appveyor.yml file'
      },
      {
        type: 'confirm',
        name: 'git',
        default: true,
        when: this.options.git === undefined,
        message: 'init git'
      }
    ];
    await this._askForModuleName();
    return this.prompt(prompts as any).then(answers => {
      this.options = {
        ...this.options,
        ...answers,
        ...utils.nameParts(this.options.name)
      };
    });
  }

  configuring() {
    if (basename(this.destinationPath()) !== this.options.name) {
      this.log(`Creating ${this.options.name} folder.`);
      mkdirp.sync(this.options.name);
      this.destinationRoot(this.destinationPath(this.options.name));
    }
    this.options.root = this.destinationPath();
  }

  default() {
    const boilerplatePath = this.options.tsc ? '../tsc' : '../js';
    if (this.options.git) {
      this.composeWith(require.resolve('../git'), this.options);
    }
    if (this.options.license) {
      this.composeWith(require.resolve('../license'), this.options);
    }
    this.composeWith(require.resolve('../readme'), this.options);
    this.composeWith(require.resolve(boilerplatePath), this.options);
    this.composeWith(require.resolve('../ci'), this.options);
  }

  writing() {
    const pkg = {
      name: this.options.name,
      version: this.options.version || '0.0.1',
      description: this.options.description,
      keywords: this.options.keywords,
      author: {
        name: this.options.authorName,
        email: this.options.authorEmail
      },
      repository: utils.gitRepoHTTPS(
        this.options.githubAccount,
        this.options.repositoryName || this.options.localName
      ),
      license: 'MIT',
      engines: {
        node: '>= 8.0.0'
      }
    };
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  end() {}
}
