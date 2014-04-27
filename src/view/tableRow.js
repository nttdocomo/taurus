/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	var TableCell = require('./tableCell');
	taurus.augmentString('taurus.templates.views.tablerow', '');
	return taurus.view('taurus.views.TableRow',Base.extend({
		tagName:'tr',
		afterRender:function(){
			var me = this,data = me.model.toJSON(),html = [];
			/*_.each(this.columns,function(column,i){
				me.$el.append((new TableCell({
					model:me.model,
					column:column
				})).render().$el)
			})*/
			var data = me.model.toJSON()
			_.each(this.columns,function(column,i){
				html.push((new TableCell({
					column:column
				})).html(data))
			})
			me.$el.html(html.join(''))
			this.$el.attr('data-item-id',this.model.id);
			//this.model.on('change',this.html,this)
			/*return Base.prototype.html.call(this,{
				'html':this.columns.map(function(column,i){
					console.log(arguments)
					return (new TableCell({
						model:me.model,
						column:column
					})).html()
				}).join('')
			})*/
		}
	}))
})
