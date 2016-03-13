/**
	* General setup for the app. 
	* Setup DatGui
	* for THREE setup and general things checkout core_setup.js
	*
	* TODO:
	* -[ ] make sense of it.
	* -[ ] organize. 
	*/

	

function init_app (argument) {

}

//dat gui controlls
// var gui_input =  new function() {
	
//  }
// // var gui_input = new GUI_INPUT();
// var gui = new dat.GUI();
// var f_camera = gui.addFolder("Camera");
// 		f_camera.add(camera_settings, 'viewType', [ 'PerspectiveCamera', 'OrthographicCamera' ] ).onChange(changeView.viewType);
// 		f_camera.add(camera_settings, 'views', [ 'left', 'top', 'front' ] ).onChange(changeView.views);
// 		f_camera.add(camera_settings, 'lens',  [12,16,24,35,50,60,85,105] ).onChange(changeView.lens);
// 		f_camera.add(camera_settings, 'fov', [30,50,70,100] ).onChange(changeView.fov);
// 		f_camera.add(camera_settings, 'zoom', 0,2).onChange(changeView.zoom );


	
// gui.add(gui_input, 'show_ortho');

function registerEventListeners(){
	$(window).keydown( function(e){
		switch(e.which){
			case 38:
				// console.log("MAIN ",'UP');
				// posibility_two = new Possibility(  [10+( 10*(Math.cos(steps))),20 +( 10*Math.abs(Math.sin(steps))),9], [4.5, 20, 20], 0xdd77ff );
			break;
			default:
			break;
		}
	});
}
