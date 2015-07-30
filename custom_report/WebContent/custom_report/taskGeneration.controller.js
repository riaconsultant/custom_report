sap.ui.controller("custom_report.taskGeneration", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf readproperties.TaskGeneration
*/
	onInit: function() {
//		var formData=data.taskUIArray;
//		var formModel=new sap.ui.model.json.JSONModel (formData);
//		this.getView().setModel(formModel);
//			var layout=createTaskUI(formModel);
//			sap.ui.getCore().byId("app").placeAt(layout);
			
		
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf readproperties.TaskGeneration
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf readproperties.TaskGeneration
*/
	onAfterRendering: function() {
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf readproperties.TaskGeneration
*/
//	onExit: function() {
//
//	}
	taskUi:function(aDialTabledata)
	{
		
		//When service is ready get formData this from OnInit after passing the task_id and fetching the data from services.
		var formData=aDialTabledata;
		if(formData.length==1){
			var formData =$.extend({}, formData[0]);
		}
		//var formData=tabledata;
		var formModel=new sap.ui.model.json.JSONModel (formData);
		this.getView().setModel(formModel);
			var layout=createTaskUI(formModel);
		return layout;
	}

});