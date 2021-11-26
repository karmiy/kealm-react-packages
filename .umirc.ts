import { defineConfig } from 'dumi';
import path from 'path';

const isBrowserRouter = process.env.NODE_ENV === 'development';

// 是否使用 lib 作为编译入口
const isReactMobileLibEntry = false;

export default defineConfig({
  mode: 'site',
  title: 'Kealm',
  favicon: isBrowserRouter ? '/logo.ico' : './logo.ico',
  logo: isBrowserRouter ? '/logo.png' : './logo.png',
  outputPath: 'docs-dist',
  publicPath: isBrowserRouter ? '/' : './',
  history: { type: isBrowserRouter ? 'browser' : 'hash' },
  resolve: {
    includes: ['documents', 'packages'],
  },
  chainWebpack: memo => memo.resolve.extensions.add('.css'),
  alias: {
    '@kealm/react-packages': path.resolve(__dirname, './src'),
    ...(isReactMobileLibEntry ? { '@kealm/react-mobile': path.resolve(__dirname, './packages/react-mobile') } : null),
    'react-native$': path.resolve(__dirname, './plugins/react-native-web'),
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
  },
  styles: [`input, textarea { outline: none; }`],
  // headScripts: ['https://static.karmiy.com/kealm-react-utils/touch-emulator.js'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@kealm/react-mobile',
        libraryDirectory: isReactMobileLibEntry ? 'lib' : 'src',
        camel2DashComponentName: true,
        customStyleName: name => `@kealm/react-mobile/${isReactMobileLibEntry ? 'lib' : 'src'}/style/${name}.scss`,
      },
      '@kealm/react-mobile',
    ],
    ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' }, 'antd'],
  ],
  themeConfig: {
    hd: false,
  },
});
