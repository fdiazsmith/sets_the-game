/**
	* Story
	*
	* A story represents a list of Possibility linked togather in a cronological manner
	*
	* TODO:
	* -[ ] Rearranging stories and resetting position
	* -[ ] Deal with repeated Possibilities in one event. ei. Today. or some other one.
	*/


 /**
	* A story represents a list of Possibility linked togather in a cronological manner
	*
	* @class Story
	* @param {boolean} building - Weather it is curently building a story
	* @param {array}  possibilities - The array of Possibilities.
	* @constructor
	*/

var Story = function(){
	self = this;
	self.possibilities = Array();
	self.startStoryLine = false;
	self.name = "Story line one";
	self.animationTiming = 1200;

	switch(arguments.length){
				case 0 :
						create_default();
						break;
				case 1 :
							if(typeof arguments[0] === "boolean") create_manually(arguments[0])
							else if (typeof arguments[0] === "object") create_from_data(arguments[0])
						break;
				default:
						create_default(arguments);
						break;
	}

	function create_manually(building){
		console.log("creatign manually ", self);
		if(building){
			var thisSelf = self;
			if(self.possibilities.length === 0)	self.possibilities.push(all_Possibilities[0]);
			document.addEventListener("clickedOnPossibility",thisSelf.addStory, false);
			// console.log(self.storyLine);
			// self.storyLine.addEventListener("clickedOnPossibility",thisSelf.addStory, false);
		}	else{	}
	}

	function create_from_data(argument) {
		self.name = (argument.hasOwnProperty('name'))? argument["name"] : self.name;
		if(self.possibilities.length === 0)	self.possibilities.push(all_Possibilities[0]);
		for (var i = 0; i < argument.possibilities.length; i++) {
			var result = $.grep(all_Possibilities, function(event){return event._ID === argument.possibilities[i].id;});
				if (result.length == 0) {
					console.log("// not found");
					} else if (result.length >= 1) {
						result[0].inStories.push(self.name);
				self.possibilities.push(  result[0] );
				}
		}
		self.endStory();
	}

	function create_default(argument) {
		console.info("STORY create_default constructor used");s
	}
};

 /**
	* @class Story
	* @constructor
	*/

Story.prototype.constructor = function(){
	console.info("STORY Constructor used");
}
/**
	* Create a new Line Basic Material
	*
	* @method material
	* @return {THREE.material} Line material
	*/

Story.prototype.material = new THREE.LineBasicMaterial({color: 0x555555});
/**
	* @param {int} miliseconds - controls the animation of the story movements.
	*/
// Story.animationTiming = 1200;


/**
	* Build a new line connecting all of the Possibilities in this Story
	*	and adds it to the scene
	*
	* @method buildLine
	*/
Story.prototype.buildLine = function(){
	var thisSelf = self;
	// console.log("building line ", this.possibilities);

	self.lineGeometry = new THREE.Geometry();
	for (var i = 0; i < self.possibilities.length ; i++) {
		self.possibilities[i].mesh.addEventListener('start', function (event){thisSelf.updateVertex.call(thisSelf,event);});
		self.lineGeometry.vertices.push(self.possibilities[i].position.clone());
	};
	self.storyLine = new THREE.Line(self.lineGeometry, self.material);
	scene.add(self.storyLine);

	//HACK: There has got to be a better way to call and pass evet listeners
	document.addEventListener("movedPossibility",function(e){
			var _index= 0;
			var _obj={};
			var result = $.grep(thisSelf.possibilities, function(event){
				if(event._ID === e.detail.target._ID){
					return _obj = {index: thisSelf.possibilities.indexOf(e.detail.target) , pos  : e.detail.target.position.clone()}
				}
				_index++;
			});
		 if (result.length >= 1) {
				console.log(result, _obj, self.lineGeometry.vertices[_obj.index] );
				thisSelf.lineGeometry.vertices[_obj.index] = _obj.pos.clone(); //.x,_obj.pos.y,_obj.pos.z)
				thisSelf.lineGeometry.verticesNeedUpdate = true;
				// console.log("end",self.lineGeometry.vertices[_obj.index] );

			}
	}, false);
}
/**
	* Method to update a vertex when a Possibility is moved
	* @method updateVertex
	* @param {String} sorting algorithm to choose from
	*/
