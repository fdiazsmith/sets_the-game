/**
	* Possibility
	*
	* A Possibility represents a possible future event
	*
	* TODO:
	* -[ ] Add a special type of Geometry for Today Possibility?
	* -[ ] Research what it would take to get a Stellated polyhedra in THREEjs
	* -[ ] Display likes, and other information.
	* -[ ] Standarize database with the code.
	*/


/**
	* Use a constructor function to create the Possibility Class
	* (it creates and empty object and populates it)
	*
	* @class Possibility
	* @constructor
	*/
var Possibility = function(){
	//adding properties for the Possibility Object
	//flag that will eventrually control the visibility of the possibility.
	self = this;
		//private usage of position
	self._position = new THREE.Vector3(0,0,0);
	self.size = {};
	self.parent;
	self.inStories = [];
	self.geometry =	self.sphereGeometry;//new THREE.SphereGeometry( self.size.radius, self.size.widthSegments, self.size.heightSegments);
	/**
		* This is the equivalent of having multiple contructor
		* functions based on the number of arguments
		*/
	switch(arguments.length){
				case 0 : madeByUser();
            break;
        case 1 : madeWithObject(arguments[0])
            break;
        default: madeByComputer(arguments[0],arguments[1],arguments[2]);
        		break;
	}

	/**	Constructor function
		* - A generic basic way to create events and populate them.
		*
		* @param _position - [x,y,z] array of x, y, z OR x, y, z constructed as an object.
		* @param size - [r,w,h] array of r, w, h, OR object
		* @param color 		- 0x7777ff color in hexadecimal notation
		*/
	function madeByComputer(pos, size, color){
		self.active = true;
		self.color = color;
		self.size = {};
		self.size.radius  = 10;
		self.size.widthSegments = 10;
		self.size.heightSegments  = 10;
		if(Array.isArray(pos)){
			self._position.x = pos[0];
			self._position.y = pos[1];
			self._position.z = pos[2];
		}else{
			self._position = pos;
		}
		if(Array.isArray(size)){
			self.size.radius  = size[0];
			self.size.widthSegments = size[1];
			self.size.heightSegments  = size[2];
		}
		else {
			self.size = size;
		}

	}
	function madeByUser(){}

	/**	Constructor function
		* - This what the user call to create a new possibility
		*
		* @param parameters - [x,y,z] array of x, y, z OR x, y, z constructed as an object.
		*/
	function madeWithObject(parameters){
		/**
			* An object can be used for constructor
			*
			* @property parameters
			* @type {Object}
			* @param {Object} [active] booelan
			* @param {Object} [color] in hexadecimal
			* @param {Object} [size] size of the circle
			* @param {Object} [name] name of this Possibilityf
			* @param {Object} [description] description for the Possibility
			* @param {Object} [position] Position
			* @param {Object} [geometry] platonic Solid
			* @param {Object} [Object]	parent
			* @param {Object} [String] id
			* @param {Object} [String] description
			* @param {Object} [String] shape
			* @param {Object} [int] likes
			* @param {Object} [String] category
			* @param {Object} [int] quadrant
			* @param {Object} [String] cone_category
			* @param {Object} [int] speed
			* @param {Object} [int] size
			*/
		// console.log("Using parameters", parameters);
		self.__proto__ = (parameters.hasOwnProperty("parent"))? $.extend(self.__proto__, parameters["parent"])  : function(){};
		// console.log("color", parameters["color"]);
		self.active = (parameters.hasOwnProperty("active"))? parameters["active"] : true;
		self.color = (parameters.hasOwnProperty("color"))? parseInt(parameters["color"], 16) :0xEEEEEE// : 0xEEEEEE;
		self.size.radius  = (parameters.hasOwnProperty("radius"))? parameters["radius"] : 10;
		self._ID  = (parameters.hasOwnProperty("id"))? parameters["id"] : self.makeID();
		self.size.widthSegments = (parameters.hasOwnProperty("widthSegments"))? parameters["widthSegments"] : 10;
		self.size.heightSegments  = (parameters.hasOwnProperty("heightSegments"))? parameters["heightSegments"] : 10;

		self.name = (parameters.hasOwnProperty("name"))? parameters["name"] : "name less event";
		self.description = (parameters.hasOwnProperty("description"))? parameters["description"] : "";

		self.geometry = (parameters.hasOwnProperty("shape"))? self[parameters.shape]: self.sphereGeometry;

		self.year  = (parameters.hasOwnProperty("year"))? parameters["year"] : 10;
		self.speed  = (parameters.hasOwnProperty("speed"))? parameters["speed"] : 10000;

		self._position.x = (parameters.hasOwnProperty("parent"))? self.yearToPosition(self.year): 10;
		var belongsToCone = {}
		for (var i = self.parentCone.children.length ; i > 0   ; i--) {
			belongsToCone[self.parentCone.children[i-1].name] ={}
			belongsToCone[self.parentCone.children[i-1].name].radiusMax  = self.parentCone.children[i-1].geometry.parameters.radiusTop;
			belongsToCone[self.parentCone.children[i-1].name].radiusMin  = self.parentCone.children[i] !== undefined ? self.parentCone.children[i].geometry.parameters.radiusTop : 0 ;
		};


		self.cone  = {
			name: (parameters.hasOwnProperty("cone_category"))? parameters['cone_category'].toLowerCase() : "na",
			radiusMax : (parameters.hasOwnProperty("cone_category"))?  belongsToCone[ parameters['cone_category'] ].radiusMax : getRandomArbitrary(0,50) ,
			radiusMin : (parameters.hasOwnProperty("cone_category"))?  belongsToCone[ parameters['cone_category'] ].radiusMin : getRandomArbitrary(0,50) ,
			angle: function(){ return  Math.atan(this.radiusMax/self.coneLength) },
			}
		var radiusFrontFacing = getRandomArbitrary(self.cone.radiusMin, self._position.x*Math.sin(	self.cone.angle() ) )  ;
		var _quadMinMax =[
			{min: 0, max: Math.PI/2},
			{min: Math.PI/2, max: Math.PI },
			{min: Math.PI , max: ( 3 * Math.PI )/2},
			{min: ( 3 * Math.PI )/2, max: 2*Math.PI}
		];
		self.quadrant = (parameters.hasOwnProperty("quadrant"))? getRandomArbitrary(_quadMinMax[parameters["quadrant"]].min,_quadMinMax[parameters["quadrant"]].max )  : getRandomArbitrary(0, 2 * Math.PI );

		self._position.y = (parameters.hasOwnProperty("posY"))? parameters["posY"]: radiusFrontFacing * Math.sin(self.quadrant) ;
		self._position.z = (parameters.hasOwnProperty("posZ"))? parameters["posZ"]: radiusFrontFacing * Math.cos(self.quadrant) ;

		if(parameters.hasOwnProperty("position")) self._position =  parameters["position"];


	}

	self.material = new THREE.MeshBasicMaterial({
			transparent: false,
			// opacity: 0.25,
			// side :THREE.DoubleSide ,
			// combine: THREE.MixOperation,
			// reflectivity: 0.2
			vertexColors: THREE.VertexColors,
			depthTest: true,
			depthWrite: true,
			// wireframe: true,
			color: self.color
	});
	self.materials =[
		new THREE.MeshLambertMaterial({transparent: false,shading: THREE.FlatShading,vertexColors: THREE.VertexColors,depthTest: true,depthWrite: true,color: self.color}),
		new THREE.MeshBasicMaterial({transparent: true,vertexColors: THREE.VertexColors,depthTest: true,depthWrite: true,wireframe: true,color: self.color})
	]
	//
	// self.mesh = new THREE.Mesh( self.geometry, self.material );
	//this throws and error
	self.mesh = (self.geometry.type === "SphereGeometry" )? new THREE.Mesh( self.geometry, self.material ): THREE.SceneUtils.createMultiMaterialObject( self.geometry, self.materials );
	self.mesh.position.x = self._position.x;
	self.mesh.position.y = self._position.y;
	self.mesh.position.z = self._position.z;
	self.mesh.castShadow = true;
	// self._ID = self.mesh.id;
	self.position = self.mesh.position;

	// self
	self.rotateAnim();

	self.addDomEventListener();

	scene.add( self.mesh );
	// console.log(self);

};


