/**
	* Threejs.org
	*	this sets up a convinient way to structure the proyect
	*
	*/



/**
	* GLOBAL VARIABLES

	* - define global variables
	*/

var container
	,	stats
	;
secondScene = false;
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



var camera, trackball, scene, renderer, scene_two;

var cross;

var transitionParams = {
	"useTexture": false,
	"transition": 0,
	"transitionSpeed": 1.5,
	"texture": 5,
	"loopTexture": false,
	"animateTransition": true,
	"textureThreshold": 0.3
};
clock = new THREE.Clock();

init();
animate();


/**
	* I N I T
	* - we need three things:
	*
	* @method scene
	* @method camera
	* @method renderer
	*/

	function init() {
		// assign global values
		width = window.innerWidth;
		height = window.innerHeight;

		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: false } );
		renderer.setClearColor(0xaaaaaa ); //don't want it
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

		// world - create a scene
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0xcccccc, 0.0025 );
		scene.position.x = 0;
		scene.position.y = 0;
		scene.position.z = 0;
		var worldAxes = new THREE.AxisHelper(10);
		// scene.render = sceneRender.call(scene, clock.getDelta(), true);
		scene.add(worldAxes);


		scene_two = new THREE.Scene();
		scene_two.fog = new THREE.FogExp2( 0xa6cccc, 0.0025 );
		scene_two.position.x = 0;
		scene_two.position.y = 0;
		scene_two.position.z = 0;
		// scene_two.render = sceneRender.call(scene_two,  clock.getDelta(), true);
		scene_two.add(worldAxes);
		//camera
		//CombinedCamera breaks the DOM Events :(
		// camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 2000 );//
		camera = new THREE.CombinedCamera( width/ 2, height/ 2, 70, 1, 1000, - 500, 1000 );
		camera.position.x = 300;
		camera.position.y = 0;
		camera.position.z = 0;
		camera.lookAt(scene.position);
		var bgColor = new THREE.Color(LIGHT_GRAY);

// 		// lights
		var lighting    = new THREEx.ThreePointsLighting()
		scene.add(lighting)
		var light = new THREE.AmbientLight( 0x9d9d9d ); // soft white light
		scene.add( light );

console.log(scene.render);

		container = document.getElementById( 'container' );
		container.appendChild( renderer.domElement );

		// controls
		trackball = new THREE.TrackballControls( camera , renderer.domElement);
		trackball.rotateSpeed = 1.0;
		trackball.zoomSpeed = 1.2;
		trackball.panSpeed = 0.8;
		trackball.noZoom = false;
		trackball.noPan = false;
		trackball.staticMoving = true;
		trackball.dynamicDampingFactor = 0.3;
		trackball.keys = [ 65, 83, 68 ];
		trackball.addEventListener( 'change', render );
		//Orbit controls breaks: don't knwo why yet
		// trackball = new THREE.OrbitControls( camera );
		// trackball.damping = 0.2;
		// trackball.addEventListener( 'change', render );



		keyboard = new THREEx.KeyboardState();


		domEvents   = new THREEx.DomEvents(camera, renderer.domElement)
		console.log(camera)


		//
		window.addEventListener( 'resize', onWindowResize, false );
		//
		initStats();
		initRendererStats();
		console.log("Finished initialization");
	 	// renderer.render(scene, camera);

	 	try{
		 	init_app();
	 	}
	 	catch(e){
	 		console.warn(e.message+" better check it out");
	 	}
		// sceneA = new Scene( "cube", 5000, 1200, 120, new THREE.Vector3(0,-0.4,0), 0xffffff );
		// sceneB = new Scene( "sphere", 500, 2000, 50, new THREE.Vector3(0,0.2,0.1), 0x000000 );
		sceneA = new Scene( scene, camera );
		sceneB = new Scene( scene_two, camera);
		transition = new Transition(sceneA,sceneB);
		// transition = new	Transition(scene, scene_two);
		// render();

	}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	trackball.handleResize();
	render();
}

function animate() {
	// if(/Users/fdiazsmith/Documents/Tellart/sandbox/future_cone/src/scripts/main.js) console.log("just pressed KeyboardState");
	// steps+= gui_input.bouncingSpeed;
	// posibility_one.position.x = 20+( 10*(Math.cos(steps)));
	// posibility_one.position.y = 2 +( 10*Math.abs(Math.sin(steps)));


	TWEEN.update();
	trackball.update();
	render();
	requestAnimationFrame( animate );
}

function render() {
	// if(secondScene){
	// 	renderer.render( scene_two, camera );
	// }
	// else{
	// renderer.render( scene, camera );
	// }
	// console.log("dsas",scene);
	transition.render(clock.getDelta())

	stats.update();
	rendererStats.update(renderer);
}



function sceneRender( delta, rtt ) {
	console.log(this);
		// this.mesh.rotation.x += delta * this.rotationSpeed.x;
		// this.mesh.rotation.y += delta * this.rotationSpeed.y;
		// this.mesh.rotation.z += delta * this.rotationSpeed.z;

		// renderer.setClearColor( this.clearColor );

		if (rtt)
			renderer.render( this, camera, this.fbo, true );
		else
			renderer.render( this, camera );

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

makingStory = false;

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
	keyboard.domElement.addEventListener('keydown', function(event){
		if ( keyboard.eventMatches(event, 'left') ){
			// if (event.repeat) {
			// 	return;
			// }
			console.log("left", event)
		}
		if ( keyboard.eventMatches(event, 'right') ){
			console.log("right")
		}
		if ( keyboard.eventMatches(event, 'up') ){
			console.log("up")
		}
		if ( keyboard.eventMatches(event, 'down') ){
			console.log("down")
		}
		if ( keyboard.eventMatches(event, 'shift+a') ){
			if (event.repeat) {
				return;
			}
			makingStory = !makingStory;
			bio_silicone.newStory(makingStory)
		}
	});






	THREE.CombinedCamera.prototype.switchToOrtho = function () {
		console.log("IT WORKS");
		// Switches to the Orthographic camera estimating viewport from Perspective
		//
		// var fov = this.fov;
		// var aspect = this.cameraP.aspect;
		// var near = this.cameraP.near;
		// var far = this.cameraP.far;
		//
		// // The size that we set is the mid plane of the viewing frustum
		//
		// var hyperfocus = ( near + far ) / 2;
		//
		// var halfHeight = Math.tan( fov * Math.PI / 180 / 2 ) * hyperfocus;
		// var planeHeight = 2 * halfHeight;
		// var planeWidth = planeHeight * aspect;
		// var halfWidth = planeWidth / 2;
		//
		// halfHeight /= this.zoom;
		// halfWidth /= this.zoom;
		//
		// this.cameraO.left = -halfWidth;
		// this.cameraO.right = halfWidth;
		// this.cameraO.top = halfHeight;
		// this.cameraO.bottom = -halfHeight;





//
// 		// this.cameraO.left = -farHalfWidth;
// 		// this.cameraO.right = farHalfWidth;
// 		// this.cameraO.top = farHalfHeight;
// 		// this.cameraO.bottom = -farHalfHeight;
// 		//
// 		// this.cameraO.left = this.left / this.zoom;
// 		// this.cameraO.right = this.right / this.zoom;
// 		// this.cameraO.top = this.top / this.zoom;
// 		// this.cameraO.bottom = this.bottom / this.zoom;

		this.cameraO.updateProjectionMatrix();

		// this.near = this.cameraO.near;
		// this.far = this.cameraO.far;
		this.projectionMatrix = this.cameraO.projectionMatrix;

		this.inPerspectiveMode = false;
		this.inOrthographicMode = true;

	};
