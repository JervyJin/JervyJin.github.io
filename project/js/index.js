// 定义工具方法
var Util = {
	/**
	* 实现异步请求方法
	* @url 		请求地址
	* @fn 		回调函数
	***/ 
	ajax: function(url, fn) {
		// 创建xhr
		var xhr = new XMLHttpRequest();
		// 监听xhr状态
		xhr.onreadystatechange = function() {
			// 监听状态
			if (xhr.readyState === 4) {
				// 监听返回状态码
				if (xhr.status === 200) {
					// 执行回调函数
					fn(JSON.parse(xhr.responseText))
				}
			}
		}
		// 打来请求
		xhr.open('GET', url, true);
		// 发送数据
		xhr.send(null);
	}
}

// 测试
// Util.ajax('data/home.json', function(res) {
// 	console.log(res)
// })

// 定义组件类
// 首页
var Home = Vue.extend({
	template: '#tpl_home',
	// 绑定数据
	data: function() {
		return {
			nav: [
				{ id: '1', img: '01.png', title: '美食' },
				{ id: '2', img: '02.png', title: '电影' },
				{ id: '3', img: '03.png', title: '酒店' },
				{ id: '4', img: '04.png', title: '休闲' },
				{ id: '5', img: '05.png', title: '外卖' },
				{ id: '6', img: '06.png', title: 'KTV' },
				{ id: '7', img: '07.png', title: '周边游' },
				{ id: '8', img: '08.png', title: '丽人' },
				{ id: '9', img: '09.png', title: '小吃' },
				{ id: '10', img: '10.png', title: '火车票' },	
			],
			// 广告数据
			ad: [],
			// 列表数据
			list: []
		}
	},
	// 获取数据
	created: function() {
		// 缓存this
		var me = this;
		// 发送请求
		Util.ajax('data/home.json', function(res) {
			me.ad = res.data.ad
			me.list = res.data.list
		})
	}
})
// 列表页
var List = Vue.extend({
	// 注册变量
	props: ['route', 'sendChildValue'],
	template: '#tpl_list',
	// 绑定数据
	data: function() {
		return {
			order: [
				{ id: 'price', title: '价格排序' },
				{ id: 'sales', title: '销量排序' },
				{ id: 'evaluate', title: '好评排序' },
				{ id: 'count', title: '优惠排序' }
			],
			// 初始化数据
			list: [],
			// 缓存数据
			other: []
		}
	},
	// 过滤list数据
	computed: {
		dealList: function() {
			// 根据sendChildValue来过滤list数组
			// var val = this.sendChildValue;
			// // 过滤的结果
			// var result = [];
			// // 遍历list
			// this.list.forEach(function(item, index, arr) {
			// 	// 如果item的title字段包含val，存储item
			// 	if (item.title.indexOf(val) >= 0) {
			// 		// 存储item
			// 		result.push(item);
			// 	}
			// })
			// // 返回数据
			// return result;
			// 缓存this
			// var me = this;
			// 获取搜索字段
			var val = this.sendChildValue;
			// 数组过滤
			return this.list.filter(function(item, index, arr) {
				// 条件
				return item.title.indexOf(val) >= 0;
			})
		}
	},
	// 定义事件
	methods: {
		// 显示更多按钮
		showOther: function() {
			// 将other中的数据，存储在list中
			// 注意：数据的更新一定要被vue监听到，所以我们不能直接调用concat更新，必须赋值覆盖
			this.list = this.list.concat(this.other);
			// other清空
			this.other = [];
		},
		// 对数据排序
		listOrder: function(id) {
			// console.log(e.currentTarget.getAttribute('data-id'))
			// console.log(111, id)
			// 数组排序
			this.list.sort(function(a, b) {
				// 如果是优惠，要特殊处理：门市价 减去 现价
				if (id === 'count') {
					// 升序
					// return (a.originPrice - a.price) - (b.originPrice - b.price)
					// 降序
					return (b.originPrice - b.price) - (a.originPrice - a.price)
				}
				// 升序 
				// return a[id] - b[id]
				// 降序
				return b[id] - a[id]
			})
		}
	},
	// 组件创建完成，请求数据
	created: function() {
		// 缓存this
		var me = this;
		// console.log(this.route, this.$parent.route)
		// 发送请求
		Util.ajax('data/list.json?' + this.route[0] + '=' + this.route[1], function(res) {
			// console.log(res)
			// me.list = res.data;
			// 只显示前三个
			me.list = res.data.slice(0, 3);
			// 缓存剩余的
			me.other = res.data.slice(3);
		})
	}

})
// 详情页
var Detail = Vue.extend({
	template: '#tpl_detail',
	// 定义数据
	data: function() {
		return {
			data: {}
		}
	},
	// 组件创建完成，获取数据
	created: function() {
		// 缓存this
		var me = this;
		// 请求数据
		Util.ajax('data/product.json?id=' + this.$parent.route[0], function(res) {
			// 将数据存储
			// console.log(res)
			me.data = res.data;
		})
	}
})
// 注册组件
// Vue.component('home', Home)
// Vue.component('list', List)
// Vue.component('detail', Detail)


