var oModel;
sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/m/library"
], function (BaseController, JSONModel, formatter, mobileLibrary) {
	"use strict";

	// shortcut for sap.m.URLHelper
	var URLHelper = mobileLibrary.URLHelper;

	return BaseController.extend("com.masterdetail.Master-Detail.controller.Detail", {
	formatter: formatter,
	
	onInit : function () {
	this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
	},

	_onObjectMatched : function (oEvent) {
		
		
			var sObjectId =  oEvent.getParameter("arguments").objectId;    // Get Previous screen data 
			this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded"); // This Screen layout
			
			/*Table Binding filter*/
			
			var tableid = this.getView().byId("PropertyTable");
			var oFilters = [new sap.ui.model.Filter("ProductID", sap.ui.model.FilterOperator.EQ, sObjectId)];
			var template = new sap.m.ColumnListItem({
				cells: [new sap.m.Label({
						text: "{SalesOrderID}",
						wrapping: true
					}),
					new sap.m.Label({
						text: "{ProductID}",
						wrapping: true
					}),
				]
			});
			tableid.bindItems({
			path: '/SalesOrderLineItemSet',
			template: template,
			filters: oFilters
			});
			
				var oController = this;
				oModel = this.getView().getModel();
				oModel.read("/SalesOrderLineItemSet", {
				filters : oFilters,
				success: function (oData, oResponse) {
					var Tcount = (oData.results).length;
					console.log(Tcount);
				/*	var ProductID = oData.results[0].ProductID;
					oController.byId("objecthead").setTitle(ProductID);*/
					
					var GrossAmount = oData.results[0].GrossAmount;
					oController.byId("objecthead").setNumber(GrossAmount);
					
					var CurrencyCode = oData.results[0].CurrencyCode;
					oController.byId("objecthead").setNumberUnit(CurrencyCode);
					
					var Quantity = oData.results[0].Quantity;
					oController.byId("status1").setText(Quantity);
					
					var Note = oData.results[0].Note;
					oController.byId("attr1").setText(Note);
					},
					error: function (Response) {
				}
			});
			
		},
		
		NextScreen : function(){
			this.getRouter().navTo("thirdscreen",{
				layout : "ThreeColumnsMidExpanded"
			});
		},
		
		render : function(){
		alert("Update finish is working");	
		},
		
		
		
	});
		});