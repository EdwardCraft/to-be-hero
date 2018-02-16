

var canvas;
var canvasctx;

var FPS = 60;
var fps = 60;

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




var xCoordinates = 0;
var yCoordinates = 0;
var totalTimeResize = TIMER_TO_RESIZE_SCORE;
var secondsResize = 0;


var videoTest;
var scoreCount;
var fontSize = 35;
var addSize = 0;
var originalFontSize = fontSize;
var fullScreen = false; 
var fullScreenSlider;

/*Slider options*/
var SHOOTING_VALUE = 0.7;
var ARROW_MOVEMENT_VELOCITY = [ SHOOTING_VALUE , 0.1];
var VELOCITY_X_ENTITIES = 0.1;
var VELOCITY_X_ENTITIES_FLY = 0.1;
var VELOCITY_Y_CLOUD = VELOCITY_X_ENTITIES * 2;
var PAPA_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
var PERV_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
var BOSS_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
var TOILET_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, VELOCITY_X_ENTITIES ];
var endGame = false;

window.onload = function() {
	
	onMobile();



}


function startEngine(device){
	videoTest = document.getElementById('video-test');
	console.log("hero from page loaded function");
	
	canvas = document.getElementById(device);
	canvasctx = canvas.getContext('2d');
	canvasctx.font = originalFontSize +"px" + " Passion One";
	scoreCount = 0;
	window.addEventListener('orientationchange', doOnOrientationChange);
	canvas.addEventListener("click", onClick, false);
	canvas.addEventListener("keypress", onkeydown, false);
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
	canvas.style.width = width+'px';
	canvas.style.height = height+'px';


}


function onkeydown(e){
	var keyCode = e.keyCode;
    if(keyCode == ESCAPE) {
       if(fullScreen){
       		document.getElementById('mobile').style.display = 'none';
    		document.getElementById('desktop').style.display = 'block';
    		//startEngine('canvasMobile');
    		//resize();
    		document.getElementById("fullScreen").checked = false;		
    		fullScreen = false;
       }
    }
}




function onClick(e){

	if(!startGame || e.keyCode === 13){

		startGame = !startGame;
		fontSize = originalFontSize;
		canvasctx.font = fontSize + "px" + " Passion One";
	}



	if(endGame){
		init();
	}


	/*console.log('x: ', e.x);
	console.log('y: ', e.y);*/
	/*xCoordinates  = (e.x / canvas.width) * canvas.width;
	yCoordinates  = (e.y / canvas.height) * canvas.height;*/
	xCoordinates = e.pageX - canvas.offsetLeft;
	yCoordinates = e.pageY - canvas.offsetTop;

	/*console.log('new x: ', xCoordinates);
	console.log('new y: ', yCoordinates);*/
	if(minChan !== undefined){
		minChan.setXAxis(xCoordinates);
		minChan.setYAxis(yCoordinates);
	}

	if(papaTwo !== undefined){
		papaTwo.setXAxis(xCoordinates);
		papaTwo.setYAxis(yCoordinates);
	}

	if(alienGirl !== undefined){
		alienGirl.setXAxis(xCoordinates);
		alienGirl.setYAxis(yCoordinates);
	}



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



	difficultyUpdate();
	createArrow();
	collisions();
	removeArrows();
	checkWindowObject(delta);
	removeExplosion();

	if(hit){
		timerResize(delta);
	}
	
	/*
		@params
		@delta: delta value for everything that updates;
		@canvas: the canvas 
	*/
	if(startGame){
		if(!endGame){
			if(level !== undefined)level.update(delta, canvas);
			if(arrowPointer !== undefined)arrowPointer.update(delta, canvas);
		}
	}
	
	/*Get Shooting animation value from the slider */
    	$('#ex1').slider({
       		formatter: function(value) {
       		SHOOTING_VALUE = value / 10;
       		ARROW_MOVEMENT_VELOCITY = [ SHOOTING_VALUE , 0.1];
       		return 'Current value: ' + value;
       		}
    	});

    	$('#enemyVel').slider({
       		formatter: function(value) {
       		VELOCITY_X_ENTITIES = value / 10;
 	   		VELOCITY_Y_CLOUD = VELOCITY_X_ENTITIES * 2;
       		PAPA_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
       		PERV_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
       		BOSS_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
       		TOILET_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, VELOCITY_X_ENTITIES ];
       		return 'Current value: ' + value;
       		}
    	});

    	$('#animationVel').slider({
    		formatter: function(value){
    			if(minChan !== undefined)
    				minChan.setAnimationVelocity(value);
    			if(alienGirl !== undefined)
    				alienGirl.setAnimationVelocity(value);
    			if(papaTwo !== undefined)
    				papaTwo.setAnimationVelocity(value);
    			return 'Current value' + value;
    		}
    	});
    
    	if($('#fullScreen').is(':checked')){
    	
    	}
  
	
}


