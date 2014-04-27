/**
 * @author nttdocomo
 */
seajs.config({
	alias : {
		'jquery' : 'jquery.min',
		'backbone' : 'backbone',
		'underscore' : 'underscore'
	},
	base : 'http://battle.ship.com/src/',
	charset : 'utf-8'
});
TestCase("TemplateTest", {
	testTemplateDefine : function() {
		seajs.use("http://battle.ship.com/src/taurus.js", function() {
			taurus.augmentString('taurus.templates.test.template','<input<% if(typeof(id)!=="undefined"){ %> id="<%=id%>"<%}%> type="<%=type%>"<% if(typeof(name)!=="undefined"){ %> name="<%=name%>"<%}%><% if(typeof(value)!=="undefined"){ %> value="<%=value%>"<%}%><% if(typeof(placeholder)!=="undefined"){ %> placeholder="{placeholder}"<%}%><% if(typeof(maxlength)!=="undefined"){ %> maxlength="{maxLength}"<%}%><% if(typeof(readonly)!=="undefined"){ %> readonly="readonly"<%}%><% if(typeof(disabled)!=="undefined"){ %> disabled="disabled"<%}%><% if(typeof(tabIndex)!=="undefined"){ %> tabIndex="{tabIdx}"<%}%><% if(typeof(fieldStyle)!=="undefined"){ %> style="{fieldStyle}"<%}%> class="<%=fieldCls%> <%=typeCls%> <%=editableCls%>" autocomplete="off"/>');
			taurus.view("taurus.test.Template",Backbone.View.extend({}));
			taurus.view("taurus.test.SubTemplate",taurus.test.Template.extend({}));
			assertEquals("it's the same template", taurus.test.Template._template, taurus.templates.test.template);
			assertEquals("it's the same template", taurus.test.SubTemplate._template, taurus.templates.test.template);
			assertNotUndefined("template is defined", taurus.test.Template._template)
			assertString("template is string", taurus.test.Template._template)
		})
	}
});
