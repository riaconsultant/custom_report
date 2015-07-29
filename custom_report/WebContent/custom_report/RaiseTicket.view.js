sap.ui.jsview("custom_report.RaiseTicket", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf custom_report.RaiseTicket
	*/ 
	getControllerName : function() {
		return "custom_report.RaiseTicket";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf custom_report.RaiseTicket
	*/ 
	createContent : function(oController) {
 		var aFormData=[];
 		var obj={};
 		var oProcessLabel = new sap.ui.commons.Label({
 			text:"Select Process"
 		});
		oProcessCombo = new sap.ui.commons.ComboBox("idProcessCombo",{
			change:function(){
				debugger;
				var sSelected = this.mProperties.selectedKey;
					obj={};	
				  	oMemoVlayout.removeAllContent();
				  	formLayout=oController.raiseTicketUi(sSelected,obj);
				    oMemoVlayout.addContent(oComboToolbar);
				    oMemoVlayout.addContent(formLayout);
				    oMemoVlayout.addContent(oButtonToolbar);
			}
			
		});
 		
	    oComboToolbar= new sap.ui.commons.Toolbar({
			//width: "59%",
			visible:true
		});
	    oComboToolbar.addItem(oProcessLabel);
	    oComboToolbar.addItem(oProcessCombo);
 		
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
		       processes : [
		          
		        	{key:"ASN",process:"ASN"},
		        	{key:"BAR",process:"BAR"},
		        	{key:"GRN",process:"GRN"},
		        	{key:"GRNDesc",process:"GRN Descripency"},
		        	{key:"OTIF",process:"OTIF"},
		        	{key:"QREPORT",process:"Quality REPORT"},
		        	{key:"RREPORT",process:"Rating REPORT"},
		        	{key:"RETURN",process:"Return to Vendor"},
		        	{key:"SALES",process:"Sales"},
		        	{key:"SOH",process:"SOH"},
		        	{key:"INVOICE",process:"Invoice"},
		        	{key:"LEDGER",process:"Ledger"},
		        	{key:"CREDIT",process:"Credit/Debit"},
		        	{key:"PAYMENT",process:"Payment"}
		        	
		               ]
		});
		oProcessCombo.setModel(oModel);
		var oItemTemplate1 = new sap.ui.core.ListItem();
		oItemTemplate1.bindProperty("text", "process");
		oItemTemplate1.bindProperty("key", "key");
		oItemTemplate1.bindProperty("enabled", "enabled");
		oProcessCombo.bindItems("/processes", oItemTemplate1);
		
	 

	var oRaiseButton = new sap.ui.commons.Button({text:"Raise Ticket",press:function(){
		debugger;
		tabledata[0][oProcessCombo.mProperties.selectedKey].push(obj);
		
	}});



	    oButtonToolbar= new sap.ui.commons.Toolbar({
				//width: "59%",
				visible:true
			});
	    oButtonToolbar.addItem(oRaiseButton);
		

     oMemoVlayout = new sap.ui.commons.layout.VerticalLayout({
		height : "100%",
		width : "100%",
		content:[oComboToolbar]
	});				 
    return oMemoVlayout;

	
		
	}

});