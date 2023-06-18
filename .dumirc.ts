import chalk from 'chalk';
import {defineConfig} from 'dumi';
import {readdirSync} from 'fs';
import {join} from 'path';

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

console.log(tailPkgList)

console.log(alias, tailPkgList.map((dir) => ({type: 'component', dir})))

export default defineConfig({
    alias,
    resolve: {
        docDirs: ['docs'],
        atomDirs: tailPkgList.map((dir) => ({type: 'component', dir})),
    },
    hash: true,
    base: "/selenium-design/",
    publicPath: "/selenium-design"
})
