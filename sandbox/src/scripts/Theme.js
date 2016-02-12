/**
	* Theme
	*
	* TODO:
	* - [ ] Add a constantly updating HUD of the year the mouse is in.
	* - [ ] Create algorithm so that Possibilities will only end up inside a specified cone.
	* - [ ] Create function to get and set normalized coordinates. No matter where the cone is pointing at it will return something usable in the x axis
	*/


/**
	* A theme represents the cones, the lens in which the Stories are being situated.
	* a themes has conectric cone, axis of tension, future Possibilities and Story lines
	*
	* @class Theme
	* @param {String} name - name for the Theme
	* @param {int}  length - legth the Theme will have in the 3Dworld
	* @param {int} radius - radius of the outermost cone
	* @param {object}  axis - object.x name of the x axis  object.y name of the y axis
	* @param {int} date - year of where the distant future ends.
	* @constructor
	*/
var Theme = function(name, length, radius, axis,distantFuture){
	try{

	self = this;
	self.axisOfTension = axis|| {
		x : "Silicone",
		y : "Biological"
	}
	self.conectricConeCount = 3;
	self.coneLength  = length || 200;
	self.outerRadius = radius || 50;
	self.name = name || "Biological Vs Silicone ";
	self.parentCone = new THREE.Object3D();
	self.distantFuture = distantFuture !== undefined? distantFuture : 2065;

	self.addCones();

	self.addSprites();

	self.axisLines();
	self.axisLables();


	self.createFutureScenario({
		color: 0xDE3926,
		name: "today",
		parent: self,
		id: "987zyx",
		year: self.today().getFullYear(),
		position: new THREE.Vector3(0,0,0),
		description: "The future starts now",
		shape: "tetrahedronGeometry"
	});


	// console.log("New Theme Created"  , self );


	}
	catch(e){
		console.log("Error in theme",e)
	}
};



 /**
	* @class Theme
	* @constructor
	*/

Theme.prototype.constructor = function(){
	console.log("dfs");
}
/**
	* Create a new Basic Material
	*
	* @method material
	* @return {THREE.material} material
	*/

Theme.prototype.material = new THREE.MeshBasicMaterial({
			transparent: true,
			opacity: 0.08,
			color: 0x2194ce,
			depthTest: true,
			visible: true,
			depthWrite: false,
			fog: true,
			side :THREE.DoubleSide ,
			combine: THREE.MixOperation,
			reflectivity: 0.2
		});
/**
	* Create a new Basic Material
	*
	* @method lineMaterial
	* @return {THREE.LineBasicMaterial} material
	*/

Theme.prototype.lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
/**
	* Create a new  Basic Mesh
	*
	* @method mesh
	* @return {THREE.Mesh}  mesh
	*/
Theme.prototype.mesh = new THREE.Mesh( self.geometry, self.material );

/**
	* Stops adding new Possibilities on click
	*
	* @method today
	* @return {date} gives todays date.
	*/
Theme.prototype.today = function(){
 return new Date();
}
/**
	* Calculate the position in the x axis
	*
	* @method yearToPosition
	* @param {int} year for the position
	* @return {int} position of the x axis given a year as an input
	*/
Theme.prototype.yearToPosition = function(year){
	return Math.round(self.coneLength/((self.distantFuture - self.today().getFullYear()) / (parseInt(year) - self.today().getFullYear())))
};
/**
	* Calculate the year given the pos
	*
	* @method possitionToYear
	* @param {int} pos in the X asix the year
	* @return {int} the year of the given position
	*/
Theme.prototype.positionToYear = function(pos){
	return Math.round(((pos * (self.distantFuture - self.today().getFullYear()) ) / self.coneLength )) + self.today().getFullYear();
};
/**
	* Font Size
	* @param {int} size of the font used in 3D world to display sprites
	*/
Theme.prototype.fontsize = 50;
/**
	* Font Size
	* @param {int} size of the font used in 3D world to display sprites
	*/
Theme.prototype.fontsizeSmall = 27;
/**
	* Creates the Geometry for the cones
	*
	* @method addCones
	* @param {boolean} toScene - if false it will not render to scene.
	* @return
	*/
