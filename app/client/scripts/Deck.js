Deck = function(){
  Board.call(this);
  // Public
  var self = this;
  self.size = 81;

  // Private
  console.log(self)

  dddd = new self.card(self.feature(1,1,0,0));


  console.log("Created new Deck");
};

Deck.prototype = Object.create(Board.prototype);
Deck.prototype.constructor = Deck;


Deck.prototype.colors   = ["orange", "green"  , "blue"    ];
Deck.prototype.shapes   = ["triangle" , "circle" , "pentagon" ];
Deck.prototype.fills    = ["solid" ,  "hashed", "none"  ];
Deck.prototype.number   = [1,2,3];
Deck.prototype.feature = function(one,two,three,four){
  return {
  "color" :self.colors[one],
  "shape" :self.shapes[two],
  "fill"  :self.fills[three],
  "number":self.number[four]
  }
}

/**
  * Create all the verizes necessary for a wireframe cube to display correctly.
  * @method cube
  * @param {INT} - size. size of the cube to make
  * @return {THREE.Geometry}
  */
Deck.prototype.cube = function ( size ) {

	var h = size * 0.5;

	var geometry = new THREE.Geometry();
  //comment out the vertices necessary to only show three faces
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

		// new THREE.Vector3( -h, h, h ),
		// new THREE.Vector3( h, h, h ),

		// new THREE.Vector3( h, h, h ),
		// new THREE.Vector3( h, -h, h ),

		new THREE.Vector3( h, -h, h ),
		new THREE.Vector3( -h, -h, h ),

		new THREE.Vector3( -h, -h, -h ),
		new THREE.Vector3( -h, -h, h ),

		new THREE.Vector3( -h, h, -h ),
		new THREE.Vector3( -h, h, h ),

		// new THREE.Vector3( h, h, -h ),
		// new THREE.Vector3( h, h, h ),

		new THREE.Vector3( h, -h, -h ),
		new THREE.Vector3( h, -h, h )
	);

	return geometry;
};

Deck.prototype.card = function(_f){
  console.log(_f);
  //create the background
  this.radius = 35;
  this.height = 10;
  this.segments = _f.shape == "circle"? 32 : _f.shape == "triangle" ? 3 :5;

  var backgroundGeometry = self.cube( 50 ); //it has to use this function because otherwise it does not display all edges.
  backgroundGeometry.computeLineDistances();
  var background = new THREE.LineSegments( backgroundGeometry, new THREE.LineDashedMaterial( { color: 0xAAAAAA, dashSize: 3, gapSize: 3, linewidth: 1 } ) );
  // it might be possible to do all three shapes with the cilinder
  // http://threejs.org/docs/index.html#Reference/Extras.Geometries/CylinderGeometry
  var geometry = new THREE.CylinderGeometry( this.radius, this.radius, this.height, this.segments );
  var material = new THREE.MeshBasicMaterial( {color: 0xcccccc} );
  var cylinder = new THREE.Mesh( geometry, material );

  //call the board scene. through prototypes!
  self.scene.add( cylinder );
  self.scene.add( background );
}











// // example of how to inherit from other Classes
// // Shape - superclass
// Shape = function() {
//   this.x = 0;
//   this.y = 0;
// }
//
// // superclass method
// Shape.prototype.move = function(x, y) {
//   this.x += x;
//   this.y += y;
//   console.info('Shape moved.');
// };
//
// // Rectangle - subclass
// Rectangle = function () {
//   Shape.call(this); // call super constructor.
// }
//
// // subclass extends superclass
// Rectangle.prototype = Object.create(Shape.prototype);
// Rectangle.prototype.constructor = Rectangle;
//
// rect = new Rectangle();
//
// console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle);// true
// console.log('Is rect an instance of Shape?', rect instanceof Shape);// true
