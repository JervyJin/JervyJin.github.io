// 引入webpack
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// 定义配置
module.exports = {
	// 入口文件
	entry: './modules/bootstrap.jsx',
	// 发布文件
	output: {
		filename: './pack/ickt.js'
	},
	// 模块
	module: {
		// 加载机
		loaders: [
			// 加载机
			{
				// 规则
				test: /\.jsx$/,	
				// 避免处理node_modules内容
				exclude: 'node_modules/',
				// 名称
				loader: 'babel-loader?presets[]=react'
			},
			// less 
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}
		]
	},
	plugins: [
		new UglifyJsPlugin()
	]
}