const glabolConfig = {
	src: 'data-src',
	srcset: 'data-srcset'
}
;(function(window, glabolConfig) {
	class LazyLoad{
		constructor(images, options = {}, glabolConfig) {
			this.setting = Object.assign({}, glabolConfig, options)
			this.images = images
			this.observer = null
			this.init()
		}
		init() {
			/**
			 * root 视图节点，null时默认为body（应该是）
			 * rootMargin 根元素的margin
			 * threshold 属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数
			 */
			let observerConfig = {
				root: null,
				rootMargin: '0px',
				threshold: [0.2]
			}
			// 生成IntersectionObserver实例
			this.observer = this.intersectionObserver(observerConfig)
			// 将图片进行监听
			this.images.forEach(image => this.observer.observe(image))
		}
		intersectionObserver(config) {
			return new IntersectionObserver(entries => {
				entries.forEach(entry => {
				  const target = entry.target
				  // 到元素出现在视图中
				  if(entry.intersectionRatio > 0) {
						this.observer.unobserve(target)
						// 设置img真实src路径
						this.setImgsrc(target)
				  }
				})
			}, config)
		}
		setImgsrc(target){
			const src = target.getAttribute(this.setting.src)
			const srcset = target.getAttribute(this.setting.srcset)
			// 判断是否为img节点
			if('IMG' === target.tagName) {
				if(src) {
					target.src = src
				}
				if(srcset) {
					target.srcset = srcset
				}
			}else {
				target.style.backgroundImage = `url(${src})`
			}
		}
	}
	window.lazyLoad = (images, options = {}) =>{
		return new LazyLoad(images, options, glabolConfig)
	}
})(window, glabolConfig);