const kebabToCamel = (string: string) =>
  string.replace(/(-\w)/g, match => match[1].toUpperCase());

const kebabCase = (string: string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

const nameParts = (name: string) => {
  if (name.startsWith('@')) {
    const [scope, localName] = name.split('/');
    return { scope, localName, safeName: kebabToCamel(localName) };
  }
  return { scope: undefined, localName: name, safeName: kebabToCamel(name) };
};

const removeEmpty = obj => {
  Object.keys(obj).forEach(
    k =>
      (obj[k] && typeof obj[k] === 'object' && removeEmpty(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  );
  return obj;
};
const gitRepoHTTPS = (account: string, repoName: string) => {
  return {
    type: 'git',
    url: `git+https://github.com/${account}/${repoName}.git`
  };
};
const gitRepoSSH = (repository: any) => {
  const regex = /(?:\/\/.*\/)?([A-Za-z-]*)\/([A-Za-z-]*)(?:\.git)?/;
  const repo = typeof repository === 'object' ? repository.url : repository;
  const m = repo.match(regex);
  return `git@github.com:${m[1]}/${m[2]}.git`;
};
export default {
  kebabToCamel,
  kebabCase,
  nameParts,
  removeEmpty,
  gitRepoHTTPS,
  gitRepoSSH
};
