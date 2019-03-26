;(function(window) {
	/**
	 * 图片懒加载
	 * @parma imgItems {node[]}  
	 * @returns {boolean} promise为true的时候触发
	 */
	
	function isElementViewportTop(el) {
		let [ top, height ] = [ window.scrollY, window.innerHeight ];
		let elTop = el.offsetTop;
		return (
			elTop < height + top &&
			elTop > top
		)
	}
	function isElementViewportBottom(el) {
		let [ top, height ] = [ window.scrollY, window.innerHeight ];
		// 获取el的底部高度
		let elBottom = el.offsetTop +el.offsetHeight;
		return (
			elBottom < height + top &&
			elBottom > top
		)
	}
	function lazyLoad(imgItems) {
		let _fnScrollTop =  window.scrollY;
		/**
		 * @parma arr {node[]}  
		 * @parma item {node}
		 */
		function delItem(arr, item) {
			if(arr.indexOf(item) != -1) {
				item.setAttribute('src',item.dataset.src)
				// arr.indexOf(item)寻找对应位置
				arr.splice(arr.indexOf(item), 1)
			}
		}
		
		if(!Array.isArray(imgItems)) {
			return false
		}
		if(imgItems.length === 0) {
			return true
		}
		
		imgItems.forEach((item, index, arr) => {
			// 判断img高度(底部)是否在屏幕中
			if(isElementViewportTop(item)) {
				delItem(arr, item)
				return false
			} else if (isElementViewportBottom(item))  {
				delItem(arr, item)
				return false
			}
		})
	}
	/**
	 * 去抖
	 * @parma fn {function} 执行的方法
	 * @parma delay {nubmer} 去抖的时间
	 * @parma args {any | object} fn的参数
	 */
	function debounce(fn = function(){}, delay, args) {
		let timer;
		return () => {
			clearTimeout(timer)
			timer = setTimeout(() => {
				fn(args);
			}, delay)
		}
	}
	/**
	 * 节流
	 * @parma fn {function} 执行的方法
	 * @parma delay {nubmer} 节流的时间
	 * @parma args {any | object} fn的参数
	 */
	function throttle(fn = function(){}, delay, args) {
		let times = true;
		return () => {
			if(times) {
				setTimeout(() => {
					fn(args);
					times = true;
				}, delay)
			}
			times = false;
		}
	}
	
	window.jqLoad = {
		lazyLoad: lazyLoad,
		debounce: debounce,
		throttle: throttle
	}
})(window)