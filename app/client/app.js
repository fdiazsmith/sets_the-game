/**
  *
  * C L I E N T
  * 
  *
  */

// import "./Setes.js";
//this if statement might be superflous
if (Meteor.isClient) {
  console.log("Client is loaded");
  // var setes = new Setes();
  //Example of how to access the meteor settings
	console.log(Meteor.settings);
};