Theme.prototype.addCones = function(toScene){
		//set up the cones
	self.coneGeometry = {
		possible   : new THREE.CylinderGeometry( self.outerRadius, 0, self.coneLength, 35, true ),
		plausible : new THREE.CylinderGeometry( self.outerRadius*2/3, 0, self.coneLength, 35, true ),
		probable  : new THREE.CylinderGeometry( self.outerRadius/3, 0, self.coneLength, 35, true )
	}
	for( geometry in self.coneGeometry){
		self.coneGeometry[geometry].name = geometry.toString()+"_geometry";
	}
	self.coneMesh = {
		possible   : new THREE.Mesh( self.coneGeometry.possible, self.material ),
		plausible : new THREE.Mesh( self.coneGeometry.plausible, self.material ),
		probable  : new THREE.Mesh( self.coneGeometry.probable, self.material )
	}
	for( mesh in self.coneMesh){
		self.coneMesh[mesh].name = mesh.toString();
		self.parentCone.add(self.coneMesh[mesh]);
	}
	/*
		* @param {int} pointing - in Radians: controls where the cone is pointing at
		*/
	self.pointing = 0;
	self.parentCone.rotateZ( Math.PI / 2 + Math.PI);
	self.parentCone.position.set( (self.coneLength/2), 0, 0);

	if( toScene || toScene === undefined) scene.add(self.parentCone);
};
/**
	* Create sprites for cones names.
	*
	* @method addSprites
	* @return
	*/
Theme.prototype.addSprites = function(){
	// makeTextSpritez for cones
	var cones_sprite = {};
	for (var i = 0; i < self.parentCone.children.length; i++) {
		// cones_sprite[self.parentCone[i].name] = 22;
		cones_sprite[self.parentCone.children[i].name] = new TextSprite(self.parentCone.children[i].name, {
			fontsize : 30,
			textColor: 0xffffff,
			position: [self.coneLength, -(self.parentCone.children[i].geometry.parameters.radiusTop), -10]
			});
		cones_sprite[self.parentCone.children[i].name].sprite.visible = false;
		scene.add(cones_sprite[self.parentCone.children[i].name].sprite);
		// console.log(self.parentCone.children[i].name, self.parentCone.children[i].geometry.parameters.radiusTop);

		domEvents.addEventListener(self.parentCone.children[i], 'mouseover', function(event){
			// console.log(event.target.name, event);
			// today_date.sprite.visible
			cones_sprite[event.target.name].sprite.visible = true;
		});
		domEvents.addEventListener(self.parentCone.children[i], 'mouseout', function(event){
			// console.log(event.target.name);
			// today_date.sprite.visible
			cones_sprite[event.target.name].sprite.visible = false;
		});
	}
};
/**
	* Add the lines that help draw the main axis.
	*
	* @method axisLines
	* @param {boolean} toScene - if false it will not render to scene.
	* @return
	*/
Theme.prototype.axisLines = function(toScene){
	// geometry - lines
	var geometry = new THREE.Geometry();
	    geometry.vertices.push(new THREE.Vector3(self.coneLength, self.outerRadius, 0));
	    geometry.vertices.push(new THREE.Vector3(self.coneLength, -self.outerRadius, 0));
	line_vertical = new THREE.Line(geometry, self.lineMaterial);

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(self.coneLength, 0, self.outerRadius));
	geometry.vertices.push(new THREE.Vector3(self.coneLength, 0, -self.outerRadius));
	line_horizontal = new THREE.Line(geometry, self.lineMaterial);

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0, -self.outerRadius, 0));
	geometry.vertices.push(new THREE.Vector3(self.coneLength, -self.outerRadius, 0));
	line_bottom = new THREE.Line(geometry, self.lineMaterial);

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, -self.outerRadius, 0));
	line_back = new THREE.Line(geometry, self.lineMaterial);


	if( toScene || toScene === undefined){
		scene.add(line_back);
		scene.add(line_vertical);
		scene.add(line_horizontal);
		scene.add(line_bottom);
	}
	// return line_back;
};
/**
	* Make axis of tension lables
	*
	*
	* @method axisLables
	* @param {boolean} toScene - if false it will not render to scene.
	* @return
	*/
