import chalk from 'chalk';
import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';

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

export default defineConfig({
  alias,
  resolve: {
    docDirs: ['docs'],
    atomDirs: tailPkgList.map((dir) => ({ type: 'component', dir })),
  },
  hash: true,
  // base: "/selenium-design/",
  // publicPath: "/selenium-design/"
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
