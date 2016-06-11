Deck = function(){
  Board.call(this);
  // Public
  var self = this;
  self.size = 81;

  // Private


  dddd = new self.card(self.feature(1,0,1,2));


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
  // P R I V A T E
  var cubeSize = 50;
  var radius = cubeSize/2;
  var height = 5;
  var segments = _f.shape == "circle"? 32 : _f.shape == "triangle" ? 3 :5;
  var numberShapes = _f.number;
  var domEvents   = new THREEx.DomEvents(self.camera, self.renderer.domElement);

  //Create a collection of 3D objects that will be the card
  group = new THREE.Object3D();
  var backgroundGeometry = self.cube( cubeSize ); //it has to use this function because otherwise it does not display all edges.
  backgroundGeometry.computeLineDistances();
  background = new THREE.LineSegments( backgroundGeometry, new THREE.LineDashedMaterial( { color: 0xAAAAAA, dashSize: 3, gapSize: 3, linewidth: 1 } ) );
  background.name = "background_wireframe_cube";
  group.add( background );
  //Place a cube that is transparent but will ensure every click counts
  clickAreaGeometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
  var transparentMaterial = new THREE.MeshBasicMaterial( {color: 0xBADA55,transparent: true, opacity: 0} );
  var clickCube = new THREE.Mesh( clickAreaGeometry, transparentMaterial );
  group.add( clickCube );
  // it might be possible to do all three shapes with the cilinder
  // REFERENCE: http://threejs.org/docs/index.html#Reference/Extras.Geometries/CylinderGeometry
  var geometry = new THREE.CylinderGeometry( radius*0.8, radius*0.8, height, segments , 1,false, 0);
  var material = new THREE.MeshLambertMaterial( { color: 0xff00AA, overdraw: 0.5 ,side: THREE.DoubleSide} );
  //Create a line that goes from oposite vertices in the cube

  var axisMaterial = new THREE.LineBasicMaterial({color: 0xff0033, linewidth: 2});
  axisGeometry = new THREE.Geometry();
  axisGeometry.vertices.push(	new THREE.Vector3( -cubeSize/2, -cubeSize/2, -cubeSize/2 ),	new THREE.Vector3( cubeSize/2, cubeSize/2, cubeSize/2 )  );
  cubeDiagonalAxis= new THREE.Line( axisGeometry, axisMaterial );
  group.add(cubeDiagonalAxis);

  axisGeometry_middle = new THREE.Geometry();
  axisGeometry_middle.vertices.push(	new THREE.Vector3( 20, 20, 20 ),	new THREE.Vector3( cubeSize/2, cubeSize/2, cubeSize/2 )  );
  var cubeDiagonalAxis_middle= new THREE.Line( axisGeometry_middle, axisMaterial );
  group.add(cubeDiagonalAxis_middle)
  // position each shape in the correct face depending on the number of shapes in the card.
  switch(numberShapes){
    case 1:
      shape = new THREE.Mesh( geometry, material );
      shape.name = "shape";
      shape.position.x = 0;//cubeSize/2;
      shape.position.y = -cubeSize/2 + height/2;
      shape.position.z = 0;//cubeSize/2;
      shape.rotation.y = -0.404;
      group.add( shape );
    break;
    case 2:
      shape = new THREE.Mesh( geometry, material );
      shape.name = "shape";
      shape.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2)
      shape.position.x = 0;//cubeSize/2;
      shape.position.y = 0;
      shape.position.z = -cubeSize/2 + height/2;
      shape.rotation.y = -0.404;
      group.add( shape );
      shape = new THREE.Mesh( geometry, material );
      shape.name = "shape";
      shape.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI/2)
      shape.position.x = -cubeSize/2 + height/2;
      shape.position.y = 0;//cubeSize/2;
      shape.position.z = 0;//cubeSize/2;
      shape.rotation.x = -0.404;
      group.add( shape );
    break;
    case 3:
      shape = new THREE.Mesh( geometry, material );
      shape.name = "shape";
      shape.position.x = 0;//cubeSize/2;
      shape.position.y = -cubeSize/2 + height/2;
      shape.position.z = 0;//cubeSize/2;
      shape.rotation.y = -0.404;
      group.add( shape );
      shape = new THREE.Mesh( geometry, material );
      shape.name = "shape";
      shape.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2)
      shape.position.x = 0;//cubeSize/2;
      shape.position.y = 0;
      shape.position.z = -cubeSize/2 + height/2;
      shape.rotation.y = -0.404;
      group.add( shape );
      shape = new THREE.Mesh( geometry, material );
      shape.name = "shape";
      shape.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI/2)
      shape.position.x = -cubeSize/2 + height/2;
      shape.position.y = 0;//cubeSize/2;
      shape.position.z = 0;//cubeSize/2;
      shape.rotation.x = -0.404;
      group.add( shape );
    break;
  }

  //rotate the card so that is has an iso view to the camera.
  group.rotation.x = 0.62;
  group.rotation.y = -0.785;
  //lastly add the card to the scene

  group.name = "card";
  domEvents.addEventListener(group, 'click', function(event){
      console.log('you clicked on the mesh',event)
      // alert("hi");
  }, false);



