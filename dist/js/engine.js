

var canvas;
var canvasctx;
var img;


var FPS = 60;
var fps = 60;
var fpsDisplay = document.getElementById('fpsDisplay');

var lastFrameTimeMs = 0; // last time the was run
var maxFPS = FPS; // the maximun FPS we want to allow
var framesThisSecond = 0;
var lastFpsUpdate = 0;
var delta = 0;


var running = false;
var started = false;
var frameID = 0;

// We want to simulate  1000 ms / 60 FPS  = 16.667 ms per frame, every time 
// we run  update()
var timestep = 1000 / FPS;



//Entities objects

let background;
let floor;
let building;

let lowerBackWindow;
let uperBackWindow;




window.onload = function() {
	console.log("hero from page loaded function");
	canvas = document.getElementById('canvas');
	canvasctx = canvas.getContext('2d');


	getAssets();
	start();	




}

function getAssets(){
	img = new Image();
	img.onload = function(){
		console.log("background loaded");
		background = new Entity( 0 , 0,  canvas.width,  canvas.height, img);

	}

	var hour = (new Date()).getHours();
	if(hour >= 19){  // if the time is around  7pm use the night background
		img.src = 'assets/backgroundNight.jpg';
	}else{
		img.src = 'assets/backgroundDay.jpg';
	}
	
	

	floorImg = new Image();
	floorImg.onload = function(){
		console.log("floor loaded");
		floor = new  Entity( 0 , canvas.height - 50, 960, 50, floorImg);

	}
	floorImg.src = 'assets/flor.png';

	buildingImg = new Image();
	buildingImg.onload = function(){
		console.log('building loaded');
		building = new Entity(canvas.width - 294, 0, 294, 560, buildingImg);
	}
	buildingImg.src = 'assets/building.png';

	backWindowImg = new Image();
	backWindowImg.onload = function(){
		console.log('backWindow loaded');
		lowerBackWindow = new Entity(
			canvas.width - 126, 42, 
			85, 81, backWindowImg);
		uperBackWindow = new Entity(
			canvas.width - 126, (canvas.height / 2) - 72,
			85, 81, backWindowImg);

	}
	backWindowImg.src = 'assets/backWindow.png';


}




function stop(){
	running = false;
	started = false;
	cancelAnimationFrame(frameID);
}

function start(){
	if(!started){ //don't request multiple frames
		started = true;
		//Dummy frame to get  our timestamps and initial drawing right
		//Track the frane ID  so we cancel it if we stop quickly.
		frameID = requestAnimationFrame(function(timestamp){
			render();
			running = true;
			//reset some time tracking variables
			lastFrameTimeMs = timestamp;
			lastFpsUpdate = timestamp;
			framesThisSecond = 0;
			//actually start the main loop
			frameID = requestAnimationFrame(mainLoop);
		});
	}
}


function mainLoop(timestamp){

	//throttle the frame rate.
	if(timestamp < lastFrameTimeMs + (1000 / maxFPS)){
		frameID = requestAnimationFrame(mainLoop);
		return;
	}

	//track the accumulated time that hasn't been simulated yet
	delta += timestamp - lastFrameTimeMs; // get the delta time since last frame
	lastFrameTimeMs = timestamp;

	if(timestamp > lastFpsUpdate + 1000){
		fps = 0.25 * framesThisSecond + 0.75 * fps;
		lastFpsUpdate = timestamp;
		framesThisSecond = 0;
	}
	framesThisSecond++;


	var numUpdatesSteps = 0;
	while(delta >= timestep){
		update(timestep);
		delta -= timestep;
		//Sanity check
		if(++numUpdatesSteps >= 240){
			rebuild();
			break;
		}
	}
	render();
	frameID = requestAnimationFrame(mainLoop);

}



function update(delta){

	if(background !== undefined)background.update(delta);	

}


function render(){
	fpsDisplay.textContent = Math.round(fps) + ' FPS'; // display the FPS

	//clear background
	clearScreen(0, 0, canvas.width, canvas.height, 'black');
	
	if(background !== undefined)background.render( canvas, canvasctx);
	if(lowerBackWindow !== undefined)lowerBackWindow.render(canvas, canvasctx);
	if(uperBackWindow !== undefined)uperBackWindow.render(canvas, canvasctx);
	if(building !== undefined)building.render(canvas, canvasctx);
	if(floor !== undefined)floor.render(canvas, canvasctx);




}


function clearScreen(leftX, topY, width, height, color){

	canvasctx.fillStyle = color;
	canvasctx.fillRect( leftX, topY, width, height);

}

function rebuild(){
	delta = 0; //discard the unsimulated time
	//... snap the player to the  authoritative state
}