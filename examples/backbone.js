(function(){
	var Model = Backbone.Model.extend(),
	Collection = Backbone.Collection.extend({
		model:Backbone.Model
	}),
	collection = new Collection;
	View = Backbone.View.extend({
		tagName:'table',
		initialize:function(){
			var me = this;
			this.collection.on('add',function(){
				console.log(colleciton)
				console.log(me.collection.map(function(model){
					return '<tr><td>'+model.get('text')+'</td></tr>'
				}).join('|||||'))
				me.$el.html(me.collection.map(function(model){
					return '<tr><td>'+model.get('text')+'</td></tr>'
				}).join(''))
			})
		}
	}),
	view = new View({
		collection:collection
	}),
	input = $('input'),
	button = $('button');
	button.on('click',function(e){
		var text = input.val();
		collection.add({
			text:text
		})
	})
	$('body').append(view.$el)
})()