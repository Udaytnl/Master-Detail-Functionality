var oModel;
sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
	"sap/ui/core/Fragment",
	"../model/formatter"
], function (BaseController, JSONModel, Filter, Sorter, FilterOperator, GroupHeaderListItem, Device, Fragment, formatter) {
	"use strict";

	return BaseController.extend("com.masterdetail.Master-Detail.controller.Master", {

		formatter: formatter,

		onSelectionChange : function (oEvent) {
			var Productid = oEvent.getSource().getAggregation("attributes")[0].getBindingContext().getProperty("ProductID");
			console.log("Product id :", Productid);
		//	alert(Productid)
			this.getRouter().navTo("object", {
				objectId : Productid,
				layout : "TwoColumnsMidExpanded"
			});
		
		},
		
		handleSOSearch: function (oEvent) {
			/*var SamTbl = oEvent.getParameter("listItem");*/
			var SamTbl = oEvent.getSource().getValue();
			var filters = [];
			var oFilter = new sap.ui.model.Filter("ProductID", sap.ui.model.FilterOperator.Contains, SamTbl);
			filters.push(oFilter);
		//	filters = (oFilter);
		/*	var listItem = this.getView().byId("list1");
			var binding = listItem.getBinding("items");
			binding.filter(filters);*/
			
			
			
			this.byId("Listtitle").getBinding("items").filter(filters);
			//alert(this.byId("list1"));
			//alert(this.byId("list1").getBinding("items"));
			//alert(this.byId("list1").getBinding("items").filter(filters));

		},

		
		onBeforeRendering : function(){
			
			var oController = this;
			oModel = oController.getView().getModel();
			oModel.read("/ProductSet", {
				
				success: function (oData, oResponse) {
					console.log(oData);
					console.log(oResponse);
					var Tcount = (oData.results).length;
					alert(Tcount);
					oController.getView().byId("Listtitle").setHeaderText("Products(" + Tcount + ")");
					
						var ProductId = oData.results[0].ProductID;
						console.log("ProductId :", ProductId);
					},
					error: function (Response) {
						alert("Wrong")
				}
			});
		},

	});

});