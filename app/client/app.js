/**
  *
  * C L I E N T
  *
  *
  */

// import "./Setes.js";
//this if statement might be superflous
if (Meteor.isClient) {
	$(document).ready(function (argument) {
	  console.log("setes: Client is loaded");
	  // Tinytest.add(true);
		console.log(Meteor.settings);
	  Setes.init();

	});

  //Example of how to access the meteor settings
};
