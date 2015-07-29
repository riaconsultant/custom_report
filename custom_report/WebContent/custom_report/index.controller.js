sap.ui.controller("custom_report.index", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf custom_report.index
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf custom_report.index
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf custom_report.index
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf custom_report.index
*/
//	onExit: function() {
//
//	}

	createForm:function(url)
	{
		/*if(window.location.href.split("?")[1]=="asn")
		var form=createReport(url,"ASN_INPUT",tabledata);
		else if(window.location.href.split("?")[1]=="bar")
			var form=createReport(url,"BAR_INPUT",tabledata);*/
		
		//tabledata is obtained initially from Oninit initially and when click of search button tabledata is changed.
		//using dummy json data in tabledata now.
		var sKey = window.location.href.split("?")[1];
		switch(sKey){
		case "asn":
			var form=createReport(url,"ASN_INPUT",tabledata);
			break;
		case "bar": 
			var form=createReport(url,"BAR_INPUT",tabledata);
			break;
		case "grn": 
			var form=createReport(url,"GRN_INPUT",tabledata);
			break;
		case "grndesc": 
			var form=createReport(url,"GRN_DESC_INPUT",tabledata);
			break;
		case "otif": 
			var form=createReport(url,"OTIF_INPUT",tabledata);
			break;
		case "qreport": 
			var form=createReport(url,"QUALITY_INPUT",tabledata);
			break;
		case "rreport": 
			var form=createReport(url,"RATING_INPUT",tabledata);
			break;
		case "vreport": 
			var form=createReport(url,"RVENDOR_INPUT",tabledata);
			break;
		case "sreport": 
			var form=createReport(url,"SALES_INPUT",tabledata);
			break;
		case "sohreport": 
			var form=createReport(url,"SOH_INPUT",tabledata);
			break;
		case "ireport": 
			var form=createReport(url,"INVOICE_INPUT",tabledata);
			break;
		case "lreport": 
			var form=createReport(url,"LEDGER_INPUT",tabledata);
			break;
		case "creport": 
			var form=createReport(url,"CREDIT_INPUT",tabledata);
			break;
		case "preport": 
			var form=createReport(url,"PAYMENT_INPUT",tabledata);
			break;
			
			
		}
			
		
		return form;
	}
});