Story.prototype.updateVertex = function (e, thisSelf) {
	console.log("UpdateVertex: ", e, this );
}

/**
	* A function to index the different sortig options
	* @method rearrange
	* @param {String} sorting algorithm to choose from
	*/
Story.prototype.rearrange = function(order){
	switch (order) {
		case "likes":
				console.log("sorting according to likes");
			break;
		default:
				self.possibilities.sort(self.sortChronologically);
			break;
	}
};
/**
	* Chronological sorting algorithm
	* @method sortChronologically
	*/
Story.prototype.sortChronologically = function(a,b){
	if (a.year > b.year) {
		return 1;
	}
	if (a.year < b.year) {
		return -1;
	}
	return 0;
}

/**
	* Stops adding new Possibilities on click
	*
	* @method endStory
	*/
Story.prototype.endStory = function(){
	document.removeEventListener("clickedOnPossibility",this.addStory);
	self.rearrange();
	self.buildLine();
};
/**
	* Adds a Possibility to the array of possibilities
	*
	* @method addStory
	*/
Story.prototype.addStory = function(event){
	self.possibilities.push(event.detail.target);
	console.log("Building a story: ", self.possibilities, event, self);
};
/**
	* Re aligns the current array of possibilities to show as a single line on top
	*
	* @method realignToTop
	*/
Story.prototype.realignToTop = function(event){
	// TWEEN.removeAll();
	var thisSelf = this;
	console.log("realignToTop", this, thisSelf);
	// for ( var i = 0; i < objects.length; i ++ ) {
	var x_interval = 0;
	var _position = [];
	var _target = [];
	for (var i = 0; i < thisSelf.possibilities.length; i++) {
		x_interval += 25;
		_position[i] = thisSelf.possibilities[i]._position.clone();
		_target[i] =  new THREE.Vector3( x_interval, 80 ,  0);

		var tween = new TWEEN.Tween(_position[i])
										.to(_target[i], thisSelf.animationTiming)
										.onUpdate(function(){
											for (var i = 0; i < thisSelf.possibilities.length; i++) {
										    thisSelf.possibilities[i].mesh.position.x = _position[i].x;
										    thisSelf.possibilities[i].mesh.position.y = _position[i].y;
										    thisSelf.possibilities[i].mesh.position.z = _position[i].z;

										    thisSelf.lineGeometry.vertices[i] = thisSelf.possibilities[i].position.clone();
										    thisSelf.lineGeometry.verticesNeedUpdate = true;
										  }
										})
										.start()
										.delay(x_interval);

	}

};

/**
	* Return the Possibilities to the orginal position
	*
	* @method resetPosition
	*/
Story.prototype.resetPosition = function(event){
	// TWEEN.removeAll();
		var thisSelf = this;
	console.log("resetPosition");
	// for ( var i = 0; i < objects.length; i ++ ) {
	var x_interval = 0;
	var _position = [];
	var _target = [];
	for (var i = 0; i < thisSelf.possibilities.length; i++) {
		x_interval += 25;
		_position[i] = thisSelf.possibilities[i].position;
		_target[i] =  thisSelf.possibilities[i]._position.clone();//


		var tween = new TWEEN.Tween(_position[i])
										.to(_target[i], thisSelf.animationTiming)
										.onUpdate(function(){
											for (var i = 0; i < thisSelf.possibilities.length; i++) {
										    thisSelf.possibilities[i].mesh.position.x = _position[i].x;
										    thisSelf.possibilities[i].mesh.position.y = _position[i].y;
										    thisSelf.possibilities[i].mesh.position.z = _position[i].z;

										    thisSelf.lineGeometry.vertices[i] = thisSelf.possibilities[i].position.clone();
										    thisSelf.lineGeometry.verticesNeedUpdate = true;
										  }
										})
										.start();

	}
};
/**
	* Target positions for the tween animations
	*
	* @method targetPositions
	*/
Story.prototype.targetPositions = {
	normal : [],
	toTop :  []
}
/**
	* Tweens movement
	*
	* @method transform
	*/
Story.prototype.transform = function(how) {

}
/**
	* Turns a set of screen coordinates to world coordinates
	*
	* @method screenToWorld
	* @param {array} THREE.Vector3
	*/
Story.prototype.screenToWorld = function(vectors) {

}
