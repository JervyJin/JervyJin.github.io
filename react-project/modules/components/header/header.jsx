require('./header.less')
// 定义头部组件
module.exports = React.createClass({
	// 由于页面可以切换，数据会发生改变，是内部的数据，用状态存储
	getInitialState: function() {
		var cls = {};
		// 哪个页面选中，哪个页面的值就是choose
		cls[this.props.choosePage] = 'choose'
		return {
			cls: cls
		}
	},
	// 点击导航，切换页面
	changeNav: function(e) {
		// 第一种方式 绑定属性数据
		// console.log(e.target.getAttribute('data-id'))
		// 第二章方式 传递参数
		// console.log(e)
		// 更新状态
		var cls = {};
		// 被点击的按钮，要被选中
		cls[e] = 'choose';
		// 更新状态
		this.setState({
			cls: cls
		})
		// 第二步 执行父组件提供的方法，并传递子组件数据
		this.props.changePage(e);
	},
	render: function() {
		// 缓存cls
		var cls = this.state.cls;
		return (
			<div className="header navbar navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<a onClick={this.changeNav.bind(this, 'home')} className="navbar-brand">Bootstrap</a>
					</div>
					<ul className="navbar-nav nav nav-pills pull-right">
						<li>
							<a href="">Bootstrap中文网</a>
						</li>
					</ul>
					<ul className="navbar-nav nav nav-pills">
						<li>
							<a data-id="start" onClick={this.changeNav.bind(this, 'start')} className={cls.start}>起步</a>
						</li>
						<li>
							<a onClick={this.changeNav.bind(this, 'css')} className={cls.css}>全局 CSS 样式</a>
						</li>
						<li>
							<a onClick={this.changeNav.bind(this, 'component')}  className={cls.component}>组件</a>
						</li>
						<li>
							<a onClick={this.changeNav.bind(this, 'js')} className={cls.js}>JavaScript 插件</a>
						</li>
						<li>
							<a onClick={this.changeNav.bind(this, 'marker')} className={cls.marker}>定制</a>
						</li>
						<li>
							<a href="">网站实例</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
})