/**
	* second constructor
	*
	* @class Possibility
	* @constructor
	*/
Possibility.prototype.constructor = Possibility;
Possibility.prototype.P = Possibility;

Possibility.prototype.getInput = function(name, date){
	// console.log("getInput ",name, date);
}
// basicGeometry =
Possibility.prototype.sphereGeometry =	new THREE.SphereGeometry( 1.5, 10,10);
Possibility.prototype.dodecahedronGeometry =	new THREE.DodecahedronGeometry(2);
Possibility.prototype.icosahadronGeometry =	new THREE.IcosahedronGeometry( 2);
Possibility.prototype.octahedronGeometry =	new THREE.OctahedronGeometry( 2);
Possibility.prototype.tetrahedronGeometry =	new THREE.TetrahedronGeometry( 2);

/**
	* @method addDomEventListener
	*/
Possibility.prototype.addDomEventListener = function(){
	var thisSelf = this;
	// thisSelf.mesh.on('click', function(){
	// 	console.log("clicked on mesh");
	// })
	// domEvents.bind(thisSelf.mesh, 'click', function(event){
	// 	console.log("event from within",  this, event);
	// 	thisSelf.showContent(event);
	// })
	domEvents.addEventListener(thisSelf.mesh, 'click', function(event){
		// console.log("event from within",  this, event);
		thisSelf.showContent(event);
	});
}

