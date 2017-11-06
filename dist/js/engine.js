

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


let background;





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
		background = new Entity( 0 , 0, img);

	}
	img.src = 'assets/backgroundNight.jpg';
	

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
	




}


function clearScreen(leftX, topY, width, height, color){

	canvasctx.fillStyle = color;
	canvasctx.fillRect( leftX, topY, width, height);

}

function rebuild(){
	delta = 0; //discard the unsimulated time
	//... snap the player to the  authoritative state
}