// Vue.config.js 配置选项
const FileManagerPlugin = require('filemanager-webpack-plugin')
module.exports = {

    // 选项
    //  基本路径
    publicPath: "./",
    //  构建时的输出目录
    outputDir: "dist",
    //  放置静态资源的目录
    assetsDir: "assets",
    //  html 的输出路径
    indexPath: "index.html",
    //文件名哈希
    filenameHashing: true,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '民生热力缴费系统'
                return args
            })
    },
    configureWebpack: { //webpack的相关配置在这里
        plugins: [
            new FileManagerPlugin({ //初始化 filemanager-webpack-plugin 插件实例
                onEnd: {
                    delete: [ //首先需要删除项目根目录下的dist.zip
                        './dist.zip',
                    ],
                    archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                        {
                            source: './dist',
                            destination: './dist.zip'
                        },
                    ]
                }
            })
        ]
    }

}