const path = require('path');
// 解决 metro 不支持符号链接（npm link）
// 貌似只支持 dependencies 下的
const { applyConfigForLinkedDependencies } = require('@carimus/metro-symlinked-deps');

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = applyConfigForLinkedDependencies(
    {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false,
                },
            }),
        },
        watchFolders: [
            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, '../../node_modules'),
        ],
    },
    {
        projectRoot: __dirname,
        blacklistLinkedModules: ['react-native'],
        resolveNodeModulesAtRoot: true,
    },
);
