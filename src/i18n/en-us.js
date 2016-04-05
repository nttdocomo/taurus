/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory();
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory();
	}
}(this, function(){
	return {
		"Page %d of %d" : "%2$d页中的第%1$d页",
		"Cancel" : "取消",
		"Confirm" : "确定",
		/*==date translate==*/
		"Sunday":"星期天",
		"Monday":"星期一",
		"Tuesday":"星期二",
		"Wednesday":"星期三",
		"Thursday":"星期四",
		"Friday":"星期五",
		"Saturday":"星期六",
		"Sun":"周日",
		"Mon":"周一",
		"Tue":"周二",
		"Wed":"周三",
		"Thu":"周四",
		"Fri":"周五", 
		"Sat":"周六",
		"Su":"日",
		"Mo":"一",
		"Tu":"二",
		"We":"三",
		"Th":"四",
		"Fr":"五",
		"Sa":"六",
		"January":"一月",
		"February":"二月",
		"March":"三月",
		"April":"四月",
		"May":"五月",
		"June":"六月",
		"July":"七月",
		"August":"八月",
		"September":"九月",
		"October":"十月",
		"November":"十一月",
		"December":"十二月",
		"Jan":"一",
		"Feb":"二",
		"Mar":"三",
		"Apr":"四",
		"May":"五",
		"Jun":"六",
		"Jul":"七",
		"Aug":"八",
		"Sep":"九",
		"Oct":"十",
		"Nov":"十一",
		"Dec":"十二"
	}
}));