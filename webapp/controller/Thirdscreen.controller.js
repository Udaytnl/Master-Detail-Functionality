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

	return BaseController.extend("com.masterdetail.Master-Detail.controller.Thirdscreen", {

		formatter: formatter,

		onSelectionChange : function (oEvent) {
			var Productid = oEvent.getSource().getAggregation("attributes")[0].getBindingContext().getProperty("ProductID");
			console.log("Product id :", Productid);
			alert(Productid)
			this.getRouter().navTo("object", {
				objectId : Productid,
				layout : "TwoColumnsMidExpanded"
			});
		
		},

	});

});