Theme.prototype.axisLables = function(toScene){
	//Makes
	today_date = new TextSprite("Year "+self.today().getFullYear(), {
		fontsize : self.fontsize,
		textColor: 0xffffff,
		position: [0,-self.outerRadius - self.fontsize/2 , 0]
	});
	future_date = new TextSprite("Year "+self.distantFuture, {
		fontsize : self.fontsize,
		textColor: 0xffffff,
		position: [self.coneLength,-self.outerRadius - self.fontsize/2 , 0]
	});

	quad_sprite = new TextSprite(self.axisOfTension.y+" growth", {
		fontsize : self.fontsizeSmall,
		textColor: 0xffffff,
		position: [self.coneLength,self.outerRadius ,self.outerRadius  ]
	});

	quad1_sprite = new TextSprite(self.axisOfTension.y+" recession", {
		fontsize : self.fontsizeSmall,
		textColor: 0xffffff,
		position: [self.coneLength,-self.outerRadius ,self.outerRadius  ]
	});

	quad3_sprite = new TextSprite(self.axisOfTension.x+" growth", {
		fontsize : self.fontsizeSmall,
		textColor: 0xffffff,
		position: [self.coneLength,self.outerRadius , -self.outerRadius  ]
	});
	quad4_sprite = new TextSprite(self.axisOfTension.x+" recession", {
		fontsize : self.fontsizeSmall,
		textColor: 0xffffff,
		position: [self.coneLength,-self.outerRadius , -self.outerRadius  ]
	});



	if( toScene || toScene === undefined){
		scene.add(today_date.sprite);
		scene.add(future_date.sprite);

		scene.add(quad_sprite.sprite);
		scene.add(quad1_sprite.sprite);
		scene.add(quad3_sprite.sprite);
		scene.add(quad4_sprite.sprite);
	}
};




/**
	* This is the actual contructor for the Possibility
	* for some reason the DomEvent listener did not work properly when placed inside
	* the Possibility class.
	*
	* @method createFutureScenario
	* @return {Possibility} the possibility just created
	*/
Theme.prototype.createFutureScenario = function(){
	switch(arguments.length){
				case 0 :
            madeByUserWithGUI();
            break;
        case 1 :
        		madeByUserUsingCode(arguments[0]);
            break;
        default:
        		madeByComputer(arguments[0],arguments[1],arguments[2], arguments[3]);
        		break;
	}
	function madeByUserWithGUI(){
		if($('body').find("#create-possibility").length === 0){
			// console.log("dfsa", $('body').find("#info-card"));
						$('<div id="create-possibility"><section><div class="close"></div><h1>Create new Possibility</h1><form><label for="name">Name</label><input name="name" id="pos-name"type="text" placeholder="Name your future"></form><form><label for="description">Description</label><input name="description" type="text" placeholder="describe a bit more"></form><form><label name="year" for="position" > Year </label><input name="position" type="number" placeholder="A year after 2015" ></form><form class="list" ><label for="quadrant">Select Quadrant</label><select name="quadrant"  ><option value = "1">Silicone Growth </option><option value = "2">Biological Growth </option><option value = "3">Silicone Recession </option><option value = "4">Biological Recession</option></select></form><form class="list" ><label for="cone_category">Likelyhood</label><select name="cone_category"  ><option value = "probable">Probable</option><option value = "plausible">Plausible</option><option value = "possible">Possible </option></select></form><form class="list" ><label for="shape" >Select shape</label><select name="shape"  ><option value = "sphereGeometry">Sphere</option><option value = "tetrahedronGeometry">Tetrahedron</option><option value = "octahedronGeometry">Octahedron</option><option value = "icosahadronGeometry">Icosahedron</option></select></form><button name="submit" type="submit" >Add future possibility </button></section ></div>',{
				"id": "create-possibility"
			}).appendTo("body");
		}


		$("#create-possibility").fadeIn();
		$('#create-possibility .close').click( function(e){
			$("#create-possibility form").off("submit");
			$("#create-possibility").fadeOut();
		});
		$('#create-possibility button[name="submit"]').click( function(e){
			e.preventDefault();
			console.log("submit", $(e.target).parent().find('[name="position"]').val() );
			var lastPushed = all_Possibilities.push(new Possibility({
				color: 0xffffff ,
				name:          $(e.target).parent().find('[name="name"]').val(),
				description:   $(e.target).parent().find('[name="description"]').val(),
				year:          $(e.target).parent().find('[name="position"]').val(),
				quadrant:      $(e.target).parent().find('[name="quadrant"]').val(),
				cone_category: $(e.target).parent().find('[name="cone_category"]').val(),
				shape:         $(e.target).parent().find('[name="shape"]').val(),
				parent: 			self,
				radius: 1
			}));
			console.log(lastPushed,all_Possibilities)

			domEvents.addEventListener(all_Possibilities[lastPushed-1].mesh, 'click', function(event){
				all_Possibilities[lastPushed-1].showContent(event);
			});
			$("#create-possibility form").off("submit");
			$("#create-possibility").fadeOut();
		});

	}
	function madeByUserUsingCode( parameters){
		var lastPushed = all_Possibilities.push(new Possibility(parameters));
		// domEvents.addEventListener(all_Possibilities[lastPushed-1].mesh, 'click', function(event){
		// 	console.log(event);
		// 	all_Possibilities[lastPushed-1].showContent(event);
		// });
	}

	function madeByComputer(name, size, pos, col){
		name = new Possibility( size, pos, col );
		// domEvents.addEventListener(name.mesh, 'click', function(event){
		// 	name.showContent(event);
		// });
	}

	return name;
}

