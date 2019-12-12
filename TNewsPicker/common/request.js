const request = {}
    
request.publicRequest = (url, method, data, loadingStr) => {
    var header = {}; 
    if(method == 'POST'){
		var postData = {};
		postData['data'] = JSON.stringify(data);
		data = postData;
	}
	if(loadingStr){
		uni.showLoading({
			title: loadingStr
		});
	}
    return uni.request({
        url: url,
        method: method,
        data: data,
        header: header
    }).then(res => {
		uni.hideLoading();
		return res[1].data;
    }).catch(parmas => {
		uni.hideLoading();
　　　　　uni.showToast({
　　　　　　　title: parmas.errmsg ? parmas.errmsg : '解析失败',
　　　　　　　icon: 'none'
　　　　　})　
　　})
 }
  
  export default request