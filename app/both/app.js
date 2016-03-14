/**
  *
  * B O T H
  *
  *
  */

//most basic use of the router.
 // Router.route('/', 'Home');

//route function or router function 
 Router.route('/', function (argument) {
 	var isLoggedIn = Session.get('isLoggedIn');
 //layout function 
 	this.layout('Layout');

 	if(isLoggedIn){
 		this.render("grid");
 	}
 	else{
	 	this.render('Home');	
 	}
 	
 });

 Router.route('/card/:_id', function (argument) {
 	//this.params. has _id, hash and query
 	this.layout('Layout');
 	this.render('Card');
 	//debugger; this drops you on the client side console!
 });