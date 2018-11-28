// 引入样式文件
require('./app.less')

// 引入相关组件
var Header = require('../components/header/header.jsx')
var Home = require('../pages/home/home.jsx')
var Page = require('../pages/page/page.jsx')

// 定义组件
module.exports = React.createClass({
	// 约束属性
	propTypes: {
		// page是必填的
		page: React.PropTypes.string.isRequired
	},
	// 默认属性
	// getDefaultProps: function() {
	// 	return {
	// 		page: 'home'
	// 	}
	// },
	// 定义状态数据，管理显示哪个页面
	getInitialState: function() {
		// 根据属性数据，创建一份状态数据
		var obj = {
			home: 'none',
			start: 'none',
			css: 'none',
			js: 'none',
			component: 'none',
			marker: 'none'
		}
		// 根据属性修改数据
		obj[this.props.page] = 'block'
		return {
			page: obj
		}
	},
	// 获取当前选中页面的名称
	getChoosePage: function() {
		var page = this.state.page;
		// 寻找值为block的页面
		for (var i in page) {
			// i 是页面名称， page[i]表示是否选中
			if (page[i] === 'block') {
				// 返回页面名称 i
				return i;
			}
		}
	},
	//第三步 父组件方法中，修改状态，存储数据
	// 改变页面显隐
	changePage: function(id) {
		// console.log('parent', id)
		// 点击导航按钮，隐藏之前的页面，显示选中的页面
		// 典型的排他法。先清空，再设置
		var page = this.state.page;
		// 先清空
		for (var i in page) {
			page[i] = 'none';
		}
		// 再设置
		page[id] = 'block';
		// 更新状态
		this.setState({
			page: page
		})

	},
	render: function() {
		// 根据状态的属性值，决定显示哪个页面
		var page = this.state.page
		return (
			<div>
				{/*第一步 在父组件中，为子组件传递方法*/}
				<Header changePage={this.changePage} choosePage={this.getChoosePage()}></Header>
				{/*组件上的任何属性，都是自定义数据属性*/}
				<Home style={page.home}></Home>
				{/*<Start style={page.start}></Start>*/}
				{/*<Css style={page.css}></Css>*/}
				<Page style={page.start} title="起步" intro="简要介绍 Bootstrap，以及如何下载、使用，还有基本模版和案例，等等。" url="data/start.json"></Page>
				<Page style={page.css} title="全局 CSS 样式" intro="设置全局 CSS 样式；基本的 HTML 元素均可以通过 class 设置样式并得到增强效果；还有先进的栅格系统。" url="data/css.json"></Page>
				<Page style={page.component} title="组件" intro="无数可复用的组件，包括字体图标、下拉菜单、导航、警告框、弹出框等更多功能。" url="data/component.json"></Page>
				<Page style={page.js} title="JavaScript 插件" intro="jQuery 插件为 Bootstrap 的组件赋予了“生命”。可以简单地一次性引入所有插件，或者逐个引入到你的页面中。" url="data/js.json"></Page>
				<Page style={page.marker} title="定制并下载 Bootstrap" intro="通过自定义 Bootstrap 组件、Less 变量和 jQuery 插件，定制一份属于你自己的 Bootstrap 版本吧。" url="data/marker.json"></Page>
			</div>
		)
	}
})

// module.exports = App;