/**
	* Serves as a contructor fuction.
	*
	* @method newStory
	*/
Theme.prototype.newStory = function(makingStory){
	// console.log("Using theme instance to cerate a new story", typeof makingStory);
	if(typeof makingStory === "boolean"){
		if(makingStory){
			if($('body').find("#making-story").length === 0){
				$('<div id="making-story" style="display: none"><h1>New story</h1><p>Click on the future possibilities to add them to this Story Line.</p><h6>click <i>Shift+A</i> or <i>start_end_story</i> to finish</h6></div>',
					{
					}
				).appendTo("body");
			}
			$("#making-story").fadeIn();
			lastPushedStory = all_Stories.push( new Story(makingStory) );
			// storyLine = ;
		}
		else{
			$("#making-story").fadeOut();
			all_Stories[lastPushedStory-1].endStory();
			// storyLine.endStory();
		}
	}
	else if (typeof makingStory === "object") {
		// console.log("theresss ", makingStory);

			lastPushedStory = all_Stories.push( new Story( makingStory) );

	}


}
/**
	* Collects all the possible stories
	*
	* @method showAllStories
	*/
Theme.prototype.showAllStories = function(){
	console.log("showing all stories");
	var thisHudName = "all-stories";
	var $thisHud;
	if($('body').find("#all-stories").length === 0){
	$thisHud =	$('<div> <h1>All Stories</h1> </div>')
		.attr({"class": "box", "id": thisHudName, "style" : "display: none" })
		.prepend('<div class="close"></div>')
		.appendTo("body");
	}
	else{
		$thisHud = $('#'+thisHudName);
		$thisHud.find(".list").remove();
	}

	var list_to_append = '<ul class="list">';
	for (var i = 0; i < all_Stories.length; i++) {
		list_to_append += '<li class="story-name" ><a href="javascript:void()" data-story-number="'+i+'">'+all_Stories[i].name+'</a> <span>'+(all_Stories[i].possibilities.length - 1)+'</span></li>';
		console.log("this ", all_Stories[i]);
	}
	list_to_append +="</ul>";
	$thisHud.append(list_to_append).fadeIn();

	$thisHud.on("click", 'a', function (e) {
		var thisTarget = e.target;
		$thisHud.off('click').fadeOut(400,function(e){
			// console.log("close", all_Stories[$(thisTarget).attr("data-story-number")].name);
			lastStory = $(thisTarget).attr("data-story-number");
			all_Stories[$(thisTarget).attr("data-story-number")].realignToTop();
		});
	});



	$thisHud.on("click", '.close', function (argument) {
		console.log("close");
		$thisHud.off('click').fadeOut();
	});
	$('canvas').click(function(){
		$thisHud.off('click').fadeOut();
		$(this).off('click');
	});
}
