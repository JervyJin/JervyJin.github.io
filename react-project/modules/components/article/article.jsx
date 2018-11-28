require('./article.less')
// 内容组件
module.exports = React.createClass({
	// 创建列表
	createList: function() {
		return this.props.data.map(function(obj, index) {
			return (
				<li key={index} id={obj.id}>
					<h2>{obj.title}</h2>
					<p>{obj.content}</p>
				</li>
			)
		})
	},
	render: function() {
		return (
			<div className="article">
				<ul>{this.createList()}</ul>
			</div>
		)
	}
})