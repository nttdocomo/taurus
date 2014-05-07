/**
 * @author nttdocomo
 */
define(function(require){
	i18n = require('../i18n');
	return new i18n({
		locales:[[
		'zh-cn',{
			"Page %d of %d" : "%2$d页中的第%1$d页"
		}]]
	});
});
