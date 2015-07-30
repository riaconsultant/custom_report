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
		          
		        	{key:"asn",process:"ASN"},
		        	{key:"bar",process:"BAR"},
		        	{key:"grn",process:"GRN"},
		        	{key:"grndesc",process:"GRN Descripency"},
		        	{key:"otif",process:"OTIF"},
		        	{key:"qreport",process:"Quality REPORT"},
		        	{key:"rreport",process:"Rating REPORT"},
		        	{key:"return",process:"Return to Vendor"},
		        	{key:"sales",process:"Sales"},
		        	{key:"soh",process:"SOH"},
		        	{key:"invoice",process:"Invoice"},
		        	{key:"ledger",process:"Ledger"},
		        	{key:"credit",process:"Credit/Debit"},
		        	{key:"payment",process:"Payment"}
		        	
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