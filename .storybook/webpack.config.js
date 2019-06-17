const merge = require('webpack-merge');

const baseConfig = require('../webpack/react/webpack.config');
const { getStyleLoader } = require('../webpack/utils');

module.exports = ({ config }) =>
    merge(config, {
        module: { ...baseConfig.module, rules: [...baseConfig.module.rules, ...getStyleLoader({})] },
        plugins: baseConfig.plugins,
        resolve: baseConfig.resolve,
    });
