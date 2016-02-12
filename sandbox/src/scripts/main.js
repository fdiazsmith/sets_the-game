/**
	* This is where code specific for this project lives.
	* for setup and general things checkout core_setup.js
	*
	* TODO:
	* -[x] On mouser hover show, cone name sprite.
	* -[x] Create a Theme Class e.i. the cones, and it axis of tension, Stories and Possibilities live inside a theme.
	* -[ ] Create multy views.
	* -[ ] Multy scenes? to have the ability to display orthographics and perspective in different arrangements.
	* -[x] Try Orbit control instead of TrackballControll.
	* -[x] An animation loop based on an array.
	* -[x] Look at http://threejs.org/examples/#css3d_periodictable for the transform function to see how to animate the Possibilities
	*/

/**
	*

	*
 **/



/**
	* GLOBAL VARIABLES
	*
	* @fields - define global variables
	*/

var container
	,	stats
	, lookAtScene =true
	;

var width
	, height
	, steps = 0
	;

var cube
	, cubeGeometry
	, cubeMaterial
	, sphere
	, sphereGeometry
	, sphereMaterial
	;

var LIGHT_GRAY = 0xEEEEEE
	, NEON_GREEN = 0x00ff00
	, BLUE 			= 0x7777ff
	, SPOTLIGHT_COLOR = 0xffffff
	;


// var all_Possibilities = []
// 	, all_Stories = []
// 	;
	//These Two should really be part of the class Theme and not be part of basic setup.
	// also this arrays is probably what needs to be stored in a database
	all_Possibilities = [];
	all_Stories = [];
	lastStory = 0;
//dat gui controlls
var gui_input =  new function() {
	 this.view = [];
	 this.addPossibility = function(){
	 	bio_silicone.createFutureScenario();
	 };
	 this.start_end_story = function(){
	 		makingStory = !makingStory;
		bio_silicone.newStory(makingStory)
	 };
	 this.realignToTop = function(which){
	 	all_Stories[which || 0].realignToTop();
	 }
	 this.resetPosition = function(which){
	 	all_Stories[lastStory].resetPosition();
	 }
	 this.show_All_Stories = function (argument) {
	 	bio_silicone.showAllStories();
	 }
	 this.show_ortho = function () {
	 	console.log("showing ortho");
		// show_ortho_one();
		show_ortho_two();

	 }
	 this.story = 0;
	 this.camera_x = 0;
	 this.camera_y = 0;
	 this.camera_z = 0;
	 this._color = "#DE3926";
 }
var camera_settings = new function(){
 	this.viewType = ['PerspectiveCamera'];
 	this.views = ['front'];
 	this.lens = [50];
 	this.fov = [70];
 	this.zoom = 1;
}
changeView = {}
changeView = {
	zoom : function(zoom){
		console.log("MAIN ",zoom);
		camera.setZoom(zoom);
	},
	fov : function(fov){
		camera.setFov( fov );
	},
	lens : function(lens){
		camera.setLens( lens );
	},
	views : function(e){

		switch(e){
			case "top":
				console.log("MAIN ",e);
				// camera.toTopView();
				// camera.rotation._x =
				// camera.rotation._y = 0;
				// camera.rotation._z = 0;
				xAxis = new THREE.Vector3( -1, 0, 0 );

yAxis = new THREE.Vector3( 0, -1, 0 );

zAxis = new THREE.Vector3( 0, 0, 1 );
				rot = new THREE.Euler();
				rot.setFromVector3( xAxis )
				camera.setRotationFromEuler(rot )
				// camera.rotationAutoUpdate = false;
				// lookAtScene=false;
			break;
			case "left":
				console.log("MAIN ",e);
				camera.toLeftView();

			break;
			case "front":
				camera.toFrontView();
			break;
			default:
			break;
		}
	},
	viewType : function(e){
		console.log("MAIN ",e);
		if(e === "PerspectiveCamera")
			camera.toPerspective();
		else
			camera.toOrthographic();
	},

}


// var gui_input = new GUI_INPUT();
var gui = new dat.GUI();
var f_camera = gui.addFolder("Camera");
		f_camera.add(camera_settings, 'viewType', [ 'PerspectiveCamera', 'OrthographicCamera' ] ).onChange(changeView.viewType);
		f_camera.add(camera_settings, 'views', [ 'left', 'top', 'front' ] ).onChange(changeView.views);
		f_camera.add(camera_settings, 'lens',  [12,16,24,35,50,60,85,105] ).onChange(changeView.lens);
		f_camera.add(camera_settings, 'fov', [30,50,70,100] ).onChange(changeView.fov);
		f_camera.add(camera_settings, 'zoom', 0,2).onChange(changeView.zoom );

var f_possibilities = gui.addFolder("Add possibility or Story ");
		f_possibilities.add(gui_input, "addPossibility");
		f_possibilities.add(gui_input, "start_end_story");
		f_possibilities.add(gui_input, "story", 0 , 10);
		f_possibilities.add(gui_input, "realignToTop");
		f_possibilities.add(gui_input, "resetPosition");
		f_possibilities.add(gui_input, "show_All_Stories");
		// f_possibilities.open();
