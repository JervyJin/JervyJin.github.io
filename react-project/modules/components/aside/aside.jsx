require('./aside.less')
// 侧边栏组件
module.exports = React.createClass({
	// 创建列表
	createList: function() {
		return this.props.data.map(function(obj, index) {
			return (
				<li key={index}>
					<a href={'#' + obj.id}>{obj.title}</a>
				</li>
			)
		})
	},
	render: function() {
		return (
			<div className="aside">
				<ul>{this.createList()}</ul>
			</div>
		)
	}
})