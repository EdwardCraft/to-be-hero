

var canvas;
var canvasctx;
var img;


var FPS = 60;
var fps = 60;
//var fpsDisplay = document.getElementById('fpsDisplay');

var lastFrameTimeMs = 0; // last time the was run
var maxFPS = FPS; // the maximun FPS we want to allow
var framesThisSecond = 0;
var lastFpsUpdate = 0;
var delta = 0;


var running = false;
var started = false;
var frameID = 0;

var startGame = false;

// We want to simulate  1000 ms / 60 FPS  = 16.667 ms per frame, every time 
// we run  update()
var timestep = 1000 / FPS;



//World objects
let background;
let floor;
let building;
let lowerBackWindow;
let uperBackWindow;

//Entity Objects
var papaLoaded = false;
var perLoaded = false;
var papaTwoLoaded = false;
var boosAlienLoaded = false;

var xCoordinates = 0;
var yCoordinates = 0;

var papaAssets = [
	'assets/papa-1.png',
	'assets/papa-2.png',
    'assets/papa-3.png'
];
var guyPervAssets = [
	'assets/perv-1.png',
	'assets/perv-2.png'
];
var papaTwoAssets = [
	'assets/papaTwo-1.png',
	'assets/papaTwo-2.png',
	'assets/papaTwo-3.png'
];
var boosAlienAssets = [
	'assets/boosalien-1.png',
	'assets/boosalien-2.png',
	'assets/boosalien-3.png',
	'assets/boosalien-4.png'
];
var flyGuyAssets = [
	'assets/fly-1.png',
	'assets/fly-2.png',
	'assets/fly-3.png'
];
var toiletAssets = [
	'assets/toilet-1.png',
	'assets/toilet-2.png',
	'assets/toilet-3.png',
	'assets/toilet-4.png',
];
var cloudToiletAssets = [
	'assets/pop-cloud-3.png',
	'assets/pop-cloud-1.png',
	'assets/pop-cloud-2.png',
	'assets/pop-cloud-1.png',
];
var alienAssets = [
	'assets/alien-1.png',
	'assets/alien-2.png',
];
var alienGirlAssets = [
	'assets/aliengirl-1.png',
	'assets/aliengirl-2.png',
	'assets/aliengirl-3.png',
	'assets/aliengirl-4.png'
];

var minChanAssets = [
	'assets/min-chan-1.png',
	'assets/min-chan-2.png',
	'assets/min-chan-3.png',
	'assets/min-chan-4.png',
	'assets/min-chan-5.png',
	'assets/min-chan-6.png',
];

let papa;
let guyPerv;
let papaTwo;
let boosAlien;
let flyGuy;
let toilet;
let cloudToilet;
let alien;
let alienGirl;
let minChan;





window.onload = function() {
	
	onMobile();
	

}


function startEngine(device){

	console.log("hero from page loaded function");
	canvas = document.getElementById(device);
	canvasctx = canvas.getContext('2d');
	window.addEventListener('orientationchange', doOnOrientationChange);
	canvas.addEventListener("click", onClick, false);
	if(device == 'canvasMobile'){
		doOnOrientationChange();
	}
	
	getAssets();
	start();

}

function doOnOrientationChange() {
	switch(window.orientation) {  
      	case -90 || 90:
     	resize();
        break;
      	default: break;
    }
	
}

function onMobile(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		document.getElementById('mobile').style.display = 'block';
		startEngine('canvasMobile');
	}else{
		document.getElementById('desktop').style.display = 'block';
		startEngine('canvas');
	}
}





function resize(){
	//check for window aspect ratio.
	//Our canvas must cover the full height of screen.
	//regardles of the resolution.
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	
	//Calculate the height with the value of the width.
	var height = (canvas.height * width) / canvas.width;
	console.log("window width : ", width);
	console.log("window height: ", height);
	canvas.style.width = width+'px';
	canvas.style.height = height+'px';



}


