
jQuery.sap.require("jquery.sap.resources");
function createReport(url,key,tableData)
{
	debugger;
var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
var index=[];
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
	
	var sKey = window.location.href.split("?")[1];
	switch(sKey){
	case "asn":
		var aFieldType=oBundle.getText("ASN_FIELDTYPE");
		break;
	case "bar": 
		var aFieldType=oBundle.getText("BAR_FIELDTYPE");
		break;
	case "grn": 
		var aFieldType=oBundle.getText("GRN_FIELDTYPE");
		break;
	case "grndesc": 
		var aFieldType=oBundle.getText("GRN_DESC_FIELDTYPE");
		break;
	case "otif": 
		var aFieldType=oBundle.getText("OTIF_FIELDTYPE");
		break;
	case "qreport": 
		var aFieldType=oBundle.getText("QUALITY_FIELDTYPE");
		break;
	case "rreport": 
		var aFieldType=oBundle.getText("RATING_FIELDTYPE");
		break;
	case "vreport": 
		var aFieldType=oBundle.getText("RVENDOR_FIELDTYPE");
		break;
	case "sreport": 
		var aFieldType=oBundle.getText("SALES_FIELDTYPE");
		break;
	case "sohreport": 
		var aFieldType=oBundle.getText("SOH_FIELDTYPE");
		break;
	case "ireport": 
		var aFieldType=oBundle.getText("INVOICE_FIELDTYPE");
		break;
	case "lreport": 
		var aFieldType=oBundle.getText("LEDGER_FIELDTYPE");
		break;
	case "creport": 
		var aFieldType=oBundle.getText("CREDIT_FIELDTYPE");
		break;
	case "preport": 
		var aFieldType=oBundle.getText("PAYMENT_FIELDTYPE");
		break;
		
		
	}
	aFieldType=aFieldType.split(",");

//input fields	
	for (var i=0;i<aLabels.length;i++)
		{
	
		
		oDynamicTxt = eval("new sap.ui.commons"+"."+aFieldType[i]);
		oDynamicLbl=new oLabel({text:aLabels[i]}).setLabelFor(oDynamicTxt);
		///Associate Labels with control and vice versa.
		oDynamicTxt.addAriaLabelledBy(oDynamicLbl);
		aLayout.push([oDynamicLbl,oDynamicTxt]);	
		j++;

		/////////////Logic to add Input fields for search in the model
		tabledata[0][aLabels[i]]="";
		oDynamicTxt.attachChange(function(){
			debugger;
			tabledata[0][sap.ui.getCore().byId(this.mAssociations.ariaLabelledBy).getText()]=this.getValue();
		})
		/////////////////////////////////////////////
		/////////////////////////////////////////////
		
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
		  /*if(window.location.href.split("?")[1]=="asn")
var sOutput=oBundle.getText("ASN_OUTPUT");
		  else if(window.location.href.split("?")[1]=="bar")
			  var sOutput=oBundle.getText("BAR_OUTPUT");*/
		  
		  var sKey = window.location.href.split("?")[1];
			switch(sKey){
			case "asn":
				var sOutput=oBundle.getText("ASN_OUTPUT");
				////to get the correct data from dummy json. use appropriate data in case of real JSON.
				var tableData = tableData[0].ASN;
				break;
			case "bar": 
				var sOutput=oBundle.getText("BAR_OUTPUT");
				var tableData = tableData[0].BAR;
				break;
			case "grn": 
				var sOutput=oBundle.getText("GRN_OUTPUT");
				var tableData = tableData[0].GRN;
				break;
			case "grndesc": 
				var sOutput=oBundle.getText("GRN_DESC_OUTPUT");
				var tableData = tableData[0].GRNDesc;
				break;
			case "otif": 
				var sOutput=oBundle.getText("OTIF_OUTPUT");
				var tableData = tableData[0].OTIF;
				break;
			case "qreport": 
				var sOutput=oBundle.getText("QUALITY_OUTPUT");
				var tableData = tableData[0].QREPORT;
				break;
			case "rreport": 
				var sOutput=oBundle.getText("RATING_OUTPUT");
				var tableData = tableData[0].RREPORT;
				break;
			case "vreport": 
				var sOutput=oBundle.getText("RVENDOR_OUTPUT");
				var tableData = tableData[0].RETURN;
				break;
			case "sreport": 
				var sOutput=oBundle.getText("SALES_OUTPUT");
				var tableData = tableData[0].SALES;
				break;
			case "sohreport": 
				var sOutput=oBundle.getText("SOH_OUTPUT");
				var tableData = tableData[0].SOH;
				break;
			case "ireport": 
				var sOutput=oBundle.getText("INVOICE_OUTPUT");
				var tableData = tableData[0].INVOICE;
				break;
			case "lreport": 
				var sOutput=oBundle.getText("LEDGER_OUTPUT");
				var tableData = tableData[0].LEDGER;
				break;
			case "creport": 
				var sOutput=oBundle.getText("CREDIT_OUTPUT");
				var tableData = tableData[0].CREDIT;
				break;
			case "preport": 
				var sOutput=oBundle.getText("PAYMENT_OUTPUT");
				var tableData = tableData[0].PAYMENT;
				break;
				
				
			}
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

		 
		 oTable.setWidth("1290px");
		    oTable.setModel(oModel);

		    //Creating columns dynamically.
		    oTable.bindColumns("/columns", function(sId, oContext) {
		    	var sKeys = Object.keys(oContext.getObject());
		    	if(oContext.getObject() == "Select"){
		    		var Label = "";
		    		var currTemplate = new sap.ui.commons.CheckBox({change:function(evt){
		    			
		    		}}).bindProperty("checked",oContext.getObject());
		    		var currwidth = "100px";
		    	}
		    	else{
		    		var Label = new sap.ui.commons.Label({text: oContext.getObject(),textAlign: sap.ui.core.TextAlign.Center});
		    		var currTemplate = new sap.ui.commons.TextView({textAlign: sap.ui.core.TextAlign.Center}).bindProperty("text",oContext.getObject());
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
					 for(i in index){
					 oTable.getBinding().oList[index[i]].Select=false;}
					 oTable.rerender();
					 oDialog.close();
					 /////Temp code to change to task UI
					// var app = new sap.m.App({initialPage:"idtaskGen"});
						var newPage = sap.ui.view({id:"idtaskGen", viewName:"custom_report.taskGeneration", type:sap.ui.core.mvc.ViewType.JS});
						//app.removePage(sap.ui.getCore().byId("idindex1"));
						app.insertPage(newPage);
						app.to(newPage,"show");
					///////////////////////////////////////////////////
					 
					 
					 //Ticket number generated later.
					 /*sap.ui.commons.MessageBox
						.alert(
								"Ticket Number is generated!",
								"",
								"Information");*/
				 }}));
				 oDialog.addButton(new sap.ui.commons.Button({text: "Cancel", press:function(){
					 
					 for(i in index){
						 oTable.getBinding().oList[index[i]].Select=false;}
					 oTable.rerender();
					 oDialog.close();}}));
				 oDialog.open();
			   //oController.sorter();
			 }
			 
			 function createDialogTable(index){
				 debugger;
				 ////Table created dynamically for header table in pop-up.
				 aDialTabledata=[];
				 for(i in index)
				    aDialTabledata.push(tableData[index[i]]);
					  //table dynamic creation
						var odialModel = new sap.ui.model.json.JSONModel();
						odialModel.setData({	
					        columns : aColumnData,
					        rows    : aDialTabledata
					    });
						 var oDialTable = new sap.ui.table.Table({
							 selectionBehavior:sap.ui.table.SelectionBehavior.Row ,
							 selectionMode: sap.ui.table.SelectionMode.Single,
							 visibleRowCount : 3,

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
	  					           
	  		});
		    
		    var csvText = generateTableCSV(oTable,oTable.getBinding().oList); 
		    var oExcelDownloadLink  = createDownloadLink(csvText);
		    var oRaiseTicket = new sap.ui.commons.Button({
		    	text:"Raise Ticket",
		    	press:function(){
		    	debugger;
		    	index.length = 0;
		    	var aTableForIndex = oTable.getBinding().oList;
		    	for(i in aTableForIndex){
		    		if(aTableForIndex[i].Select){
		    			index.push(i);
		    		}
		    	}
		    	//index = this.getParent().getIndex();
    			if(index.length>0)
    			openCreateLocalVersionPopUp(index);
    			else{
    				
    			    	sap.ui.commons.MessageBox
    					.alert(
    							"Please select a checkBox",
    							"",
    							"Information");
    			   
    				}
		    	}
		    });
		    
		    var oTableToolbar= new sap.ui.commons.Toolbar({
	  			//width: "59%",
	  			visible:true
	  		});
		    oTableToolbar.addItem(oRaiseTicket);
		    oTableToolbar.addRightItem(oExcelDownloadLink);
		var oMainVlayout = new sap.ui.commons.layout.VerticalLayout({
			width:"1300px",
			content:[oHeaderPanel,oTablePanel,oTableToolbar]
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
  press:function(){
	  var base64 = Base64.encode(b64text);
		var apptype = "application/xls";
		var u8_2 = new Uint8Array(atob(base64).split("").map(function(c) {
			return c.charCodeAt(0);
		}));
		var blob = new Blob( [ u8_2 ], { 
			type: apptype 
			
		});
		

//debugger;
//window.saveAs(blob, sap.ui.getCore().byId("tabnam").getValue());
window.saveAs(blob, "Download"+".xls");
  }
 // href: 'data:application/vnd.ms-excel;charset=utf-8;base64,' + (Base64.encode(b64text))
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
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('text').sPath.replace(" ",""));
  info+= encodeURIComponent(valor) + '\t';
  } else if (table.getColumns()[i].getTemplate() != undefined && table.getColumns()[i].getTemplate().getBinding('value') != undefined) {
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('value').sPath.replace(" ",""));
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
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('text').sPath.replace(" ",""));
  info+= encodeURIComponent(valor) + '\t';
  } else if (table.getColumns()[i].getTemplate() != undefined && table.getColumns()[i].getTemplate().getBinding('value') != undefined) {
  var valor = eval('jsonData[j].'+table.getColumns()[i].getTemplate().getBinding('value').sPath.replace(" ",""));
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

//*********For Saveas Popup download link
window.saveAs || ( window.saveAs = (window.navigator.msSaveBlob ? function(b,n){ return window.navigator.msSaveBlob(b,n); } : false) || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs || (function(){
	 
	// URL's
	window.URL || (window.URL = window.webkitURL);
 
	if(!window.URL){
		return false;
	}
 
	return function(blob,name){
		var url = URL.createObjectURL(blob);
 
		// Test for download link support
		if( "download" in document.createElement('a') ){
//			debugger;
			var a = document.createElement('a');
			a.setAttribute('href', url);
			a.setAttribute('download', name);
 
			// Create Click event
			var clickEvent = document.createEvent ("MouseEvent");
			clickEvent.initMouseEvent ("click", true, true, window, 0, 
				event.screenX, event.screenY, event.clientX, event.clientY, 
				event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
				0, null);
 
			// dispatch click event to simulate download
			a.dispatchEvent (clickEvent);
 
		}
		else{
			// fallover, open resource in new tab.
			window.open(url, '_blank', '');
		}
	};
 
})() );
//**********
var aDialTabledata=[];