/**
	* Creates a unique alpha numeric ID for each Possibility
	*
	* @method makeID
	* @return {text} Retruns the Unique ID
	*/
Possibility.prototype.makeID = function(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
/**
	* Calculates the screen CSS position of the Possibility Mesh
	*
	* @method getCssPosition
	* @return {THREE.Vector3} Vector 3 with the x, y, z
	*/
Possibility.prototype.getCssPosition = function(e){
		return THREEx.ObjCoord.cssPosition(this.mesh, camera,renderer);
}
/**
	* Updates the position of the mesh
	*
	* @method updatePos
	*/
Possibility.prototype.updatePos = function(_pos){
		this.mesh.position.x = _pos.x;
		this.mesh.position.y = _pos.y
		this.mesh.position.z = _pos.z
		this._position = this.mesh.position.clone();
}
/**
	* Calculates world position of the Possibility Mesh
	*
	* @method getWorldPosition
	* @return {THREE.Vector3} Vector 3 with the x, y, z
	*/
Possibility.prototype.getWorldPosition  = function(e){
		return THREEx.ObjCoord.worldPosition(this.mesh);
}
/**
	* Updates the position of the mesh
	*
	* @method rotateAnim
	*/
Possibility.prototype.rotateAnim = function(which, _position){
	var thisSelf = this;
	var _position = new THREE.Euler( 0, 0, 0, 'XYZ' );
	var _target = 	new THREE.Euler( 2*Math.PI,2*Math.PI, 2*Math.PI, 'XYZ' );
	// console.log("Started totation anim");
	var thisTween = 	new TWEEN.Tween(_position)
									.to(_target, thisSelf.speed )
									.onUpdate(function(){
											thisSelf.mesh.rotation.set(_position._x, _position._y,_position._z, "XYZ");
											// _target.set(_position._x+1, _position._y + 1 ,_position._z +1 , "XYZ");
									})
									.start()
									.repeat(Infinity)
									// .onComplete()
									;
}
lastTarget = 0;
count =0 ;
/**
	* Displays HUD, usign CSS and HTML of the Content of the Possibility
	*
	* @method showContent
	* @param  {THREEx.DocumentEvent} the event form dom Event THREEx
	* @return {this} The instance of the Possibility being called
	*/
Possibility.prototype.showContent = function(domEvent){
		var thisSelf = this;
		if($('body').find("#info-card").length === 0){
						$("<div></div>",{
				"id": "info-card",
				"class" : "card"
			}).appendTo("body");
		}

		$("#info-card").html("<div class=\"close\"></div><h1>"+this.name+"</h1> <p> year "+this.year+"</p> <p>"+this.description+"</p>"+'<p class="position"><b></b><span class="probable"></span><span class="plausible"></span><span class="possible"></span></p><button class="edit">Edit</button>')
		.css({"top": this.getCssPosition().y-$("#info-card").outerHeight()+"px", "left": this.getCssPosition().x+"px"}).fadeIn();

		$("#info-card .position b").css({
			"top": ($("#info-card .position").outerHeight(true)/2 ) - (($("#info-card .position").outerHeight(true)/2) / (this.outerRadius/ this._position.y ))+"px",
			"left": ($("#info-card .position").outerWidth(true)/2 ) - (($("#info-card .position").outerWidth(true)/2) / (this.outerRadius/ this._position.z ))+"px"});

		$("#info-card").on('click', function(e){
			if(e.target.classList.contains("close")){
				$("#info-card").fadeOut();
				$(this).off("click").removeClass("editing");
				thisSelf.edit(false);
			}
			else if (e.target.classList.contains("edit")) {
				thisSelf.edit(e,thisSelf);
				$(this).addClass("editing");
				$(e.target).html("Done").toggleClass("edit done");
			}
			else if (e.target.classList.contains("done")) {
				thisSelf.edit(false);
				$(this).removeClass("editing");
				$(e.target).html("Edit").toggleClass("edit done");
			}
		});
	

		trackball.handleEvent("mousemove",function (argument) {

		})
		//commenting this out, we get duble event listeners reponding to the same click
		// $("canvas").click(function(e){
		// 	console.log(lastTarget,domEvent.target.id , thisSelf.mesh.id);
		// 	$(this).off("click");
		// 	if(lastTarget !== thisSelf.mesh.id){
		// 		$("#info-card").fadeOut(function () {
		// 			console.log("counter ", count);
		// 		});
		// 	}
		// 	lastTarget = domEvent.target.id;
		// });

		clickOnPossibility = new CustomEvent(
			"clickedOnPossibility",
			{
				detail: {
					message: "clickedOnPossibility",
					time: new Date(),
					target: this
				},
				bubbles: true,
				cancelable: true
			}
		);
		// $("#info-card")[0].dispatchEvent(clickOnPossibility,this);
		// thisSelf.dispatchEvent(clickOnPossibility,this);
		thisSelf.dispatchEvent(clickOnPossibility);
		console.log('you clicks Possibility :', this);
		return this;
}
/**
	* Edits the current possibility
	*
	* @method edit
	*/
Possibility.prototype.edit  = function(e,thisSelf){
		if(e === false ){
				$("#info-card .position").off('click');
				return;
		}
		$("#info-card .position").click(function(e){
			$(this).find('b').animate({
				"left":  e.clientX - $(e.target).offset().left+"px",
		 		"top":   e.clientY - $(e.target).offset().top +"px" }, function (argument) {
					var _z = thisSelf.outerRadius - (((thisSelf.outerRadius*2) * $("#info-card .position b").position().left  ) / $("#info-card .position").outerWidth(true));
					var _y = thisSelf.outerRadius - (((thisSelf.outerRadius*2) * $("#info-card .position b").position().top  ) / $("#info-card .position").outerHeight(true));
					thisSelf.updatePos(new THREE.Vector3(thisSelf._position.x ,_y,_z));

					movedPossibility = new CustomEvent(
						"movedPossibility",	{
							detail: {
								message: "movedPossibility",
								time: new Date(),
								target: thisSelf
							},
							bubbles: true,
							cancelable: true
						}
					);
					thisSelf.mesh.dispatchEvent({ type: 'start', message: 'vroom vroom!' });
					// EventDispatcher.prototype.apply(thisSelf.mesh.prototype)
					thisSelf.dispatchEvent(movedPossibility);
					// console.log(thisSelf);
		 		});
		});
		// thisSelf.mesh.addEventListener( 'start', function ( event ) {
		//
		//         alert( event.message );
		//
		//     } );
}

/** HACK: prevents from closing.
	* @method lastTarget
	*/
Possibility.prototype.lastTarget  = function (id) {
	return lastTarget;
};
/**
	* @method addEventListener
	*/
Possibility.prototype.addEventListener  = function(eventName, callback) {
      var events = this._events,
          callbacks = events[eventName] = events[eventName] || [];
      callbacks.push(callback);
  }
/**
	* @method raiseEvent
	*/
Possibility.prototype.raiseEvent  =  function(eventName, args) {
      var callbacks = this._events[eventName];
      for (var i = 0, l = callbacks.length; i < l; i++) {
          callbacks[i].apply(null, args);
      }
  }
/**
	* @method testEvent
	*/
Possibility.prototype.testEvent  = function(){
	this.raiseEvent('ON_TEST', [1,2,3]);
}
/**
	* @method dispatchCustomEvent
	*/
Possibility.prototype.dispatchEvent = function(event) {
  // var myEvent = document.defaultView.CustomEvent("clickOnPossibility");
  document.dispatchEvent(event);
}
