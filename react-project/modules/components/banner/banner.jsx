require('./banner.less')
// banner组件
module.exports = React.createClass({
	render: function() {
		return (
			<div className="banner">
				<div className="container">
					<h1>{this.props.title}</h1>
					<p>{this.props.intro}</p>
				</div>
			</div>
		)
	}
})