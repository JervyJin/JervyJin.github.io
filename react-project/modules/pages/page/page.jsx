// 引入模块
var Util = require('../../mixins/util.jsx')
var Banner = require('../../components/banner/banner.jsx')
var Content = require('../../components/content/content.jsx')

// 抽象组件
module.exports = React.createClass({
	// 使用混合
	mixins: [Util],
	// 初始化状态
	getInitialState: function() {
		return {
			data: []
		}
	},
	render: function() {
		return (
			<section className="section" style={{display: this.props.style}}>
				<Banner title={this.props.title} intro={this.props.intro}></Banner>
				<Content data={this.state.data}></Content>
			</section>
		)
	},
	// 创建完成
	componentDidMount: function() {
		// 请求数据
		this.ajax(this.props.url, function(res) {
			// 存储数据，更新状态
			this.setState({
				data: res
			})
		// 绑定作用域
		}.bind(this))
	}
})