/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return taurus.view('taurus.views.TableHeader',Base.extend({
		tagName:'thead',
		tpl:'<tr><%=head%></tr>',
		html:function(){
			var html = [];
			_.each(this.items,function(column){
				html.push(_.template('<th><%=text%></th>',{
					width:column.text.width,
					text:column.text
				}))
			});
			return Base.prototype.html.apply(this,[{head:html.join('')}])
		}
	}))
})