function getAssets(){
	img = new Image();
	img.onload = function(){
		background = new Entity( 0 , 0,  canvas.width,  canvas.height, img);
	}

	var hour = (new Date()).getHours();
	if(hour >= 19){  // if the time is around 7pm,  use the night background
		img.src = 'assets/backgroundNight.jpg';
	}else{
		img.src = 'assets/backgroundDay.jpg';
	}
	
	floorImg = new Image();
	floorImg.onload = function(){
		floor = new  Entity( 0 , canvas.height - 50, 960, 50, floorImg);
	}
	floorImg.src = 'assets/flor.png';

	buildingImg = new Image();
	buildingImg.onload = function(){
		
		building = new Entity(canvas.width - 294, 0, 294, 560, buildingImg);
	}
	buildingImg.src = 'assets/building.png';

	backWindowImg = new Image();
	backWindowImg.onload = function(){
		
		lowerBackWindow = new Entity(
			canvas.width - 126, 42, 
			85, 81, backWindowImg);
		uperBackWindow = new Entity(
			canvas.width - 126, (canvas.height / 2) - 72,
			85, 81, backWindowImg);

	}
	backWindowImg.src = 'assets/backWindow.png';

	
	getAnimationsAssets();



}

function getAnimationsAssets(){

	loadAnimationAssets(papaAssets, 'papa');
	loadAnimationAssets(guyPervAssets, 'perv');
	loadAnimationAssets(papaTwoAssets, 'papaTwo');
	loadAnimationAssets(boosAlienAssets, 'boos');
	loadAnimationAssets(flyGuyAssets, 'fly');
	loadAnimationAssets(toiletAssets, 'toiletGuy');
	loadAnimationAssets(cloudToiletAssets, 'cloudPop');
	loadAnimationAssets(alienAssets, 'alienM');
	loadAnimationAssets(alienGirlAssets, 'alienCute');
	loadAnimationAssets(minChanAssets, 'min');

}


function loadAnimationAssets(assets, object){
	var assetsFrames = [];
	var loaded = 0;
	for(var i = 0; i < assets.length; i++){
		var img = new Image();
		img.onload = function(){
			++loaded;
			if(loaded >= assets.length){
				createObject(object, assetsFrames);
				//return true;
			}
		}
		img.src = assets[i];
		assetsFrames.push(img);
	}
}


function createObject(object, assetsFrames){
	switch(object){
		case 'papa':  
		 	papa = new Entity(0 , canvas.height - 140, 0, 0, assetsFrames, 20, [0.1,0]);
			papa.loopingAnimation();
			break;
		case 'perv':
			guyPerv = new Entity( -200 , canvas.height - 140, 0, 0, assetsFrames, 10, [0.05,0]);
			break;
		case 'papaTwo': 
			papaTwo = new Entity(
				canvas.width + 100, canvas.height - 135, 0, 0, 
				assetsFrames, 10,  [0.03,0] );
			break;
		case 'boos':
			boosAlien = new Entity( -200, canvas.height - 155, 0, 0,assetsFrames, 5,  [0.2,0] );
			break;
		case 'fly': 
			flyGuy = new Entity( -200, 45, 0, 0, assetsFrames, 5, [0.3,0]);
			break;
		case 'toiletGuy':
			toilet = new Entity( 100, -150, 0, 0, assetsFrames, 5,  [ 0.1, 0.1]);
			break;
		case 'cloudPop':
			cloudToilet = new Entity( 100, -100, 0, 0, assetsFrames, 6, [ 0.1, 0.15]);
			break;
		case 'alienM':
			alien = new Entity( -200, 45, 0, 0, assetsFrames, 5,  [ 0.2, 0.1]);
			break;
		case 'alienCute':
			alienGirl = new Entity(canvas.width - 125, 0 , 0, 0, assetsFrames, 1, [0, 0.2], 'first');
			break;
		case 'min':
			minChan = new  Entity((canvas.width / 2) + 200, 208, 0, 0, assetsFrames, 5, [ 0, 0 ]);
			break;
	}
}


