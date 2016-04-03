
/**
	* Board is esentially the enviroment. Created with THREE.js
	* It creates and controls the self.scenes
	* TODO:
	* - [ ] Consider passing paremeters to the board
	* - [ ] check this example : http://threejs.org/examples/#canvas_camera_orthographic
  * NOTE: Classes need to be declared as global for them to be "viewed" by other files.
	* @class Board
	* @constructor
	*/

Board = function(){
	//Private
	var container, stats;
	var raycaster;

	mouse = new THREE.Vector2();
	INTERSECTED = false;

	var radius = 500, theta = 0;
	frustumSize = 1000;

	//Public
	self = this;
  self.camera;
  self.scene;

	self.renderer;
  self.init();
  self.animate();

	self.gui = new dat.GUI();

	if(self.gui !== null ){
		self.setUpGUI();
		var axisHelper = new THREE.AxisHelper( 150 );
		self.scene.add( axisHelper );
	}
  console.log("Board initialized");
};


/**
  * Initializes THREE.js environment
  * @method init
  * @param {String} - first_argument. sorting algorithm to choose from
  */
Board.prototype.init = function(first_argument) {

		container = document.createElement( 'div' );
		document.body.appendChild( container );

		self.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
		self.camera.position.x = 0;
		self.camera.position.y = 0;
		self.camera.position.z = 200;
		self.scene = new THREE.Scene();

		// Cubes
		// var geometry = new THREE.BoxGeometry( 50, 50, 50 );
		// var material = new THREE.MeshLambertMaterial( { color: 0xff0000, overdraw: 0.5 } );
		//
		// 	var cube = new THREE.Mesh( geometry, material );
		// 	cube.scale.y = Math.floor( Math.random() * 2 + 1 );
		// 	cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
		// 	cube.position.y = ( cube.scale.y * 50 ) / 2;
		// 	cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
		// 	self.scene.add( cube );

		// Lights
		var ambientLight = new THREE.AmbientLight( 0x404040 );
		self.scene.add( ambientLight );
		self.directionalLight1 = new THREE.DirectionalLight( 0xffffff );
		self.directionalLight1.position.x = 0;
		self.directionalLight1.position.y = 0;
		self.directionalLight1.position.z = 444;
		self.directionalLight1.position.normalize();
		self.scene.add( self.directionalLight1 );
		self.directionalLight2 = new THREE.DirectionalLight( 0xffffff );
		self.directionalLight2.position.x = -100;
		self.directionalLight2.position.y = -100;
		self.directionalLight2.position.z = -100;
		self.directionalLight2.position.normalize();
		// self.scene.add( self.directionalLight2 );


		self.renderer = new THREE.WebGLRenderer();
		self.renderer.setClearColor( 0xf0f0f0 );
		self.renderer.setPixelRatio( window.devicePixelRatio );
		self.renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( self.renderer.domElement );
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );
		//
		// window.addEventListener( 'resize', onWindowResize, false );

  //TODO: fix these reference error
  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  // window.addEventListener( 'resize', onWindowResize, false );
};



/**
  * On window resize. take appropriate action.
  * @method onWindowResize
  */
Board.prototype.onWindowResize = function onWindowResize() {

	var aspect = window.innerWidth / window.innerHeight;

	self.camera.left   = - frustumSize * aspect / 2;
	self.camera.right  =   frustumSize * aspect / 2;
	self.camera.top    =   frustumSize / 2;
	self.camera.bottom = - frustumSize / 2;

	self.camera.updateProjectionMatrix();

	self.renderer.setSize( window.innerWidth, window.innerHeight );
};

/**
  * Handle mouse event
  * @method onDocumentMouseMove
  * @param {Bool} - event.
  */
Board.prototype.onDocumentMouseMove = function ( event ) {
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
};


/**
  * Animate THREE js self.scene
  * @method animate
  */
Board.prototype.animate = function () {
	requestAnimationFrame( self.animate );
	stats.begin();
	self.render();
	stats.update();
};

/**
  * Render THREE js self.scene
  * @method render
  */
Board.prototype.render = function () {
	var timer = Date.now() * 0.0001;
	// self.camera.position.x = Math.cos( timer ) * 200;
	// self.camera.position.z = Math.sin( timer ) * 200;
	self.camera.lookAt( self.scene.position );
	self.renderer.render( self.scene, self.camera );
	// theta = 0.2;
	// self.camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	// 	self.camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	// 	self.camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );

	// self.camera.lookAt( self.scene.position );
	//
	// self.camera.updateMatrixWorld();
	//
	// // find intersections
	//
	// raycaster.setFromCamera( mouse, self.camera );
	//
	// var intersects = raycaster.intersectObjects( self.scene.children );

	// if ( intersects.length > 0 ) {

	// 	if ( INTERSECTED != intersects[ 0 ].object ) {

	// 		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

	// 		INTERSECTED = intersects[ 0 ].object;
	// 		INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
	// 		INTERSECTED.material.emissive.setHex( 0xff0000 );

	// 	}

	// } else {

	// 	// if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

	// 	INTERSECTED = null;

	// }

	// self.renderer.render( self.scene, self.camera );

};

