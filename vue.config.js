module.exports = {
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'TCP Transformer';
                args[0].meta = { viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1' };

                return args;
            })
    },
    publicPath: (process.env.NODE_ENV === 'production' && process.env.GH_PAGES_DEPLOY === 'true')
    ? '/tcp/'
    : '/',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                directories: {
                    buildResources: "resources",
                    output: "release"
                }
            }
        }
    },
}