function onClick(e){

	if(!startGame){
		startGame = !startGame;
	}
	/*console.log('x: ', e.x);
	console.log('y: ', e.y);*/
	/*xCoordinates  = (e.x / canvas.width) * canvas.width;
	yCoordinates  = (e.y / canvas.height) * canvas.height;*/
	xCoordinates = e.pageX - canvas.offsetLeft;
	yCoordinates = e.pageY - canvas.offsetTop;

	console.log('new x: ', xCoordinates);
	console.log('new y: ', yCoordinates);
	if(minChan !== undefined){
		minChan.setXAxis(xCoordinates);
		minChan.setYAxis(yCoordinates);
	}

}


onImageLoad = function(){
	
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

	
	/*
		@params
		@delta: delta value for everything that updates;
		@canvas: the canvas if 
	*/
	if(startGame){
		if(papa !== undefined) papa.updateAnimation(delta, canvas, 'right','xAxis', 'one');
		if(guyPerv !== undefined) guyPerv.updateAnimation(delta, canvas, 'right','xAxis', 'one');
		if(papaTwo !== undefined) papaTwo.updateAnimation(delta, canvas, 'left','xAxis','one');
		if(boosAlien !== undefined) boosAlien.updateAnimation(delta, canvas, 'right','xAxis','one');
		if(flyGuy !== undefined)flyGuy.updateAnimation(delta, canvas, 'right','yAxis', 'one');
		if(toilet !== undefined)toilet.updateAnimation(delta, canvas, 'right','yAxis', 'two');
		if(cloudToilet !== undefined)cloudToilet.updateAttachObject( delta, canvas,  toilet.getPositionX(), toilet.getPositionY() );
		if(alien !== undefined)alien.updateAnimation(delta, canvas, 'right','yAxis', 'one');
		if(alienGirl !== undefined)alienGirl.updateWindow(delta, canvas );
		if(minChan !== undefined)minChan.updateMinChan(delta, canvas, xCoordinates, yCoordinates);
	}
	


}


function render(){
	//fpsDisplay.textContent = Math.round(fps) + ' FPS'; // display the FPS

	//clear background
	clearScreen(0, 0, canvas.width, canvas.height, 'black');
	
	// World Objects
	if(background !== undefined)background.render( canvas, canvasctx);
	if(flyGuy !== undefined)flyGuy.renderAnimation(canvas, canvasctx);
	if(alien !== undefined)alien.renderAnimation(canvas, canvasctx);
	if(lowerBackWindow !== undefined)lowerBackWindow.render(canvas, canvasctx);
	if(uperBackWindow !== undefined)uperBackWindow.render(canvas, canvasctx);
	if(alienGirl !== undefined)alienGirl.renderAnimation(canvas, canvasctx);
	if(minChan !== undefined)minChan.renderAnimation(canvas, canvasctx);
	if(building !== undefined)building.render(canvas, canvasctx);
	if(floor !== undefined)floor.render(canvas, canvasctx);

	// Entities Objects

	if(cloudToilet !== undefined){
		if(cloudToilet.getPositionY() - 100 < (canvas.height - 165))
			cloudToilet.renderAnimation(canvas, canvasctx);
	}
	if(toilet !== undefined)toilet.renderAnimation(canvas, canvasctx);
	if(guyPerv !== undefined) guyPerv.renderAnimation(canvas, canvasctx);
	if(papa !== undefined) papa.renderAnimation(canvas, canvasctx);
	if(boosAlien !== undefined) boosAlien.renderAnimation(canvas, canvasctx);
	if(papaTwo !== undefined) papaTwo.renderAnimation(canvas, canvasctx);

	
	



}


function clearScreen(leftX, topY, width, height, color){

	canvasctx.fillStyle = color;
	canvasctx.fillRect( leftX, topY, width, height);

}

function rebuild(){
	delta = 0; //discard the unsimulated time
	//... snap the player to the  authoritative state
}