/**
  * Dat GUI
  * @method datGui
  */
Board.prototype.setUpGUI = function () {
	var GUI_CONTENT = function(){
		this.cam_x = 0;
		this.cam_y = 0;
		this.cam_z = 200;
		this.light1_x = 100;
		this.light1_y = 100;
		this.light1_z = 100;
		this.light2_x = 100;
		this.light2_y = 100;
		this.light2_z = 100;

	}
	self.guiVal = new GUI_CONTENT();

	self.f1 = self.gui.addFolder('CAMERA');
	self.f1.add(self.guiVal, "cam_x", -400, 400).name("Camera X").onChange(function(val){
							self.camera.position.x = val; });
	self.f1.add(self.guiVal, "cam_y", -400, 400).name("Camera Y").onChange(function(val){
							self.camera.position.y = val; });
	self.f1.add(self.guiVal, "cam_z", -400, 400).name("Camera Z").onChange(function(val){
							self.camera.position.z = val; });

	self.f13 = self.gui.addFolder('LIGHTS');
	self.f13.add(self.guiVal, "light1_x", -400, 400).name("Light X").onChange(function(val){ console.log(self.directionalLight1)
							self.directionalLight1.position.x = val; });
	self.f13.add(self.guiVal, "light1_y", -400, 400).name("Light Y").onChange(function(val){
							self.directionalLight1.position.y = val; });
	self.f13.add(self.guiVal, "light1_z", -400, 400).name("Light Z").onChange(function(val){
							self.directionalLight1.position.z = val; });
	self.f13.add(self.guiVal, "light2_x", -400, 400).name("Light X").onChange(function(val){
							self.directionalLight2.position.x = val; });
	self.f13.add(self.guiVal, "light2_y", -400, 400).name("Light Y").onChange(function(val){
							self.directionalLight2.position.y = val; });
	self.f13.add(self.guiVal, "light2_z", -400, 400).name("Light Z").onChange(function(val){
							self.directionalLight2.position.z = val; });

	// self.f13.open();
}
/**
	*________________________________________________________________________________
	*/

// source : http://stackoverflow.com/questions/23514274/three-js-2d-text-sprite-labels
function TextSprite( message, parameters ) {
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };
    var position = parameters.hasOwnProperty("position") ?parameters["position"] : [ 0, 0, 0 ];
    var fontWeight = parameters.hasOwnProperty("fontWeight") ?parameters["fontWeight"] : "";

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.font = fontWeight +' '+ fontsize + "px " + fontface;
    var metrics = this.context.measureText( message );
    var textWidth = metrics.width;

    this.context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    this.context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    this.context.lineWidth = borderThickness;
    //don't round that is heidious
    // roundRect(this.context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

    this.context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    this.context.fillText( message, borderThickness, fontsize + borderThickness);

    var texture = new THREE.Texture(this.canvas)
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
    this.sprite = new THREE.Sprite( spriteMaterial );
    this.sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);

    this.sprite.position.set( position[0],position[1],position[2] );
    // self.scene.add(this.sprite);
    // console.log(this.sprite);
    // return sprite;
}

function roundRect(ctx, x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
		ctx.stroke();
}


var clickToWorldCoord = function(event){

	var vector = new THREE.Vector3();
	vector.set(
	    ( event.clientX / window.innerWidth ) * 2 - 1,
	    - ( event.clientY / window.innerHeight ) * 2 + 1,
	    0.5 );
		console.log(vector);
	vector.unproject( self.camera );
	var dir = vector.sub( self.camera.position ).normalize();
	var distance = - self.camera.position.z / dir.z;
	return self.camera.position.clone().add( dir.multiplyScalar( distance ) );
}
// Rotate an object around an arbitrary axis in object space
var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    object.matrix.multiply(rotObjectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
}

var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}

// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
}
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
	* 	helper libs
	*/

function initStats() {
    stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output").appendChild( stats.domElement );
    return stats;
}
function initRendererStats(){
	self.rendererStats   = new THREEx.RendererStats()
	self.rendererStats.domElement.style.position = 'absolute'
	self.rendererStats.domElement.style.left = '0px'
	self.rendererStats.domElement.style.bottom   = '0px'
	document.body.appendChild( self.rendererStats.domElement )
}
// handle keydown, return early if event is an autorepeat
	// keyboard.domElement.addEventListener('keydown', function(event){
	// 	if ( keyboard.eventMatches(event, 'left') ){
	// 		// if (event.repeat) {
	// 		// 	return;
	// 		// }
	// 		console.log("left", event)
	// 	}
	// 	if ( keyboard.eventMatches(event, 'right') ){
	// 		console.log("right")
	// 	}
	// 	if ( keyboard.eventMatches(event, 'up') ){
	// 		console.log("up")
	// 	}
	// 	if ( keyboard.eventMatches(event, 'down') ){
	// 		console.log("down")
	// 	}
	// 	if ( keyboard.eventMatches(event, 'shift+a') ){
	// 		if (event.repeat) {
	// 			return;
	// 		}
	// 		makingStory = !makingStory;
	// 		bio_silicone.newStory(makingStory)
	// 	}
	// });
