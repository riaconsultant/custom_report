sap.ui.controller("custom_report.RaiseTicket", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf custom_report.RaiseTicket
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf custom_report.RaiseTicket
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf custom_report.RaiseTicket
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf custom_report.RaiseTicket
*/
//	onExit: function() {
//
//	}
	raiseTicketUi:function(sSelected,obj)
	{
		var oBundle = jQuery.sap.resources({url : "/custom_report/i18n/german.properties", locale: "de"});
		switch(sSelected){
		case "asn":
			var sOutput=oBundle.getText("ASN_OUTPUT");
			////to get the correct data from dummy json. use appropriate data in case of real JSON.
			break;
		case "bar": 
			var sOutput=oBundle.getText("BAR_OUTPUT");
			break;
		case "grn": 
			var sOutput=oBundle.getText("GRN_OUTPUT");
			break;
		case "grndesc": 
			var sOutput=oBundle.getText("GRN_DESC_OUTPUT");
			break;
		case "otif": 
			var sOutput=oBundle.getText("OTIF_OUTPUT");
			break;
		case "qreport": 
			var sOutput=oBundle.getText("QUALITY_OUTPUT");
			break;
		case "rreport": 
			var sOutput=oBundle.getText("RATING_OUTPUT");
			break;
		case "vreport": 
			var sOutput=oBundle.getText("RVENDOR_OUTPUT");
			break;
		case "sreport": 
			var sOutput=oBundle.getText("SALES_OUTPUT");
			break;
		case "sohreport": 
			var sOutput=oBundle.getText("SOH_OUTPUT");
			break;
		case "ireport": 
			var sOutput=oBundle.getText("INVOICE_OUTPUT");
			break;
		case "lreport": 
			var sOutput=oBundle.getText("LEDGER_OUTPUT");
			break;
		case "creport": 
			var sOutput=oBundle.getText("CREDIT_OUTPUT");
			break;
		case "preport": 
			var sOutput=oBundle.getText("PAYMENT_OUTPUT");
			break;
			
			
		}
		debugger;
var aColumnData=sOutput.split(",");
		
		var formTable = new sap.ui.table.Table({
			width:"50%",
			 selectionBehavior:sap.ui.table.SelectionBehavior.Row,
			 selectionMode: sap.ui.table.SelectionMode.None,
				});

			formTable.addColumn(new sap.ui.table.Column({
					
					template: new sap.ui.commons.Label().bindProperty("text", "key"),
				}));
				
			formTable.addColumn(new sap.ui.table.Column({
					
					template: new sap.ui.commons.TextField({
						change:function(){
							debugger;
							var index = this.getParent().getIndex();
							var oTabContext=this.getParent().getParent().getBinding().oList[index];
							//var obj = {};
						//	obj[this.mAssociations.ariaDescribedBy[0]]=this.mProperties.value;
							obj[oTabContext.key]= oTabContext.value;
						}
					}).bindProperty("value", "value"),
				}));
		
			var aResultArr=[];
		/*	var formData = tabledata[0][sSelected][0];
			$.each(formData, function(key, val) {
			    //display the key and value pair
				var sLabel = key.replace(/([a-z])([A-Z])/g, '$1 $2').substr(0, 1).toUpperCase()+key.replace(/([a-z])([A-Z])/g, '$1 $2').substr(1);
			    var obj ={
			key:sLabel,value:""};
			aResultArr.push(obj);
			});*/
			
			var aResultArr=[];
			$.each(aColumnData, function(key, val) {
						    //display the key and value pair
				///Since we are using Column data we are getting key in columndata arrays value.
				var sLabel = val.replace(/([a-z])([A-Z])/g, '$1 $2').substr(0, 1).toUpperCase()+val.replace(/([a-z])([A-Z])/g, '$1 $2').substr(1);
							 var obj ={
						key:sLabel,value:""};
						aResultArr.push(obj);
						});
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({modelData: aResultArr});
			formTable.setModel(oModel);
			formTable.bindRows("/modelData");
		
		
	return formTable;		
	},


});
