
jQuery.sap.require("jquery.sap.resources");
function createReport(url,key,tableData)
{
var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
	
	var oMatrix = new sap.ui.commons.layout.MatrixLayout({

		layoutFixed : true,
		width : '100%',
		columns : 6,
		widths : ['10%', '20%', '10%', '20%','10%','20%'] });
	var Cell = sap.ui.commons.layout.MatrixLayoutCell;
	var Label= sap.ui.commons.Label;
	var TextField= sap.ui.commons.TextField;
	var panelName = key.split("_");
	
	var oBundle = jQuery.sap.resources({url : url, locale: "de"});
	var value=oBundle.getText(key);
	var Labels=value.split(",");
	var arr2=[];
	var numLables=Labels.length;
	var j=0;
	
	var fieldType=oBundle.getText("ASN_FIELDTYPE");
	fieldType=fieldType.split(",");

//input fields	
	for (var i=0;i<numLables;i++)
		{
	
		lbl=new Label({text:Labels[i]});
		//txt=new TextField();
		txt = eval("new sap.ui.commons"+"."+fieldType[i]);
		arr2.push([lbl,txt]);	
		j++;

		
		if(j==3){
		oMatrix.createRow(arr2[0][0],arr2[0][1],arr2[1][0],arr2[1][1],arr2[2][0],arr2[2][1]);
	j=0;
	arr2=[];
		}
	
		}
		if(arr2.length%3!=0)
		{
		if(arr2.length==2)
		oMatrix.createRow(arr2[0][0],arr2[0][1],arr2[1][0],arr2[1][1]);
		else
		oMatrix.createRow(arr2[0][0],arr2[0][1]);
		}
		
		
		
		////Search and Cancel button//////////////
		
		///Loading Local JSON file////
		 var resultModel = new sap.ui.model.json.JSONModel();
           resultModel.loadData("localJSON/Result.json");
		
		var searchButton = new sap.ui.commons.Button({text:"Search",press:function(){
			oTable.setModel(resultModel);
		}});
		
		
		var cancelButton = new sap.ui.commons.Button({text:"Cancel",press:function(){
			
		}});
		
		var htoolbar= new sap.ui.commons.Toolbar({
  			//width: "59%",
  			visible:true
  		});
		htoolbar.addItem(searchButton);
		htoolbar.addItem(cancelButton);
		oMatrix.createRow(htoolbar);
		
		  var headerPanel= new sap.ui.commons.Panel({
  			areaDesign : sap.ui.commons.enums.AreaDesign.Plain, // sap.ui.commons.enums.AreaDesign
  			borderDesign : sap.ui.commons.enums.BorderDesign.Box, // sap.ui.commons.enums.BorderDesign
  			showCollapseIcon : false, // boolean
  			text : panelName[0], // string
  					content : [oMatrix] // sap.ui.core.Control,
  					           
  			//width: "1000px"		           
  		// sap.ui.commons.Button
  		});
		//////////////////////////////////////////
        //////////////////////////////////////////	
 //output table
var output=oBundle.getText("ASN_OUTPUT");
var columnData=output.split(",");
columnData.splice(0,0,"Select");
// do json data for columndata




//table dynamic creation
		var oModel = new sap.ui.model.json.JSONModel();
	    oModel.setData({	
	        columns : columnData,
	        rows    : tableData
	    });
		 var oTable = new sap.ui.table.Table({
			 selectionBehavior:sap.ui.table.SelectionBehavior.Row ,
			 selectionMode: sap.ui.table.SelectionMode.Single,

			 rowSelectionChange:function(oEvt)
				{
				 slectedIndex = this
					.getSelectedIndices();
				}
			    
		 });

		 
		 oTable.setWidth("1400px");
		    oTable.setModel(oModel);

		    
		    oTable.bindColumns("/columns", function(sId, oContext) {
		    	var sKeys = Object.keys(oContext.getObject());
		    	if(oContext.getObject() == "Select"){
		    		var Label = "";
		    		var currTemplate = new sap.ui.commons.CheckBox({change:function(evt){
		    			openCreateLocalVersionPopUp();
		    			
		    		}}).bindProperty("checked",oContext.getObject());
		    		var currwidth = "100px";
		    	}
		    	else{
		    		var Label = oContext.getObject();
		    		var currTemplate = new sap.ui.commons.TextView().bindProperty("text",oContext.getObject());
		    		var currwidth = "250px";
		    	}
		        return new sap.ui.table.Column({
		           // id : sKeys[0],
		        	width:currwidth,
		            label: Label, 
		            template: currTemplate, 
		            sortProperty: oContext.getObject(), 
		            filterProperty: oContext.getObject(),
		            hAlign:"Center"
		        });
		    });
		    
		    oTable.bindRows("/rows");
		    
		    ///Dialog opens on click of checkBox
		    
		    oDialog = new sap.ui.commons.Dialog({minHeight: '400px', minWidth: '820px',modal:true});
			 function openCreateLocalVersionPopUp() {
				 oDialog.setTitle("Add Transfer Request");
				 oDialog.destroyButtons();
				 //oDialog.addContent();
				 oDialog.addButton(new sap.ui.commons.Button({text: "OK", press:function(){oDialog.close();}}));
				 oDialog.open();
			   //oController.sorter();
			 }
		    
		    /////////////////////////////////
		    
		    
		    /*var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		    	colSpan: 5 });


		    oCell.addContent(oTable);
		    oMatrix.createRow(oCell);*/
		    
		    var tablePanel= new sap.ui.commons.Panel({
	  			areaDesign : sap.ui.commons.enums.AreaDesign.Plain, // sap.ui.commons.enums.AreaDesign
	  			borderDesign : sap.ui.commons.enums.BorderDesign.Box, // sap.ui.commons.enums.BorderDesign
	  			showCollapseIcon : false, // boolean
	  			text : panelName[0] +" "+"Table", // string
	  					content : [oTable] // sap.ui.core.Control,
	  					           
	  			//width: "1000px"		           
	  		// sap.ui.commons.Button
	  		});
		var olayout = new sap.ui.commons.layout.VerticalLayout({
			content:[headerPanel,tablePanel]
		});    
		   
		return olayout;
	//return oMatrix;
	

	}