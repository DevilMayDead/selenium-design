const { existsSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');
const { yParser } = require('@umijs/utils');

(async () => {
  const args = yParser(process.argv);
  const version = '0.0.1-beta.1';

  const pkgs = readdirSync(join(__dirname, '../packages')).filter(
    (pkg) => pkg.charAt(0) !== '.',
  );

  pkgs.forEach((shortName) => {
    const name = '@selenium-design/components';

    const pkgJSONPath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'package.json',
    );
    const pkgJSONExists = existsSync(pkgJSONPath);

    let json;
    if (args.force || !pkgJSONExists) {
      json = {
        name,
        version,
        description: name,
        keywords: ['selenium', 'selenium-design'],
        license: 'MIT',
        sideEffects: false,
        module: 'es/index.js',
        main: 'lib/index.js',
        types: 'es/index.d.ts',
        files: ['es', 'dist', 'lib'],
        scripts: {
          build: 'father build',
        },
        browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        peerDependencies: {
          react: '>=17.0.0',
          'react-dom': '>=17.0.0',
        },
        publishConfig: {
          access: 'public',
        },
        authors: ['zg <965752122@qq.com> (https://github.com/DevilMayDead)'],
      };

      if (pkgJSONExists) {
        const pkg = require(pkgJSONPath);
        [
          'dependencies',
          'devDependencies',
          'peerDependencies',
          'bin',
          'version',
          'files',
          'authors',
          'types',
          'sideEffects',
          'main',
          'module',
          'description',
        ].forEach((key) => {
          if (pkg[key]) json[key] = pkg[key];
        });
      }
      writeFileSync(pkgJSONPath, `${JSON.stringify(json, null, 2)}\n`);
    }

    const readmePath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'README.md',
    );
    if (args.force || !existsSync(readmePath)) {
      writeFileSync(
        readmePath,
        `# ${name}

> ${json.description}.

See our website [${name}](https://umijs.org/plugins/${shortName}) for more information.

## Install

Using npm:

\`\`\`bash
$ npm install --save ${name}
\`\`\`

or using pnpm:

\`\`\`bash
$ pnpm add ${name}
\`\`\`
`,
      );
    }
  });
})();