gui.add(gui_input, 'show_ortho');
gui.addColor(gui_input, '_color');


function convert_to_JSON(){
	for (var i = 0; i < all_Possibilities.length; i++) {
		console.dir("MAIN ",JSON.stringify(all_Possibilities[i]));
	}
}



function init_app (argument) {
	console.log("MAIN ","initializing app");
	//domevents
	// domEvents   = new THREEx.DomEvents()

	bio_silicone = new Theme();

	laodJson();




	registerEventListeners();

$('canvas').click(function(e){
// 	console.log("MAIN ",e.clientX);
// console.log("MAIN ",	clickToWorldCoord(e) );
})
	//Bring dat-gui to the top.
	$('.dg.ac').css({"z-index": 1000});
}

var returnCAM = false;

function show_ortho_one(argument) {
	// world - create a scene
	var geometry = new THREE.PlaneBufferGeometry( width/2, height/2, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var ortho_plane = new THREE.Mesh( geometry, material );
	ortho_plane.position.set(-300, 0 ,0 );
	ortho_plane.rotation.set(0, Math.PI/2 ,0 , "XYZ");
	scene.add( ortho_plane );

	if(!returnCAM){
		// trackball.enabled =  false;
	var _from = {
		_x: trackball.target.x,
		_y: trackball.target.y,
		_z: trackball.target.z,
		x: camera.position.x,
		y: camera.position.y,
		z: camera.position.z
	};
	// var _from = camera.rotation;
	// var _from = trackball.target;
	// var _from = camera.position;
	// var _to = 	new THREE.Vector3( 50, -40  ,-40);
	// var _to = new THREE.Euler( 0,  Math.PI/2, 0, 'XYZ' );
	var _to = {
		_x: _from._x,
		_y: 150,
		_z: _from._z,
		x: -250,
		y:0,
		z:0
	}
	console.log(camera, ortho_plane);
	// camera.lookAt(new THREE.Vector3(-200, 100, 0 ))
	var tweenCamera = new TWEEN.Tween(_from).to( _to , 2000)
												.onUpdate(function(){
													camera.rotation.y =  _from._y;
													camera.position.set( _from.x,   _from.y ,  _from.z);
													// camera.rotation.set( _from._x,   _from._y ,  _from._z, "XYZ");
													console.log(_from);
													// // console.log(camera);
													trackball.target.x = _from._x;
													trackball.target.y =  _from._y;
													trackball.target.z = _from._z;
													// // trackball.update();
												}).start()
												.onComplete(function () {
													// camera.toOrthographic();
													// camera.switchToOrtho();
													console.log(camera);
												});
												returnCAM = !returnCAM;
}
else{

	returnCAM = !returnCAM;
}

}
function show_ortho_two(argument) {
if(!returnCAM){

	trackball.enabled =  false;

	all_Stories[0].possibilities.forEach(function (possibility) {
		// console.log(this,possibility, "inside fore each");
		scene_two.add(possibility.mesh)
	})
var _from = {delta: 1.0};
var _to = {delta: 0.0};
var scene_transition = new TWEEN.Tween(_from)
														.to(_to, 2000)
														.onUpdate(function() {
															transitionParams.transition = _from.delta;
															// console.log("in",transitionParams.transition, _from.delta);
														}).start();

		returnCAM = !returnCAM;
}
else {
	// secondScene = false;
	console.log(scene.children);
	var _from = {delta: 0.0};
	var _to = {delta: 1.0};
	var scene_transition = new TWEEN.Tween(_from)
															.to(_to, 2000)
															.onUpdate(function() {
																transitionParams.transition = _from.delta;
																// console.log("Out",transitionParams.transition, _from.delta);
															}).start();

		returnCAM = !returnCAM;


}
}


function laodJson(){
	console.log("MAIN ","loading JSON database");

 $.ajax('scripts/localdb.json',{
 	async: true,
 	success:  function(e){
 		console.log("MAIN ","\n\tSuccess\t",e);
 		for (var i = e.Possibilities.length - 1; i >= 0; i--) {
 			// e.Possibilities[i]

 			e.Possibilities[i].parent = bio_silicone;

 			bio_silicone.createFutureScenario( e.Possibilities[i] );
 		};
		for (var i = e.Stories.length - 1; i >= 0; i--) {
					bio_silicone.newStory(e.Stories[i]);
			// 	var result = $.grep(all_Possibilities, function(event){return event._ID === e.Stories[i].posibilities[q].id;});
		};

 	},
 	complete: function(e){
 		console.log("MAIN ","complete");
 	},
 	error: function(e){
 		console.error("MAIN ", "Got an error Retreving the database",e);
 	}
 });

}




function registerEventListeners(){
	$(window).keydown( function(e){
		// console.log("MAIN ","just pressed a key on the window", e);
		switch(e.which){
			case 38:
				// console.log("MAIN ",'UP');
				// posibility_two = new Possibility(  [10+( 10*(Math.cos(steps))),20 +( 10*Math.abs(Math.sin(steps))),9], [4.5, 20, 20], 0xdd77ff );
			break;
			default:
			break;
		}
			camera.lookAt(scene.position);
	});
}
