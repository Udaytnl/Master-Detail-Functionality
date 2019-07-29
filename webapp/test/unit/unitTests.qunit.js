/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/masterdetail/Master-Detail/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});