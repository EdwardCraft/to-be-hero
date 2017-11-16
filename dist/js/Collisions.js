
var PAPA_ID   = 0;
var PERV_ID   = 1;
var BOSS_ID   = 2;
var TOILET_ID = 3;

var randOffset = 4 /*Numbers of entitiess id */
var curremtId = 0;


var FLY_ID = 0;
var FLY_GUY_ID = 1;

var randOffsetFly = 2;
var currentFlyId = 0;

function collisions(){

	if(flyGuy !== undefined ){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (flyGuy.getBounds()[0] + GUY_FLY_IMAGE_WIDTH) && 
					arrows[i].getBounds()[1] >= flyGuy.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (flyGuy.getBounds()[1] + GUY_FLY_IMAGE_HEIGHT)){
				console.log('hit fly guy ');
				arrows[i].setOfScreen(true);
				var newIndex = flyGuy.getDirrectionIndex();
				flyGuy = null;
				flyGuy = undefined;
				creteFlyingEntities(newIndex);
				break;
			}
		}
	}

	if(alien !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (alien.getBounds()[0] + ALIEN_FLY_IMAGE_WIDTH) && 
					arrows[i].getBounds()[1] >= alien.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (alien.getBounds()[1] + ALIEN_FLY_IMAGE_HEIGHT)){
				console.log('hit alien');
				arrows[i].setOfScreen(true);
				var newIndex = alien.getDirrectionIndex();
				alien = null;
				alien = undefined;
				creteFlyingEntities(newIndex);
				break;
			}
		}
	}

	if(papa !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (papa.getBounds()[0] + (PAPA_IMAGE_WIDTH - 20)) && 
					arrows[i].getBounds()[1] >= papa.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (papa.getBounds()[1] + PAPA_IMAGE_HEIGHT)){
				console.log('hit papa');
				arrows[i].setOfScreen(true);
				papa = null;
				papa = undefined;
				createEntitie();
				break;
			}
		}
	}

	if(guyPerv !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (guyPerv.getBounds()[0] + (PERV_IMAGE_WIDTH)) && 
					arrows[i].getBounds()[1] >= guyPerv.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (guyPerv.getBounds()[1] + PERV_IMAGE_HEIGHT)){
				console.log('hit guyPerv');
				arrows[i].setOfScreen(true);
				guyPerv = null;
				guyPerv = undefined;
				createEntitie();
				break;
			}
		}
	}

	if(boosAlien !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (boosAlien.getBounds()[0] + (BOSS_IMAGE_WIDTH)) && 
					arrows[i].getBounds()[1] >= boosAlien.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (boosAlien.getBounds()[1] + BOSS_IMAGE_HEIGHT)){
				console.log('hit boosAlien');
				arrows[i].setOfScreen(true);
				boosAlien = null;
				boosAlien = undefined;
				createEntitie();
				break;
			}
		}
	}

	if(toilet !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (toilet.getBounds()[0] + TOILET_IMAGE_WIDTH) && 
					arrows[i].getBounds()[1] >= toilet.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (toilet.getBounds()[1] + TOILET_IMAGE_HEIGHT)){
				console.log('hit toilet');
				arrows[i].setOfScreen(true);
				toilet = null;
				toilet = undefined;
				createEntitie();
				break;
			}
		}
	}

}



function createEntitie(){
	console.log('id ', curremtId);
	curremtId =  getNewId(curremtId,  Math.floor(Math.random() * randOffset), randOffset);
	switch(curremtId){
		case PAPA_ID: 
			papa = new Entity(  X_AXIS_STARTING_POSITION , PAPA_GROUND_OFFSET, 
		 						PAPA_IMAGE_WIDTH, PAPA_IMAGE_HEIGHT, papaFrames, 
		 						PAPA_ANIMATION_VELOCITY, PAPA_MOVEMENT_VELOCITY);	
			break;
		case PERV_ID: 
			guyPerv = new Entity( X_AXIS_STARTING_POSITION , PERV_GROUND_OFFSET, 
									PERV_IMAGE_WIDTH, PERV_IMAGE_HEIGHT, guyPervFrames, 
									PERV_ANIMATION_VELOCITY, PERV_MOVEMENT_VELOCITY);
			break;
		case BOSS_ID: 
			boosAlien = new Entity( X_AXIS_STARTING_POSITION, BOSS_GROUND_OFFSET, 
									BOSS_IMAGE_WIDTH, BOSS_IMAGE_HEIGHT ,boosAlienFrames, 
									BOSS_ANIMATION_VELOCITY, BOSS_MOVEMENT_VELOCITY);
			break;
		case TOILET_ID:
			toilet = new Entity( TOILET_SKY_X_OFFSET , X_AXIS_STARTING_POSITION, 
								 TOILET_IMAGE_WIDTH, TOILET_IMAGE_HEIGHT, toiletFrames, 
								 TOILET_ANIMATION_VELOCITY,  TOILET_MOVEMENT_VELOCITY);
			break;
	}

}


function creteFlyingEntities(yAxis){
	console.log('fly id old ', currentFlyId);
	currentFlyId =  getNewId(currentFlyId,  Math.floor(Math.random() * randOffsetFly), randOffsetFly);
	console.log('fly id new ', currentFlyId);
	switch(currentFlyId){
		case FLY_ID:
			console.log("fly ", currentFlyId);
			alien = new Entity( X_AXIS_STARTING_POSITION, 0 , 
								ALIEN_FLY_IMAGE_WIDTH, ALIEN_FLY_IMAGE_HEIGHT, alienFlyFrames, 
								ALIEN_FLY_ANIMATION_VELOCITY,  ALIEN_FLY_MOVEMENT_VELOCITY);
			alien.setBeginigPosition(canvas, yAxis);
			break;
		case FLY_GUY_ID:
			console.log("guy fly ", currentFlyId);
			flyGuy = new Entity( X_AXIS_STARTING_POSITION, 0, 
								 GUY_FLY_IMAGE_WIDTH, GUY_FLY_IMAGE_HEIGHT, flyGuyFrames, 
								 GUY_FLY_ANIMATION_VELOCITY, GUY_FLY_MOVEMENT_VELOCITY);
			flyGuy.setBeginigPosition(canvas, yAxis);
			break;
	}
}


function getNewId(id, value, offset){
	if(value !== id){
		return value;
	}else{
		return getNewId(id, Math.floor(Math.random() * offset), offset);
	}
}






function removeArrows(){
	var key = 0;
	for(var i = 0; i < arrows.length; i++){
		if(arrows[i].isOfScreen()){
			arrows[i] = undefined;
			key = 1;
		}
		if(key === 1){
			arrows[i] = arrows[i + 1];
		}
	}
	
	if(key === 1){
		arrows.length -= 1;
	}

}


function createArrow(){
	if(minChan !== undefined){
		if(minChan.isShoot()){
			switch(minChan.getArrowPosition()){
			case 'TOP'   :  
				arrows.push(new Entity((canvas.width / 2) + 140, 97, 111, 24, arrowImg, 0, [0.7, 0.1]));
				break;
			case 'MIDDLE':  
				arrows.push(new Entity((canvas.width / 2) + 140, 265, 111, 24, arrowImg, 0, [0.7, 0.1]));
				break;
			case 'DOWN'  :  
				arrows.push(new Entity((canvas.width / 2) + 140, (canvas.height) - 135, 111, 24, arrowImg, 0, [0.7, 0.1]));     
				break;
			}
			minChan.setShoot(false);	
		}
	}	
}

