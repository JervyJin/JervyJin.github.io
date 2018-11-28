// 引入组件
var Aside = require('../aside/aside.jsx')
var Article = require('../article/article.jsx')

// 主区域组件
module.exports = React.createClass({
	render: function() {
		return (
			<div className="content">
				<Article data={this.props.data}></Article>
				<Aside data={this.props.data}></Aside>
			</div>
		)
	}
})