function render(){

	//clear background
	clearScreen(0, 0, canvas.width, canvas.height, 'black');
	
	if(health !== undefined){
		if(level !== undefined)level.render(canvas, canvasctx);
		renderText();
		if(health.getLives() <= 0  && buildingHit === undefined){
			if(!endGame)endGame = true;
			if(screenScore !== undefined){
				screenScore.render(canvas, canvasctx);
			}
		}
	
		
	}
	
	



}

function renderText(){

	

	if(!startGame){
		
		canvasctx.drawImage(
			logoImage, 
			(canvas.width / 2) - (320), 
			(canvas.height / 2) - (150)
			);
		canvasctx.font = 70 +"px" + " Passion One";
		canvasctx.strokeStyle = 'white';
		canvasctx.lineWidth = 15;
		canvasctx.strokeText(" PRESS  START ", 280, (canvas.height / 2) + 170);
		canvasctx.fillStyle = '#FFA4EE';
		canvasctx.fillText(" PRESS  START ", 280, (canvas.height / 2) + 170);
	}else{
		if(arrowPointer !== undefined)arrowPointer.render(canvas, canvasctx);
		canvasctx.strokeStyle = 'white';
		canvasctx.lineWidth = 8;
		canvasctx.strokeText("SCORE   " + scoreCount, 50 - (fontSize / 2), 30 + (fontSize / 2));
		canvasctx.fillStyle = '#FFA4EE';
		canvasctx.fillText("SCORE   "  + scoreCount, 50 - (fontSize / 2), 30 + (fontSize / 2));
	}

}


function timerResize(delta){

	if(totalTimeResize > 0){
		totalTimeResize -= delta;
		secondsResize = totalTimeResize % 60;
		fontSize += delta / 25;
		canvasctx.font = fontSize +"px" + " Passion One";
	}else if(this.totalTimeResize <= 0){
		hit = false;
		totalTimeResize =  TIMER_TO_RESIZE_SCORE;
		secondsResize = 0;
		fontSize = originalFontSize;
		canvasctx.font = fontSize + "px" + " Passion One";
	}

}

function clearScreen(leftX, topY, width, height, color){
	canvasctx.clearRect(0, 0, canvas.width, canvas.height);
	canvasctx.fillStyle = color;
	canvasctx.fillRect( leftX, topY, width, height);

}

function rebuild(){
	delta = 0; //discard the unsimulated time
	//... snap the player to the  authoritative state
}


function init(){
	VELOCITY_X_ENTITIES = 0.1;
	VELOCITY_X_ENTITIES_FLY = 0.1;
	for(var i = 0; i < lvlStastes.length; i++)
		lvlStastes[i] = false;
	scoreCount = 0;
	health.setLives(3);
	papa = new EnemyGround(  X_AXIS_STARTING_POSITION , PAPA_GROUND_OFFSET , 
		 PAPA_IMAGE_WIDTH, PAPA_IMAGE_HEIGHT, papaFrames, 
		 PAPA_ANIMATION_VELOCITY,  PAPA_MOVEMENT_VELOCITY, 'xAxis');
	guyPerv = undefined;
	papaTwo = undefined;
	boosAlien = undefined;
	flyGuy = undefined;
	toilet = undefined;
	cloudToilet = undefined;
	alien = undefined;
	alienGirl = undefined;
	endGame = false;
}
