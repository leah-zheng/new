const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    //模式：开发模式/生产模式
    mode:'development', //production
    //source-map调试
    devtool:'source-map',
    //配合devtools 优化、禁止压缩 最小化
    optimization:{
        minimize:false
    },
    //入口文件 多文件
    entry:{
        //当前文件下的路径
        index:path.resolve(__dirname,'./src/js/index.js'),
        detail:path.resolve(__dirname,'./src/js/detail.js'),
        collections:path.resolve(__dirname,'./src/js/collections.js')
    },
    //打包/输出
    output:{
        path:path.resolve(__dirname + '/dist'),
        //打包后的文件名
        filename:'js/[name].js'
    },
    //模块设置
    module:{
        //模块匹配规则
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname,'node_modules'),
                //预设 转成es5
                query:{
                    'presets':['latest'],
                }
            },{
                test:/\.tpl$/,
                loader:'ejs-loader'
            },{
                test:/\.css$/,
                //多个loader
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        //依靠插件
                        options:{
                            plugins:function(){
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                //多个loader
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        //依靠插件
                        options:{
                            plugins:function(){
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'scss-loader'
                ]
            },{
                test:/\.(png|jpg|jpeg|gif|ico|woff|eot|ttf)$/i,
                //文件小于1024 用base64编码压缩
                loaders:'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
            }
        ]
    },
    //插件配置
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.resolve(__dirname,'src/index.html'),
            title:'新闻头条',
            chunks:['index'],
            chunksSortMode:'manual',
            excludeChunks:['node_modules'],
            hash:true,
            minify:{
                //去除备注
                removeComments:true,
                //去除空格
                collapseWhitespace:true
            }
        }),
        new HtmlWebpackPlugin({
            filename:'detail.html',
            template:path.resolve(__dirname,'src/detail.html'),
            title:'新闻详情',
            chunks:['detail'],
            chunksSortMode:'manual',
            excludeChunks:['node_modules'],
            hash:true,
            minify:{
                //去除备注
                removeComments:true,
                //去除空格
                collapseWhitespace:true
            }
        }),
        new HtmlWebpackPlugin({
            filename:'collections.html',
            template:path.resolve(__dirname,'src/collections.html'),
            title:'我的收藏',
            chunks:['collections'],
            chunksSortMode:'manual',
            excludeChunks:['node_modules'],
            hash:true,
            minify:{
                //去除备注
                removeComments:true,
                //去除空格
                collapseWhitespace:true
            }
        }),
    ],
    //开发服务器配置
    devServer:{
        watchOptions:{
            ignored:/node_modules/
        },
        open: true,
        host: 'localhost',
        port: 3000
    }
}