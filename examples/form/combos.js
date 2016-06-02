/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require("backbone");
	var chance = require('chance');
	var ComboBox = require("../../src/classic/form/field/comboBox"),
	Button = require("../../src/classic/button/button"),
	$body = $("#main"), data_with_src=[],states = [{
		"abbr" : "AL",
		"name" : "Alabama",
		"slogan" : "The Heart of Dixie"
	}, {
		"abbr" : "AK",
		"name" : "Alaska",
		"slogan" : "The Land of the Midnight Sun"
	}, {
		"abbr" : "AZ",
		"name" : "Arizona",
		"slogan" : "The Grand Canyon State"
	}, {
		"abbr" : "AR",
		"name" : "Arkansas",
		"slogan" : "The Natural State"
	}, {
		"abbr" : "CA",
		"name" : "California",
		"slogan" : "The Golden State"
	}, {
		"abbr" : "CO",
		"name" : "Colorado",
		"slogan" : "The Mountain State"
	}, {
		"abbr" : "CT",
		"name" : "Connecticut",
		"slogan" : "The Constitution State"
	}, {
		"abbr" : "DE",
		"name" : "Delaware",
		"slogan" : "The First State"
	}, {
		"abbr" : "DC",
		"name" : "District of Columbia",
		"slogan" : "The Nation's Capital"
	}, {
		"abbr" : "FL",
		"name" : "Florida",
		"slogan" : "The Sunshine State"
	}, {
		"abbr" : "GA",
		"name" : "Georgia",
		"slogan" : "The Peach State"
	}, {
		"abbr" : "HI",
		"name" : "Hawaii",
		"slogan" : "The Aloha State"
	}, {
		"abbr" : "ID",
		"name" : "Idaho",
		"slogan" : "Famous Potatoes"
	}, {
		"abbr" : "IL",
		"name" : "Illinois",
		"slogan" : "The Prairie State"
	}, {
		"abbr" : "IN",
		"name" : "Indiana",
		"slogan" : "The Hospitality State"
	}, {
		"abbr" : "IA",
		"name" : "Iowa",
		"slogan" : "The Corn State"
	}, {
		"abbr" : "KS",
		"name" : "Kansas",
		"slogan" : "The Sunflower State"
	}, {
		"abbr" : "KY",
		"name" : "Kentucky",
		"slogan" : "The Bluegrass State"
	}, {
		"abbr" : "LA",
		"name" : "Louisiana",
		"slogan" : "The Bayou State"
	}, {
		"abbr" : "ME",
		"name" : "Maine",
		"slogan" : "The Pine Tree State"
	}, {
		"abbr" : "MD",
		"name" : "Maryland",
		"slogan" : "Chesapeake State"
	}, {
		"abbr" : "MA",
		"name" : "Massachusetts",
		"slogan" : "The Spirit of America"
	}, {
		"abbr" : "MI",
		"name" : "Michigan",
		"slogan" : "Great Lakes State"
	}, {
		"abbr" : "MN",
		"name" : "Minnesota",
		"slogan" : "North Star State"
	}, {
		"abbr" : "MS",
		"name" : "Mississippi",
		"slogan" : "Magnolia State"
	}, {
		"abbr" : "MO",
		"name" : "Missouri",
		"slogan" : "Show Me State"
	}, {
		"abbr" : "MT",
		"name" : "Montana",
		"slogan" : "Big Sky Country"
	}, {
		"abbr" : "NE",
		"name" : "Nebraska",
		"slogan" : "Beef State"
	}, {
		"abbr" : "NV",
		"name" : "Nevada",
		"slogan" : "Silver State"
	}, {
		"abbr" : "NH",
		"name" : "New Hampshire",
		"slogan" : "Granite State"
	}, {
		"abbr" : "NJ",
		"name" : "New Jersey",
		"slogan" : "Garden State"
	}, {
		"abbr" : "NM",
		"name" : "New Mexico",
		"slogan" : "Land of Enchantment"
	}, {
		"abbr" : "NY",
		"name" : "New York",
		"slogan" : "Empire State"
	}, {
		"abbr" : "NC",
		"name" : "North Carolina",
		"slogan" : "First in Freedom"
	}, {
		"abbr" : "ND",
		"name" : "North Dakota",
		"slogan" : "Peace Garden State"
	}, {
		"abbr" : "OH",
		"name" : "Ohio",
		"slogan" : "The Heart of it All"
	}, {
		"abbr" : "OK",
		"name" : "Oklahoma",
		"slogan" : "Oklahoma is OK"
	}, {
		"abbr" : "OR",
		"name" : "Oregon",
		"slogan" : "Pacific Wonderland"
	}, {
		"abbr" : "PA",
		"name" : "Pennsylvania",
		"slogan" : "Keystone State"
	}, {
		"abbr" : "RI",
		"name" : "Rhode Island",
		"slogan" : "Ocean State"
	}, {
		"abbr" : "SC",
		"name" : "South Carolina",
		"slogan" : "Nothing Could be Finer"
	}, {
		"abbr" : "SD",
		"name" : "South Dakota",
		"slogan" : "Great Faces, Great Places"
	}, {
		"abbr" : "TN",
		"name" : "Tennessee",
		"slogan" : "Volunteer State"
	}, {
		"abbr" : "TX",
		"name" : "Texas",
		"slogan" : "Lone Star State"
	}, {
		"abbr" : "UT",
		"name" : "Utah",
		"slogan" : "Salt Lake State"
	}, {
		"abbr" : "VT",
		"name" : "Vermont",
		"slogan" : "Green Mountain State"
	}, {
		"abbr" : "VA",
		"name" : "Virginia",
		"slogan" : "Mother of States"
	}, {
		"abbr" : "WA",
		"name" : "Washington",
		"slogan" : "Green Tree State"
	}, {
		"abbr" : "WV",
		"name" : "West Virginia",
		"slogan" : "Mountain State"
	}, {
		"abbr" : "WI",
		"name" : "Wisconsin",
		"slogan" : "America's Dairyland"
	}, {
		"abbr" : "WY",
		"name" : "Wyoming",
		"slogan" : "Like No Place on Earth"
	}], collection = new Backbone.Collection(states), comboBox = new ComboBox({
		renderTo : $body,
		queryMode : 'local',
		name : 'textfield1',
		id : 'textfield1',
		displayField : 'name',
		fieldLabel : 'country',
		emptyText:'aaaaa',
		value:"AK",
		valueField : 'abbr',
		width:250,
		collection : collection
	});
	types = ['abstract','animals','business','cats','city','food','nightlife','fashion','people','nature','sports','technics','transport']
	for (var i = chance.natural({min: 1, max: 20}); i >= 0; i--) {
		data_with_src.push({
			"src":'http://lorempixel.com/20/20/'+[types[chance.natural({min: 0, max: 12})],chance.natural({min: 1, max: 10})].join('/'),
			"name" : chance.word(),
			"value" : chance.word({length: 5})
		})
	};http://lorempixel.com/output/sports-q-c-640-480-6.jpg
	var city = new ComboBox({
		renderTo : $body,
		name : 'textfield2',
		id : 'textfield2',
		queryMode : 'local',
		displayField : 'name',
		fieldLabel : 'image',
		multiSelect : true,
		valueField : 'value',
		listConfig:{
			emptyText:'手欠了吧23333',
			lazyload:true,
			getInnerTpl:function(displayField){
				console.log(this)
				return '<a href="#"><%if(item.src){%><img class="lazy" '+(this.lazyload ?' data-original':'src') +'="<%=item.src%>" height="20" width="20"> <%}%><%=item.' + displayField + '%></a>';
			}
		},
		width:250,
		collection : new Backbone.Collection(data_with_src)
	});
	new ComboBox({
		renderTo : $body,
		name : 'textfield2',
		id : 'textfield2',
		queryMode : 'local',
		displayField : 'name',
		fieldLabel : 'city',
		multiSelect : true,
		value : ['AK','WA'],
		valueField : 'abbr',
		width:250,
		collection : collection
	});
	new ComboBox({
		renderTo : $body,
		name : 'textfield3',
		id : 'textfield3',
		queryMode : 'local',
		width : 250,
		displayField : 'name',
		emptyText:'aaaaa',
		valueField : 'abbr',
		fieldLabel : 'city',
		collection : collection
	});
	new ComboBox({
		renderTo : $body,
		editable : false,
		name : 'textfield4',
		id : 'textfield4',
		queryMode : 'local',
		width : 250,
		multiSelect : true,
		displayField : 'name',
		valueField : 'abbr',
		fieldLabel : 'city',
		collection : collection
	});
	new Button({
		renderTo : $body,
		text:'Clear Value',
		handler:function(){
			city.setValue(null)
		}
	})
}); 