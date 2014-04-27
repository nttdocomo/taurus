/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	require("backbone-relational");
	var ModelB = Backbone.RelationalModel.extend()
	var ModelA = Backbone.RelationalModel.extend({
		relations: [{
			type: Backbone.HasMany,
			key: 'player',
			relatedModel: ModelB,
			collectionType: Backbone.Collection,
			reverseRelation: {
				key: 'club'
				// 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
			}
		},{
			type: Backbone.HasMany,
			key: 'key1',
			relatedModel: ModelB,
			collectionType: Backbone.Collection
		},{
			type: Backbone.HasMany,
			key: 'key2',
			relatedModel: ModelB,
			collectionType: Backbone.Collection
		}]
	})
	console.log(new ModelA({
		"player":[1,2,3,4],
		"key1":[{
			id:1,
			name:"name1"
		},{
			id:2,
			name:"name2"
		},{
			id:4,
			name:"name4"
		}],
		"key2":[{
			id:2,
			name:"name2"
		},{
			id:3,
			name:"name3"
		},{
			id:4,
			name:"name4"
		}]
	}))
})