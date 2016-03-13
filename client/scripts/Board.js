
/**
	* Board is esentially the enviroment. Created with THREE.js
	* It creates and controls the scenes
	* TODO:
	* - [ ] Consider passing paremeters to the board
	*
	* @class Board
	* @constructor
	*/

var Board = function(){
	//Public
	self = this;

  //Private
  var container, stats;
  var camera, scene, raycaster, renderer;

  var mouse = new THREE.Vector2(), INTERSECTED;
  var radius = 500, theta = 0;
  var frustumSize = 1000;

  self.init();
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

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
  camera.position.x = 50;//radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.y = 50;//radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.z = 50;//radius * Math.cos( THREE.Math.degToRad( theta ) );

  scene = new THREE.Scene();

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );

  // var cubeGeometry = new THREE.BoxGeometry( 100, 100, 100 );
  var cubeGeometry = cube( 50 ); //it has to use this function because otherwise it does not display all edges.

  cubeGeometry.computeLineDistances();
  // geometrySpline.computeLineDistances();

  // var object = new THREE.Line( geometrySpline, new THREE.LineDashedMaterial( { color: 0xffffff, dashSize: 1, gapSize: 0.5 } ) );

  // objects.push( object );
  // scene.add( object );

  var object = new THREE.LineSegments( cubeGeometry, new THREE.LineDashedMaterial( { color: 0xAAAAAA, dashSize: 3, gapSize: 3, linewidth: 1 } ) );

  // objects.push( object );
  scene.add( object );
  // var cubeObject = new THREE.Mesh(cubeGeometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
  // cubeObject.position.x = 0;//Math.random() * 800 - 400;
  // cubeObject.position.y = 0;//Math.random() * 800 - 400;
  // cubeObject.position.z = 0;//Math.random() * 800 - 400;

  // cubeObject.rotation.x = 0;//Math.random() * 2 * Math.PI;
  // cubeObject.rotation.y = 0;//Math.random() * 2 * Math.PI;
  // cubeObject.rotation.z = 0;//Math.random() * 2 * Math.PI;

  // cubeObject.scale.x = 1;//Math.random() + 0.5;
  // cubeObject.scale.y = 1;//Math.random() + 0.5;
  // cubeObject.scale.z = 1;//Math.random() + 0.5;

    // scene.add( cubeObject );




  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.sortObjects = false;
  container.appendChild(renderer.domElement);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );
};


/**
  * Create all the verizes necessary for a wireframe cube to display correctly.
  * @method cube
  * @param {INT} - size. size of the cube to make
  * @return {THREE.Geometry}
  */
Board.prototype.cube = function ( size ) {

	var h = size * 0.5;

	var geometry = new THREE.Geometry();

	geometry.vertices.push(
		new THREE.Vector3( -h, -h, -h ),
		new THREE.Vector3( -h, h, -h ),

		new THREE.Vector3( -h, h, -h ),
		new THREE.Vector3( h, h, -h ),

		new THREE.Vector3( h, h, -h ),
		new THREE.Vector3( h, -h, -h ),

		new THREE.Vector3( h, -h, -h ),
		new THREE.Vector3( -h, -h, -h ),


		new THREE.Vector3( -h, -h, h ),
		new THREE.Vector3( -h, h, h ),

		new THREE.Vector3( -h, h, h ),
		new THREE.Vector3( h, h, h ),

		new THREE.Vector3( h, h, h ),
		new THREE.Vector3( h, -h, h ),

		new THREE.Vector3( h, -h, h ),
		new THREE.Vector3( -h, -h, h ),

		new THREE.Vector3( -h, -h, -h ),
		new THREE.Vector3( -h, -h, h ),

		new THREE.Vector3( -h, h, -h ),
		new THREE.Vector3( -h, h, h ),

		new THREE.Vector3( h, h, -h ),
		new THREE.Vector3( h, h, h ),

		new THREE.Vector3( h, -h, -h ),
		new THREE.Vector3( h, -h, h )
	);

	return geometry;
};

/**
  * On window resize. take appropriate action.
  * @method onWindowResize
  */
Board.prototype.onWindowResize = function onWindowResize() {

	var aspect = window.innerWidth / window.innerHeight;

	camera.left   = - frustumSize * aspect / 2;
	camera.right  =   frustumSize * aspect / 2;
	camera.top    =   frustumSize / 2;
	camera.bottom = - frustumSize / 2;

	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
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
  * Animate THREE js scene
  * @method animate
  */
Board.prototype.animate = function () {
	requestAnimationFrame( animate );

	render();
	stats.update();
};

/**
  * Render THREE js scene
  * @method render
  */
Board.prototype.render = function () {		
	// theta = 0.2;
	// camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	// 	camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	// 	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );

	camera.lookAt( scene.position );

	camera.updateMatrixWorld();

	// find intersections

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0xff0000 );

		}

	} else {

		// if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;

	}

	renderer.render( scene, camera );

};


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
    // scene.add(this.sprite);
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
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	return camera.position.clone().add( dir.multiplyScalar( distance ) );
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
	rendererStats   = new THREEx.RendererStats()
	rendererStats.domElement.style.position = 'absolute'
	rendererStats.domElement.style.left = '0px'
	rendererStats.domElement.style.bottom   = '0px'
	document.body.appendChild( rendererStats.domElement )
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

