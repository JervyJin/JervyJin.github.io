// 定义混合对象
module.exports = {
	/**
	 * 异步请求方法
	 * @url 	请求地址
	 * @fn 		回调函数
	 ***/ 
	ajax: function(url, fn) {
		// 创建xhr
		var xhr = new XMLHttpRequest();
		// 监听事件
		xhr.onreadystatechange = function() {
			// 判断状态
			if (xhr.readyState === 4) {
				// 判断状态码
				if (xhr.status === 200) {
					// 将json数据转换成对象
					fn(JSON.parse(xhr.responseText))
				}
			}
		}
		// 打开请求
		xhr.open('GET', url, true);
		// 发送数据
		xhr.send(null);
	}
}