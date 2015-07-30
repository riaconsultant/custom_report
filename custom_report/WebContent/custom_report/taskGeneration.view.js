sap.ui.jsview("custom_report.taskGeneration", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf readproperties.TaskGeneration
	*/ 
	getControllerName : function() {
		return "custom_report.taskGeneration";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf readproperties.TaskGeneration
	*/ 
	createContent : function(oController) {
		var formLayout=oController.taskUi(aDialTabledata);
		
		    var oTextArea = new sap.ui.commons.TextArea({
		    	rows:3,width:"400px",required:true,change:function(){
		    		this.setValueState(sap.ui.core.ValueState.Success);
		    	}
		    });
		    
		    var oLabel = new sap.ui.commons.Label({
		    	text:"Comment"
		    }).setLabelFor(oTextArea);
		    
		    var oTicketHlayout = new sap.ui.commons.layout.HorizontalLayout({
				//height : "300px",
				width : "100%",
				content:[oLabel,oTextArea]
			    });
		
		var oSearchButton = new sap.ui.commons.Button({text:"Accept",press:function(){
			
			if(!oTextArea.getValue()){
				
				oTextArea.setValueState(sap.ui.core.ValueState.Error);
				sap.ui.commons.MessageBox
				.alert(
						"Please Input Comments",
						"",
						"Error");
				
			}
			else{
				///Service call to Approve
			}
			//oTable.setModel(oResultModel);
			//Service call to happen.
			
		}});
		
		var oCancelButton = new sap.ui.commons.Button({text:"Reject",press:function(){
if(!oTextArea.getValue()){
				
				oTextArea.setValueState(sap.ui.core.ValueState.Error);
				sap.ui.commons.MessageBox
				.alert(
						"Please Input Comments",
						"",
						"Error");
				
			}
else{
	//Service call to Reject
}
		}});
		
		   var oButtonToolbar= new sap.ui.commons.Toolbar({
	  			//width: "59%",
	  			visible:true
	  		});
		    oButtonToolbar.addItem(oSearchButton);
		    oButtonToolbar.addItem(oCancelButton);
		
		
	    var oMemoVlayout = new sap.ui.commons.layout.VerticalLayout({
			height : "100%",
			width : "100%",
			content:[formLayout,oTicketHlayout,oButtonToolbar]
		});				 
	    return oMemoVlayout;

		
//		return formLayout;
	}

});