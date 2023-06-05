sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/export/Spreadsheet'
	
], function(Controller,Spreadsheet) {
	"use strict";

	return Controller.extend("ApiWeeklySpend.controller.View1", {
onInit: function(){
	var oForm =this.getView().byId("Tab1");
	oForm.bindElement("mprod");
	var serviceURL="https://vhvbcds4ci.sap.vbc.co:44300/sap/opu/odata/sap/ZODATA_SERVICE_SRV/WEEKLY_SPENDSet";
	var oModel=new sap.ui.model.odata.ODataModel(serviceURL,true,"abap","Welcome2VBC!");
	
console.log(oModel);
//	this.getView().setModel("Model>/WEEKLY_SPENDSet('M10')");
//	console.log(oForm.bindElement("mprod>/WEEKLY_SPENDSet");
},
createColumnConfig: function() {
			var aCols = [];
			
			aCols.push({
				property: 'WERKS'
			});			

			aCols.push({
				property: 'WEEKTXT'
			});

			aCols.push({
				property: 'AMOUNT'
			});
			
			

			return aCols;
		},
		onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId('Tab1');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding('rows');
		//	console.log(oRowBinding);
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'UserDetails.xlsx',
				worker: false 
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		}
	});
});