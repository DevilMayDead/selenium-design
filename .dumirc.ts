import chalk from 'chalk';
import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';

const { SITE_DEPLOY } = process.env;

const pkgName = require(join(__dirname, './package.json')).name;

const headPkgList: string[] = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@selenium-design/${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList.map((path) => `packages/${path}/src/`);

console.log(tailPkgList);

console.log(
  alias,
  tailPkgList.map((dir) => ({ type: 'component', dir })),
);

export default defineConfig({
  alias,
  resolve: {
    docDirs: ['docs'],
    atomDirs: tailPkgList.map((dir) => ({ type: 'component', dir })),
  },
  hash: true,
  base: SITE_DEPLOY === 'TRUE' ? `/${pkgName}/` : undefined,
  publicPath: SITE_DEPLOY === 'TRUE' ? `/${pkgName}/` : undefined,
  monorepoRedirect: { peerDeps: true },
  themeConfig: {
    name: 'selenium-design',
    siteToken: { demoInheritSiteTheme: true },
    socialLinks: {
      github: 'https://github.com/DevilMayDead/selenium-design',
    },
    nav: {
      'zh-CN': [{ title: '组件', link: '/components' }],
    },
    sidebar: {
      '/components': [
        {
          title: '架构设计',
          children: [
            {
              title: 'Components - 组件设计',
              link: '/components',
            },
          ],
        },
        {
          title: '通用',
          children: [
            {
              title: 'Button - 按钮',
              link: '/components/button',
            },
          ],
        },
      ],
    },
    footer: '123',
  },
});
