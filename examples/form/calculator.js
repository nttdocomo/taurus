/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/form/field/text.js"),
		Number = require("../../src/form/field/number.js");
		Combobox = require("../../src/form/field/comboBox.js");
	var $body = $("#main"),
	tax_start = 3500;
	var collection = new Backbone.Collection([{
		name : "全部薪资",
		value : 0
	}, {
		name : "薪资一半",
		value : 1
	}, {
		name : "最低标准",
		value : 2521
	}])
	function get_value(income, basic){
		var housing_fund = income * 12/100,
		pension_insurance = basic * 8/100,
		medical_insurance = basic * 2/100,
		unemployment_insurance = basic * 0.5/100,
		before_tax = income - housing_fund - pension_insurance - medical_insurance - unemployment_insurance,
		taxable_income = before_tax - tax_start;
		var tax_rate = 0,
		quick_deduction = 0;
		if(taxable_income > 1500 && taxable_income <= 4500){
			tax_rate = 10/100;
			quick_deduction = 105;
		}
		if(taxable_income > 4500 && taxable_income <= 9000){
			tax_rate = 20/100;
			quick_deduction = 555;
		}
		if(taxable_income > 9000 && taxable_income <= 35000){
			tax_rate = 25/100;
			quick_deduction = 1005;
		}
		console.log(before_tax)
		console.log(taxable_income)
		var tax = taxable_income * tax_rate - quick_deduction,
		after_tax_income = before_tax - tax,
		company_pay = income + housing_fund + basic * 20/100 + basic * 10/100 + basic * 1.5/100 + basic * 0.8/100;
		/*计算养老金*/
		console.log(5223*5223/after_tax_income);
		var base_pension = (5223 + 5223*basic/5223)+2*40*0.01,//(5223 + 5223*5223/after_tax_income)+2*40*1%,
		pension = base_pension + pension_insurance * 40 * 12/139;
		$('#housing_fund').data('component').setValue(housing_fund)
		$('#pension_insurance').data('component').setValue(pension_insurance)
		$('#medical_insurance').data('component').setValue(medical_insurance)
		$('#unemployment_insurance').data('component').setValue(unemployment_insurance)
		$('#tax').data('component').setValue(tax)
		$('#after_tax').data('component').setValue(after_tax_income)
		$('#company_pay').data('component').setValue(company_pay)
		$('#pension').data('component').setValue(pension)
	}
	var income = new Number({
		renderTo : $body,
		name : 'income',
		labelWidth:150,
		width:200,
		minValue : 1000,
		maxValue : 1000000,
		id:'income',
		fieldLabel : '税前收入：',
		listeners:{
			'change':function(newVal, oldVal){
				get_value(newVal,newVal)
				collection.reset([{
					name : "全部薪资",
					value : newVal
				}, {
					name : "薪资一半",
					value : newVal/2
				}, {
					name : "最低标准",
					value : 2521
				}],{silent:true})
			}
		}
	})
	var comboBox = new Combobox({
		renderTo : $body,
		name : 'textfield1',
		id:'textfield1',
		labelWidth:150,
		width:200,
		displayField: 'name',
		displayField: 'name',
		fieldLabel : '缴费基数：',
		collection:collection,
		listeners:{
			'select':function(record){
				get_value($('#income').data('component').getValue(),record.get('value'))
			}
		}
	});
	var housing_fund = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'housing_fund',
		width:200,
		id:'housing_fund',
		fieldLabel : '缴住房公积金：'
	})
	var pension_insurance = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'pension_insurance',
		width:200,
		id:'pension_insurance',
		fieldLabel : '缴养老保险：'
	})
	var medical_insurance = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'medical_insurance',
		width:200,
		id:'medical_insurance',
		fieldLabel : '缴医疗保险：'
	})
	var unemployment_insurance = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'unemployment_insurance',
		width:200,
		id:'unemployment_insurance',
		fieldLabel : '缴失业保险：'
	})
	var tax = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'tax',
		width:200,
		id:'tax',
		fieldLabel : '缴个人所得税：'
	})
	var after_tax = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'after_tax',
		width:200,
		id:'after_tax',
		fieldLabel : '税后个人所得：'
	})
	var company_pay = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'company_pay',
		width:200,
		id:'company_pay',
		fieldLabel : '公司实际支出：'
	})
	var pension = new Text({
		renderTo : $body,
		labelWidth:150,
		name : 'pension',
		width:200,
		id:'pension',
		fieldLabel : '养老金：'
	})
	/*new Combobox({
		renderTo : $body,
		name : 'textfield2',
		id:'textfield2',
		width:200,
		displayField: 'name',
		fieldLabel : 'city',
		collection:new Backbone.Collection()
	});*/
})