var data = {
	// 页面组件名称
	view: 'home',
	// 路由参数
	route: [],
	// 搜索内容
	searchValue: '',
	// 发送给子节点的value
	sendChildValue: ''
}

// 定义vue
var app = new Vue({
	// 容器
	el: '#app',
	// 数据
	data: data,
	// 注册组件
	components: {
		home: Home,
		list: List,
		detail: Detail
	},
	// 定义方法
	methods: {
		// 向子组件发送输入的内容
		sendValue: function() {
			// 将输入框的值传递给sendChildValue
			this.sendChildValue = this.searchValue;
			// 清空输入框
			this.searchValue = '';
		},
		// 点击返回按钮
		goBack: function() {
			history.go(-1)
		}
	}
	// 创建期
	// 创建前
	// beforeCreate: function() {
	// 	console.log('beforeCreate', 111, this, arguments)
	// },
	// // 创建后
	// created: function() {
	// 	console.log('created', 222, this, arguments)
	// },
	// // 上树前
	// beforeMount: function() {
	// 	console.log('beforeMount', 333, this, arguments)
	// },
	// // 上树后
	// mounted: function() {
	// 	console.log('mounted', 444, this, arguments)

	// },
	// // 数据更新前
	// beforeUpdate: function() {
	// 	console.log('beforeUpdate', 555, this, arguments)
	// },
	// // 数据更新后
	// updated: function() {
	// 	console.log('updated', 666, this, arguments)
	// },
	// // 等以后将路由时候再看
	// // 销毁前
	// beforeDestory: function() {
	// 	console.log('beforeDestory', 777, this, arguments)
	// },
	// // 销毁后
	// destoryed: function() {
	// 	console.log('destoryed', 888, this, arguments)
	// }
})

// 定义路由模块
var router = function() {
	// 解析hash
	// 获取hash
	var hash = location.hash;
	// 删除#以及紧挨着#后面的第一个斜线   ()[]{}^$?*+\. 
	hash = hash.replace(/^#\/?/, '')
	// 切割字符串
	hash = hash.split('/');
	// 可以渲染的页面映射表
	var page = {
		home: true,
		list: true,
		detail: true
	}
	// 如果页面名称在page对象中，可以渲染
	if (page[hash[0]]) {
		// 根据第一个模块设置组件
		app.view = hash[0]
	// 否则，不在配置中，渲染首页
	} else {
		app.view = 'home'
	}
	// 存储路由参数
	app.route = hash.slice(1)
}

// 监听hahs的改变
window.addEventListener('hashchange', router)
// 在这里执行，要比load事件提前
router();
// 页面加载完成，要检测路由
// window.addEventListener('load', router)
// window.onhashchange = function() {}