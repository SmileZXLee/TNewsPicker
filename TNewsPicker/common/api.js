import request from '@/common/request.js'
const api = {}

api.getVisitPage = function(url,callback){
	request.publicRequest(url,'GET',null,'加载中...').then(res => {
		var newestIdReg = 'newestId":"(.*?)"';
		var newestIds = res.match(newestIdReg);
		var titleReg = '<title>(.*?)</title>';
		var titles = res.match(titleReg);
		var title = '无标题';
		if(titles.length > 1){
			title = titles[1];
		}
		var detailUrl = 'https://wxn.qq.com/cmsid/' + newestIds[1];
		detailUrl = detailUrl.replace('"','').replace(/[\\]/g,'');
		getPageDetail(detailUrl,title,callback);			
	}).catch(res => {
	　　uni.showToast({
			title: '数据解析失败:' + res,
			icon: 'none'
		})
	})
}

function getPageDetail(url,title,callback){
	request.publicRequest(url,'GET',null,'解析中').then(res => {
		var vidReg = 'vid":"(.*?)"';
		var vids = res.match(vidReg);
		var vid = '';
		vid = vids[1].replace('"','').replace(/[\\]/g,'');
		callback('http://ugcyd.qq.com/'+vid+'.mp4',title);
	}).catch(res => {
	　　uni.showToast({
			title: '数据解析失败:' + res,
			icon: 'none'
		})
	})
}

export default api