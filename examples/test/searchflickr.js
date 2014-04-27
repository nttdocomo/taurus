define(function() {
	function searchfli() {
		var self = this;
		$.ajax({
			url : "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=91a0dcefdb85e3bddd087ab522d3c9e8&tagmode=any&tags=aaa&page=1&format=json&jsoncallback=?",
			type : 'GET',
			dataType : 'JSONP',
			timeout : 10000,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (textStatus == "timeout") {
					init.picwrap.html("搜索数据超时，请优化检索条件！");
				}
				return false;
			},
			success : self.render
		});
	};

	searchfli.prototype.render = function(data) {
		
		alert(JSON.stringify(data));
		//html1="<a href="+data.link+" target='_blank'>"+data.title+"</a>"+"加载完成"+"最后修改"+data.modified;

		if (data == undefined || data == null || data == '') {
			return false;
		} else {
			//return(false);
			alert(data);
			var k = data.photos.photo;

		}

		if (k == undefined || k == null || k == 0) {
			init.picwrap.html("找不到您相要的图片，将跳转到google搜索！");
			init.searchSite = "searchgoogle";
			$("#searchgoogle").attr("checked", true);
			var rungoo = new searchgoogle(init);
			rungoo.render
			return false;
		} else {
			for ( i = 0; i < 15; i++) {
				var item = data.photos.photo[i];
				var pic_url = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_t.jpg";

				var re = /_[a-z].jpg/;
				// http://farm7.static.flickr.com/6196/6148999201_89c6fe62fd_m.jpg
				var pic_url_cut = ".jpg";
				pic_url_cut = pic_url.replace(re, pic_url_cut);

				//给输出数组
				init.photodata[i] = [];
				init.photodata[i]["spic"] = pic_url;
				init.photodata[i]["bpic"] = pic_url_cut;
			};

			//输出dom到页面
			var dth = new DTH(init.photodata);
		}
	}
	new searchfli()
	return searchfli
})