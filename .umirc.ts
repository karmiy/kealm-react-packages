import { defineConfig } from 'dumi';
import path from 'path';

const isBrowserRouter = process.env.NODE_ENV === 'development';

// 是否使用 lib 作为编译入口
const isReactMobileLibEntry = false;

export default defineConfig({
  mode: 'site',
  title: 'Kealm',
  favicon: 'http://karmiy.gitee.io/kealm-react-components/favicon.ico',
  // logo: 'https://static.seeyouyima.com/www.meiyou.com/meiyou-4c6b85bc28c1410ac99d3392c30a1283.png',
  logo: '/logo.png',
  outputPath: 'docs-dist',
  // publicPath: isBrowserRouter ? '/' : 'https://static.karmiy.com/kealm-react-packages/',
  publicPath: isBrowserRouter ? '/' : './',
  history: { type: isBrowserRouter ? 'browser' : 'hash' },
  resolve: {
    includes: ['docs', 'packages'],
  },
  chainWebpack: memo => memo.resolve.extensions.add('.css'),
  alias: {
    '@kealm/react-packages': path.resolve(__dirname, './src'),
    ...(isReactMobileLibEntry ? { '@kealm/react-components': path.resolve(__dirname, './packages/react-components') } : null),
    'react-native$': path.resolve(__dirname, './plugins/react-native-web'),
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
  },
  styles: [`input, textarea { outline: none; }`],
  // headScripts: ['https://static.karmiy.com/kealm-react-utils/touch-emulator.js'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@kealm/react-components',
        libraryDirectory: isReactMobileLibEntry ? 'lib' : 'src',
        camel2DashComponentName: true,
        customStyleName: name => `@kealm/react-components/${isReactMobileLibEntry ? 'lib' : 'src'}/style/${name}.scss`,
      },
      '@kealm/react-components',
    ],
    ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' }, 'antd'],
  ],
  themeConfig: {
    hd: false,
  },
});
