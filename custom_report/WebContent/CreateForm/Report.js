
jQuery.sap.require("jquery.sap.resources");
function createReport(url,key,tableData)
{
var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
var index;
//Matrix layout for dynamic report UI genaration
	var oMatrix = new sap.ui.commons.layout.MatrixLayout({

		layoutFixed : true,
		width : '100%',
		columns : 6,
		widths : ['10%', '20%', '10%', '20%','10%','20%'] });
	var oCell = sap.ui.commons.layout.MatrixLayoutCell;
	var oLabel= sap.ui.commons.Label;
	var oTextField= sap.ui.commons.TextField;
	var sPanelName = key.split("_");
	
	var oBundle = jQuery.sap.resources({url : url, locale: "de"});
	var sValue=oBundle.getText(key);
	var aLabels=sValue.split(",");
	var aLayout=[];
	//var numLables=aLabels.length;
	var j=0;
	
	
	var aFieldType=oBundle.getText("ASN_FIELDTYPE");
	aFieldType=aFieldType.split(",");

//input fields	
	for (var i=0;i<aLabels.length;i++)
		{
	
		oDynamicLbl=new oLabel({text:aLabels[i]});
		oDynamicTxt = eval("new sap.ui.commons"+"."+aFieldType[i]);
		
		aLayout.push([oDynamicLbl,oDynamicTxt]);	
		j++;

		//Logic for 6 cell layout
		//add 3 labels and 3 other controls then create a new row
		if(j==3){
		oMatrix.createRow(aLayout[0][0],aLayout[0][1],aLayout[1][0],aLayout[1][1],aLayout[2][0],aLayout[2][1]);
	j=0;
	aLayout=[];
		}
	
		}
		if(aLayout.length%3!=0)
		{
		if(aLayout.length==2)
		oMatrix.createRow(aLayout[0][0],aLayout[0][1],aLayout[1][0],aLayout[1][1]);
		else
		oMatrix.createRow(aLayout[0][0],aLayout[0][1]);
		}
		
		
		
		////Search and Cancel button//////////////
		
		///Loading Local JSON file////
		 var oResultModel = new sap.ui.model.json.JSONModel();
           oResultModel.loadData("localJSON/Result.json");
		
		var oSearchButton = new sap.ui.commons.Button({text:"Search",press:function(){
			//oTable.setModel(oResultModel);
			//Service call to happen.
			
		}});
		
		
		var oCancelButton = new sap.ui.commons.Button({text:"Cancel",press:function(){
			
		}});
		
		var oHorizontalToolbar= new sap.ui.commons.Toolbar({
  			//width: "59%",
  			visible:true
  		});
		oHorizontalToolbar.addItem(oSearchButton);
		oHorizontalToolbar.addItem(oCancelButton);
		oMatrix.createRow(oHorizontalToolbar);
		
		  var oHeaderPanel= new sap.ui.commons.Panel({
  			areaDesign : sap.ui.commons.enums.AreaDesign.Plain, // sap.ui.commons.enums.AreaDesign
  			borderDesign : sap.ui.commons.enums.BorderDesign.Box, // sap.ui.commons.enums.BorderDesign
  			showCollapseIcon : false, // boolean
  			text : sPanelName[0], // string
  					content : [oMatrix] // sap.ui.core.Control,
  					           
  			//width: "1000px"		           
  		// sap.ui.commons.Button
  		});
		//////////////////////////////////////////
        //////////////////////////////////////////	
 //sOutput table
var sOutput=oBundle.getText("ASN_OUTPUT");
var aColumnData=sOutput.split(",");
aColumnData.splice(0,0,"Select");
// do json data for columndata




//table dynamic creation
		var oModel = new sap.ui.model.json.JSONModel();
	    oModel.setData({	
	        columns : aColumnData,
	        rows    : tableData
	    });
		  oTable = new sap.ui.table.Table({
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

		    //Creating columns dynamically.
		    oTable.bindColumns("/columns", function(sId, oContext) {
		    	var sKeys = Object.keys(oContext.getObject());
		    	if(oContext.getObject() == "Select"){
		    		var Label = "";
		    		var currTemplate = new sap.ui.commons.CheckBox({change:function(evt){
		    			index = this.getParent().getIndex();
		    			if(evt.mParameters.checked)
		    			openCreateLocalVersionPopUp(index);
		    			
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
		    
		    oDialog = new sap.ui.commons.Dialog({minHeight: '300px', minWidth: '300px',modal:true});
			 function openCreateLocalVersionPopUp(index) {
				var oMemoVlayout = createDialogTable(index);
				oDialog.destroyContent();
				 oDialog.setTitle("Raise Ticket Request");
				 oDialog.destroyButtons();
				 oDialog.addContent(oMemoVlayout);
				 oDialog.addButton(new sap.ui.commons.Button({text: "Submit", press:function(){
					 
					 debugger;
					 oTable.getBinding().oList[index].Select=false;
					 oTable.rerender();
					 oDialog.close();
					 sap.ui.commons.MessageBox
						.alert(
								"Ticket Number is generated!",
								"",
								"Information");
				 }}));
				 oDialog.addButton(new sap.ui.commons.Button({text: "Cancel", press:function(){
					 
					 oTable.getBinding().oList[index].Select=false;
					 oTable.rerender();
					 oDialog.close();}}));
				 oDialog.open();
			   //oController.sorter();
			 }
			 
			 function createDialogTable(index){
				 debugger;
				 ////Table created dynamically for header table in pop-up.
				 var aDialTabledata=[];
				    aDialTabledata.push(tableData[index]);
					  //table dynamic creation
						var odialModel = new sap.ui.model.json.JSONModel();
						odialModel.setData({	
					        columns : aColumnData,
					        rows    : aDialTabledata
					    });
						 var oDialTable = new sap.ui.table.Table({
							 selectionBehavior:sap.ui.table.SelectionBehavior.Row ,
							 selectionMode: sap.ui.table.SelectionMode.Single,
							 visibleRowCount : 1,

							 rowSelectionChange:function(oEvt)
								{

								}
							    
						 });

						 
						 oDialTable.setWidth("600px");
						 oDialTable.setModel(odialModel);

						    
						 oDialTable.bindColumns("/columns", function(sId, oContext) {
						    	var sKeys = Object.keys(oContext.getObject());
						    	if(oContext.getObject() == "Select"){
						    		var Label = "";
						    		var currTemplate = new sap.ui.commons.CheckBox({change:function(evt){
						    			if(evt.mParameters.checked)
						    			openCreateLocalVersionPopUp();
						    			
						    		}}).bindProperty("checked",oContext.getObject());
						    	}
						    	else{
						    		var Label = oContext.getObject();
						    		var currTemplate = new sap.ui.commons.TextView().bindProperty("text",oContext.getObject());
						    	}
						        return new sap.ui.table.Column({
						           // id : sKeys[0],
						        	width:"100px",
						            label: Label, 
						            template: currTemplate, 
						            sortProperty: oContext.getObject(), 
						            filterProperty: oContext.getObject(),
						            hAlign:"Center"
						        });
						    });
						    
						 oDialTable.bindRows("/rows");
						 oDialTable.getColumns()[0].setVisible(false);
					    
					    var oLabel = new sap.ui.commons.Label({
					    	text:"Comment"
					    });
					    
					    var oTextArea = new sap.ui.commons.TextArea({
					    	rows:3,width:"400px"
					    });
					    
					    var oTicketHlayout = new sap.ui.commons.layout.HorizontalLayout({
						//height : "300px",
						width : "100%",
						content:[oLabel,oTextArea]
					    });
					    
					    var oMemoVlayout = new sap.ui.commons.layout.VerticalLayout({
							//height : "600px",
							width : "100%",
							content:[oDialTable,oTicketHlayout]
						});				 
				 return oMemoVlayout;
			 }
		    
		    /////////////////////////////////
		    ////Main Table panel/////////////
		    var oTablePanel= new sap.ui.commons.Panel({
	  			areaDesign : sap.ui.commons.enums.AreaDesign.Plain, // sap.ui.commons.enums.AreaDesign
	  			borderDesign : sap.ui.commons.enums.BorderDesign.Box, // sap.ui.commons.enums.BorderDesign
	  			showCollapseIcon : false, // boolean
	  			text : sPanelName[0] +" "+"Table", // string
	  					content : [oTable] // sap.ui.core.Control,
	  					           
	  			//width: "1000px"		           
	  		// sap.ui.commons.Button
	  		});
		    
		    var oExcelDownloadBtn = new sap.ui.commons.Button({
		    	text:"Export",
		    	press:function(){
		    	debugger;
		    	excelDownload(oTable,aColumnData);
		    	}
		    });
		    var csvText = generateTableCSV(oTable,oTable.getBinding().oList); 
		    var oExcelDownloadLink  = createDownloadLink(csvText);
		var oMainVlayout = new sap.ui.commons.layout.VerticalLayout({
			content:[oHeaderPanel,oTablePanel,oExcelDownloadLink]
		});    
		   
		return oMainVlayout;
	//return oMatrix;
	

	}

/**
* Creates a link target to base64 data
*/
function createDownloadLink(b64text) {
  var oLink = new sap.ui.commons.Link("linkExportCsv", {
  text: 'Download as Excel',
  href: 'data:application/vnd.ms-excel;charset=utf-8;base64,' + (Base64.encode(b64text))
  });
 
  initDownloadAttr('FileName-Example.xls')
 
  return oLink;
}

/**
* Creates download attribute to set filename
*/
function initDownloadAttr() {
  if ($( "#linkExportCsv" ).length > 0) {
  $( "#linkExportCsv" ).attr('download', 'filename.xls');
  } else {
  setTimeout(initDownloadAttr, 1000);
  }
}

/**
* Export table header and data into a CSV string.
*/
function generateTableCSV(table, jsonData) {
  var info = '';
 
  for (var i =0; i<table.getColumns().length; i++) {
  info+= encodeURIComponent(table.getColumns()[i].getLabel().getText()) + '\t';
  }
 
  info += '\r\n';
 
  if (jsonData.length != undefined) {
  for (var j=0; j<jsonData.length; j++) {
  for (var i =0; i<table.getColumns().length; i++) {
  if (table.getColumns()[i].getTemplate() != undefined && table.getColumns()[i].getTemplate().getBinding('text') != undefined) {
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('text').sPath);
  info+= encodeURIComponent(valor) + '\t';
  } else if (table.getColumns()[i].getTemplate() != undefined && table.getColumns()[i].getTemplate().getBinding('value') != undefined) {
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('value').sPath);
  info+= encodeURIComponent(valor) + '\t';
  } else
  info+= '\t';
  }
  info += '\r\n';
  }
  } else {
  $.each(jsonData, function(key,value){
  for (var i =0; i<table.getColumns().length; i++) {
  if (table.getColumns()[i].getTemplate() != undefined && table.getColumns()[i].getTemplate().getBinding('text') != undefined) {
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('text').sPath);
  info+= encodeURIComponent(valor) + '\t';
  } else if (table.getColumns()[i].getTemplate() != undefined && table.getColumns()[i].getTemplate().getBinding('value') != undefined) {
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('value').sPath);
  info+= encodeURIComponent(valor) + '\t';
  } else
  info+= '\t';
  }
  info += '\r\n';
  });
  }
 
  return info;
}


//Add to Base 64 util

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
  // public method for encoding
  encode : function (input) {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
 
  input = Base64._utf8_encode(input);
 
  while (i < input.length) {
 
  chr1 = input.charCodeAt(i++);
  chr2 = input.charCodeAt(i++);
  chr3 = input.charCodeAt(i++);
 
  enc1 = chr1 >> 2;
  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
  enc4 = chr3 & 63;
 
  if (isNaN(chr2)) {
  enc3 = enc4 = 64;
  } else if (isNaN(chr3)) {
  enc4 = 64;
  }
 
  output = output +
  this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
  this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
  }
 
  return output;
  },
 
  // public method for decoding
  decode : function (input) {
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
 
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
  while (i < input.length) {
 
  enc1 = this._keyStr.indexOf(input.charAt(i++));
  enc2 = this._keyStr.indexOf(input.charAt(i++));
  enc3 = this._keyStr.indexOf(input.charAt(i++));
  enc4 = this._keyStr.indexOf(input.charAt(i++));
 
  chr1 = (enc1 << 2) | (enc2 >> 4);
  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
  chr3 = ((enc3 & 3) << 6) | enc4;
 
  output = output + String.fromCharCode(chr1);
 
  if (enc3 != 64) {
  output = output + String.fromCharCode(chr2);
  }
  if (enc4 != 64) {
  output = output + String.fromCharCode(chr3);
  }
 
  }
 
  output = Base64._utf8_decode(output);
 
  return output;
 
  },
 
  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";
 
  for (var n = 0; n < string.length; n++) {
 
  var c = string.charCodeAt(n);
 
  if (c < 128) {
  utftext += String.fromCharCode(c);
  }
  else if((c > 127) && (c < 2048)) {
  utftext += String.fromCharCode((c >> 6) | 192);
  utftext += String.fromCharCode((c & 63) | 128);
  }
  else {
  utftext += String.fromCharCode((c >> 12) | 224);
  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
  utftext += String.fromCharCode((c & 63) | 128);
  }
 
  }
 
  return utftext;
  },
 
  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
  var string = "";
  var i = 0;
  var c = c1 = c2 = 0;
 
  while ( i < utftext.length ) {
 
  c = utftext.charCodeAt(i);
 
  if (c < 128) {
  string += String.fromCharCode(c);
  i++;
  }
  else if((c > 191) && (c < 224)) {
  c2 = utftext.charCodeAt(i+1);
  string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
  i += 2;
  }
  else {
  c2 = utftext.charCodeAt(i+1);
  c3 = utftext.charCodeAt(i+2);
  string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
  i += 3;
  }
 
  }
 
  return string;
  }
 
}


function excelDownload(oTable,aColumnData){
    //exportToExcel(tableId, oModel);
    JSONToCSVConvertor(oTable.getBinding().oList,"Report", true,aColumnData);
}

