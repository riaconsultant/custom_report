jQuery.sap.require("jquery.sap.resources");
function createTaskUI(formModel) {
	var verticalLayout = new sap.ui.layout.VerticalLayout({

	});
	// make dynamic
	var formData = formModel.getData();
	//var formData = formModel.getData()[0].ASN;
	

var formTable = new sap.ui.table.Table("formTable",{
width:"50%"
	
	});

formTable.addColumn(new sap.ui.table.Column({
		
		template: new sap.ui.commons.Label().bindProperty("text", "key"),
	}));
	
formTable.addColumn(new sap.ui.table.Column({
		
		template: new sap.ui.commons.TextField().bindProperty("value", "value"),
	}));

	if (formData.constructor === Object)
	{
		var form = crateFields(formData,formTable);

		verticalLayout.addContent(form);
	} 
	else if (formData.constructor === Array) {
		var columnData = Object.keys(formData[0]);
		// table dynamic creation
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			columns : columnData,
			rows : formData
		});
		var oTable = new sap.ui.table.Table({
			selectionBehavior : sap.ui.table.SelectionBehavior.Row,
			selectionMode : sap.ui.table.SelectionMode.Single,			
			visibleRowCount:5,

			rowSelectionChange : function(oEvt) {
				var index=oEvt.oSource.getSelectedIndex();
				var fieldData=this.getModel().getData().rows[index];
				
				var form=crateFields(fieldData,formTable);
				verticalLayout.addContent(form);
				
			}

		});

		oTable.setWidth("800px");
		oTable.setModel(oModel);

		oTable.bindColumns("/columns", function(sId, oContext) {
			var sKeys = Object.keys(oContext.getObject());
			var currTemplate = new sap.ui.commons.TextView().bindProperty(
					"text", oContext.getObject());
			var sLabel = oContext.getObject().replace(/([a-z])([A-Z])/g, '$1 $2').substr(0, 1).toUpperCase()+oContext.getObject().replace(/([a-z])([A-Z])/g, '$1 $2').substr(1);
			return new sap.ui.table.Column({
				// id : sKeys[0],
				width : "100px",
				label : sLabel,
				template : currTemplate,
				sortProperty : sKeys[0],
				filterProperty : sKeys[0]
			});
		});
		oTable.bindRows("/rows");
		verticalLayout.addContent(oTable);
		
	}
	return verticalLayout;

}

function crateFields(formData,formTable) {
	var aResultArr=[];
	$.each(formData, function(key, val) {
	    //display the key and value pair
		var sLabel = key.replace(/([a-z])([A-Z])/g, '$1 $2').substr(0, 1).toUpperCase()+key.replace(/([a-z])([A-Z])/g, '$1 $2').substr(1);
	    var obj ={
	key:sLabel,value:val};
	aResultArr.push(obj);
	});
	
	var oModel = new sap.ui.model.json.JSONModel();
	oModel.setData({modelData: aResultArr});
	formTable.setModel(oModel);
	formTable.bindRows("/modelData");
	
	// input fields
	
	return formTable;
}