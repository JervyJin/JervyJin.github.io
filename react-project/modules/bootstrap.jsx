var App = require('./app/app.jsx')

// 渲染
// 如果没有定义默认属性， 使用组件的时候，就要传递属性，
// 如果没有传递属性，显示就有问题，所以page属性是必须传递。
ReactDOM.render(<App page="home"></App>, ickt)