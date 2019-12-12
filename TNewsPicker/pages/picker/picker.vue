<template>
	<view class="picker">
		<!--  #ifdef  H5 -->
		<view class="warn">
			<text>因跨域限制，web模式下可能不可用</text>
		</view>
		<!--  #endif -->
		<image src="../../static/logo.png" class="iconImg"></image>
		<view class="inputContainer">
			<input type="text" class="urlInput main-text-color" placeholder="请输入新闻链接" v-model="urlInputValue" ref="urlInput" :focus="urlInputFocus">
			<image src="../../static/clear_icon.png" class="cleanImg" v-if="urlInputValue.length" @click="inputCleanClick"></image>
			<view class="getBtn main-bac-color" @click="getBtnClick">提取</view>
		</view>
		<view class="detail" v-if="vedioSrc.length">
			<view class="title main-text-color">{{title}}</view>
			<view class="linkContainer" @longpress="copyLinkAction">
				<view class="linkTitle main-bac-color">视频地址</view>
				<text class="linkText" :selectable="true">{{vedioSrc}}</text>
			</view>
			<video :src="vedioSrc" class="outputVedio"></video>
			
		</view>
		<view class="copyRight" @click="copyRightClick"><image src="../../static/git.png"></image><text class="main-text-color">Visit github</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlInputValue: '',
				urlInputFocus: true,
				title: '',
				vedioSrc: '',
				link: ''
			}
		},
		methods: {
			inputCleanClick(){
				this.urlInputValue = '';
				this.urlInputFocus = true;
			},
			getBtnClick(){
				if(!this.urlInputValue.length){
					return;
				}
				var $this = this;
				this.$api.getVisitPage(this.urlInputValue,function(vedioSrc,title){
					$this.vedioSrc = vedioSrc;
					$this.title = title;
				})
			},
			copyLinkAction(){
				if(!this.vedioSrc.length)return;
				// #ifndef H5
					uni.setClipboardData({
					    data: this.vedioSrc,
					    success: function () {
					        uni.showToast({
					        	title: '已复制到剪切板',
					        	icon: 'none'
					        })
					    }
					});
				// #endif
			},
			copyRightClick(){
				var copyRightUrl = 'https://blog.qian-hong.com';
				// #ifndef H5
					plus.runtime.openURL(copyRightUrl);
				// #endif
				// #ifdef H5
					window.location.href = copyRightUrl;
				// #endif
				
			}
		},
		onShow: function(){
			var $this = this;
			// #ifndef H5
				uni.getClipboardData({
				    success: function (res) {
						if(res.data && res.data.indexOf('view.inews.qq.com') != -1){
							if($this.urlInputValue != res.data){
								$this.urlInputValue = res.data;
								uni.showToast({
									title: '自动填充完成',
									icon: 'none'
								})
							}
						}
				    }
				});
			// #endif
			
		}
	}
</script>

<style scoped>
	.picker{
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 30rpx;
	}
	
	.warn{
		width: 100%;
		height: 80rpx;
		background-color: rgba(255,0,0,0.1);
		color: red;
		display: flex;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	input{
		font-size: 30rpx;
	}
	.iconImg{
		width: 200rpx;
		height: 200rpx;
		margin-top: 100rpx;
	}
	.inputContainer{
		margin-top: 40rpx;
		width: calc(100% - 60rpx);
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
	}
	.cleanImg{
		position: absolute;
		width: 25rpx;
		height: 25rpx;
		margin-top: calc((70rpx - 25rpx) / 2);
		right: calc(120rpx + 30rpx + 20rpx);
	}
	.getBtn{
		width: 120rpx;
		height: 100%;
		text-align: center;
		border-radius: 5rpx;
	}
	.urlInput{
		height: 100%;
		flex: 1;
		padding: 0px 60rpx 0px 10rpx ;
		border-bottom: #13227A solid 1px;
	}
	.outputVedio{
		margin-top: 10rpx;
		width: calc(100% - 20rpx);
		height: 440rpx;
	}
	.detail{
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title{
		width: calc(100% - 60rpx);
		padding: 20rpx;
		background-color: #13227A;
		color: white;
		border-radius: 5rpx;
	}
	.linkContainer{
		width: calc(100% - 20rpx);
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		margin-top: 10rpx;
		border-radius: 5rpx;
	}
	.linkTitle{
		width: 140rpx;
		height: 100%;
		text-align: center;
		font-size: 28rpx;
	}
	.linkText{
		height: 100%;
		color: #555555;
		flex: 1;
		padding: 0px 10rpx 0px 10rpx;
		background: rgba(4,155,251,0.1);
	}
	.copyRight{
		width: 100%;
		position: absolute;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		bottom: 20rpx;
		justify-content: center;
		height: 50rpx;
	}
	.copyRight>image{
		width: 30rpx;
		height: 30rpx;
	}
	.copyRight>text{
		margin-left: 10rpx;
	}
</style>
