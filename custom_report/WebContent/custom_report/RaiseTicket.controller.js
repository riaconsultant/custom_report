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
			var formData = tabledata[0][sSelected][0];
			$.each(formData, function(key, val) {
			    //display the key and value pair
				var sLabel = key.replace(/([a-z])([A-Z])/g, '$1 $2').substr(0, 1).toUpperCase()+key.replace(/([a-z])([A-Z])/g, '$1 $2').substr(1);
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
