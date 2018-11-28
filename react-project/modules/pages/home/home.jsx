// 引入样式文件
require('./home.less')

// 定义首页组件
module.exports = React.createClass({
	// 定义列表数据
	getInitialState: function() {
		return {
			firstList: [
				{
					img: 'sass-less.png',
					h3: '预处理脚本',
					p: '虽然可以直接使用 Bootstrap 提供的 CSS 样式表，不要忘记 Bootstrap 的源码是基于最流行的 CSS 预处理脚本 - <a href="">Less</a> 和 <a href="">Sass</a> 开发的。你可以采用预编译的 CSS 文件快速开发，也可以从源码定制自己需要的样式。'
				},
				{
					img: 'devices.png',
					h3: '一个框架、多种设备',
					p: '你的网站和应用能在 Bootstrap 的帮助下通过同一份代码快速、有效适配手机、平板、PC 设备，这一切都是 CSS 媒体查询（Media Query）的功劳。'
				},
				{
					img: 'components.png',
					h3: '特性齐全',
					p: 'Bootstrap 提供了全面、美观的文档。你能在这里找到关于 HTML 元素、HTML 和 CSS 组件、jQuery 插件方面的所有详细文档。'
				}
			],
			secondList: ['01.png', '02.jpg', '03.png', '04.png']
		}
	},
	// 创建列表的方法
	createList: function(data) {
		// return this.state.firstList.map(function(obj, index) {
		return data.map(function(obj, index) {
			// 如果obj是字符串，就是第二个列表
			if (typeof obj === 'string') {
				return (
					<li key={index}>
						<img src={'img/' + obj} alt=""/>
					</li>
				)
			} else {
				// 为了将a标签渲染出来，我们设置dangerouslySetInnerHTML属性
				var content = {
					__html: obj.p
				}
				return (
					<li key={index}>
						<img src={'img/' + obj.img} alt=""/>
						<h3>{obj.h3}</h3>
						<p dangerouslySetInnerHTML={content}></p>
					</li>
				)
			}
		})
	},
	render: function() {
		// console.log(this.props)
		return (
			<section style={{display: this.props.style}} className="home">
				<div className="banner">
					<div className="logo">B</div>
					<h1>Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。</h1>
					<span className="btn btn-lg">下载 Bootstrap</span>
					<p>当前版本： v3.3.7 | 文档更新于：2017-05-22</p>
				</div>
				{/*两种方式，一种是为part定义类，一种是使用混合，复用样式*/}
				<div className="first-part part">
					<div className="container">
						<h2>为所有开发者、所有应用场景而设计。</h2>
						<p className="info">Bootstrap 让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>
						<div className="line"></div>
						<ul className="clearfix">{this.createList(this.state.firstList)}</ul>
						<div className="line"></div>
						<p className="info">Bootstrap 是完全开源的。它的代码托管、开发、维护都依赖 GitHub 平台。</p>
						<span className="btn btn-lg">查看 GitHub 项目首页</span>
					</div>
				</div>
				<div className="second-part part">
					<div className="container">
						<h2>基于 Bootstrap 构建的网站</h2>
						<p className="info">全球数以百万计的网站都是基于 Bootstrap 构建的。你可以先参观一下我们提供的实例精选或者看一看我们粉丝的网站吧。</p>
						<div className="line"></div>
						<ul className="clearfix">{this.createList(this.state.secondList)}</ul>
						<div className="line"></div>
						<p className="info">我们在“优站精选”里展示了许多精美的 Bootstrap 网站。</p>
						<span className="btn btn-lg">逛一逛“优站精选”</span>
					</div>
				</div>
			</section>
		)
	}
})