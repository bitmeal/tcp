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
    "pluginOptions": {
        "electronBuilder": {
            "builderOptions": {
                "directories": {
                    "buildResources": "resources",
                    "output": "release"
                }
            }
        }
    },
}