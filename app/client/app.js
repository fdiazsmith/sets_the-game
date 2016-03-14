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
	  console.log("Client is loaded");
	  // Tinytest.add(true);
	  var setes = new Setes();
	  // var sdfs = new SetesV();
	});

  //Example of how to access the meteor settings
	console.log(Meteor.settings);
};