self.scene.add( group );

/**
  * D E V  G U I
  * Add controls to dat gui if it is available.
  *
  */
  if(self.gui !== null){
    var GUI_CONTENT_1 = function(){
      this.radius = 1;
      this.height = 1;
      this.shape = 0;
      this.pos_x = 0.01;    this.pos_y = 0.01;  this.pos_z = 0.01;
      this.bg_x = 0;        this.bg_y = 0;      this.bg_z = 0;
      this.rot_x = 0.01;    this.rot_y = 0.01;  this.rot_z = 0.01;
      this.axis_x = 0.001;  this.axis_y = 0.001; this.axis_z = 0.001;
      this.axis_di = 0.001;
    }
    self.guiVal_1 = new GUI_CONTENT_1();

    self.f2 = self.gui.addFolder('CARD');
    self.f2.add(self.guiVal_1, "radius", -0, 3).name("radius XZ").onChange(function(val){
                shape.scale.x = val; shape.scale.z = val;});
    self.f2.add(self.guiVal_1, "height", -0, 4).name("Height Y").onChange(function(val){
                shape.scale.y = val; });
    self.f2.add(self.guiVal_1, "shape", [0,1,2]).name("choose shape").onChange(function(val){
                shape.scale.y = val; });
    self.f2.add(self.guiVal_1, "pos_x", -1.0, 1.0).name("shape rotat X").onChange(function(val){
              group.children[group.children.length-1 - self.guiVal_1.shape].rotation.x = val; });
    self.f2.add(self.guiVal_1, "pos_y", -1.0, 1.0).name("shape rotat Y").onChange(function(val){
                group.children[group.children.length-1 - self.guiVal_1.shape].rotation.y = val; });
    self.f2.add(self.guiVal_1, "pos_z", -1.0, 1.0).name("shape rotat Z").onChange(function(val){
                group.children[group.children.length-1 - self.guiVal_1.shape].rotation.z = val; });

    self.f2.add(self.guiVal_1, "bg_x", -300, 300).name("card x").onChange(function(val){
                group.position.x = val;});
    self.f2.add(self.guiVal_1, "bg_y", -300, 300).name("card y").onChange(function(val){
                group.position.y = val;});
    self.f2.add(self.guiVal_1, "bg_z", -300, 300).name("card z").onChange(function(val){
                group.position.z = val;});
    self.f2.add(self.guiVal_1, "rot_x", -1.0, 1.0).name("rotation x").onChange(function(val){
                group.rotation.x = val;});
    self.f2.add(self.guiVal_1, "rot_y", -1.0, 1.0).name("rotation y").onChange(function(val){
                group.rotation.y = val;});
    self.f2.add(self.guiVal_1, "rot_z", -1.0, 1.0).name("rotation z").onChange(function(val){
                group.rotation.z = val;});
    self.f2.add(self.guiVal_1, "axis_x").name("rot on Axis").onChange(function(val){
                // group.rotateOnAxis(new THREE.Vector3(0.62,-0.785,0), val);
                arrowHelper.setDirection(new THREE.Vector3(val,0,0));
              });

    self.f3 = self.gui.addFolder("Rotations on Card")
    self.f3.add(self.guiVal_1,"axis_x", -1.0,1.0).onChange(function(val){
                });
    self.f3.add(self.guiVal_1,"axis_y", -100,100).name("rotate on axisy").onChange(function(val){
                // group.rotateY(THREE.Math.degToRad(val) );
                group.rotateOnAxis(new THREE.Vector3(0,1,0),THREE.Math.degToRad(val));
                });
    self.f3.add(self.guiVal_1,"axis_x", -100,100).onChange(function(val){
                group.rotateOnAxis(axisGeometry_middle.vertices[1].normalize(),THREE.Math.degToRad(val))});

    self.f3.add(self.guiVal_1,"axis_di", -360,360).name("Diagonal axis").onChange(function(val){
                group.rotateOnAxis(cubeDiagonalAxis.geometry.vertices[1].normalize(),THREE.Math.degToRad(val))});
    self.f3.open();
  }
  // return the 3D group representing the card.
  return group;
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
