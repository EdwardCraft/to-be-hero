
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

var createPapa = false;
var createCute = false;
var seconds = 0;
var totaltime = TIMER_TO_STAY_ON_WINDOW;
var lvlStastes = [false, false, false, false];
var hit = false;

function collisions(){

	if(flyGuy !== undefined ){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (flyGuy.getBounds()[0] + GUY_FLY_IMAGE_WIDTH) && 
					arrows[i].getBounds()[1] >= flyGuy.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (flyGuy.getBounds()[1] + GUY_FLY_IMAGE_HEIGHT)){
				flyGuy.setHealth(flyGuy.getHealth() - 1);
				arrows[i].setOfScreen(true);
				if(flyGuy.getHealth() <= 0){
					scoreCount += FLY_GUY_SCORE;
					hit = true;
					var newIndex = flyGuy.getDirrectionIndex();
					flyGuy = null;
					flyGuy = undefined;
					creteFlyingEntities(newIndex);
				}
				return;
			}
		}
	}

	if(alien !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (alien.getBounds()[0] + ALIEN_FLY_IMAGE_WIDTH) && 
					arrows[i].getBounds()[1] >= alien.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (alien.getBounds()[1] + ALIEN_FLY_IMAGE_HEIGHT)){
				alien.setHealth(alien.getHealth() - 1);
				arrows[i].setOfScreen(true);
				if(alien.getHealth() <= 0 ){
					scoreCount += ALIEN_FLY_SCORE;
					hit = true;
					var newIndex = alien.getDirrectionIndex();
					alien = null;
					alien = undefined;
					creteFlyingEntities(newIndex);
				}
				return;	
			}
		}
	}

	if(papa !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (papa.getBounds()[0] + (PAPA_IMAGE_WIDTH - 20)) && 
					arrows[i].getBounds()[1] >= papa.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (papa.getBounds()[1] + PAPA_IMAGE_HEIGHT)){
				
				scoreCount += GROUND_ENEMY_SCORE;
				hit = true;
				arrows[i].setOfScreen(true);
				papa = null;
				papa = undefined;
				createEntitie();
				return;
			}
		}
	}

	if(guyPerv !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (guyPerv.getBounds()[0] + (PERV_IMAGE_WIDTH)) && 
					arrows[i].getBounds()[1] >= guyPerv.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (guyPerv.getBounds()[1] + PERV_IMAGE_HEIGHT)){
				
				scoreCount += GROUND_ENEMY_SCORE;
				hit = true;
				arrows[i].setOfScreen(true);
				guyPerv = null;
				guyPerv = undefined;
				createEntitie();
				return;
			}
		}
	}

	if(boosAlien !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (boosAlien.getBounds()[0] + (BOSS_IMAGE_WIDTH)) && 
					arrows[i].getBounds()[1] >= boosAlien.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (boosAlien.getBounds()[1] + BOSS_IMAGE_HEIGHT)){
			
				scoreCount += GROUND_ENEMY_SCORE;
				hit = true;
				arrows[i].setOfScreen(true);
				boosAlien = null;
				boosAlien = undefined;
				createEntitie();
				return;
			}
		}
	}

	if(toilet !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (toilet.getBounds()[0] + TOILET_IMAGE_WIDTH) && 
					arrows[i].getBounds()[1] >= toilet.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (toilet.getBounds()[1] + TOILET_IMAGE_HEIGHT)){
		
				scoreCount += GROUND_ENEMY_SCORE;
				hit = true;
				arrows[i].setOfScreen(true);
				toilet = null;
				toilet = undefined;
				createEntitie();
				return;
			}
		}
	}


	if(papaTwo !== undefined){
		if(papaTwo.getOnWindow() && !papaTwo.getTimerFinish()){
			if(papaTwo.getXAxis() <= (papaTwo.getBounds()[0]  + PAPA_TWO_IMAGE_WIDTH) &&
				papaTwo.getXAxis() >= papaTwo.getBounds()[0] && 
				papaTwo.getYAxis() >= papaTwo.getBounds()[1] &&
				papaTwo.getYAxis() <= ( papaTwo.getBounds()[1] + (PAPA_TWO_IMAGE_HEIGHT - 55 ) )){
				papaTwo.setStayOnWindow(true);
			}
		}
	}

	if(alienGirl !== undefined){
		if(alienGirl.getOnWindow() && !alienGirl.getTimerFinish()){
			if(alienGirl.getXAxis() <= (alienGirl.getBounds()[0]  + ALIEN_GIRL_IMAGE_WIDTH) &&
				alienGirl.getXAxis() >= alienGirl.getBounds()[0] && 
				alienGirl.getYAxis() >= alienGirl.getBounds()[1] &&
				alienGirl.getYAxis() <= ( alienGirl.getBounds()[1] + ALIEN_GIRL_IMAGE_HEIGHT ) ){
				//console.log('hit');
				alienGirl.setStayOnWindow(true);

			}
		}
	}


}



function createEntitie(){

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

	currentFlyId =  getNewId(currentFlyId,  Math.floor(Math.random() * randOffsetFly), randOffsetFly);
	switch(currentFlyId){
		case FLY_ID:
	
			alien = new Entity( X_AXIS_STARTING_POSITION, 0 , 
								ALIEN_FLY_IMAGE_WIDTH, ALIEN_FLY_IMAGE_HEIGHT, alienFlyFrames, 
								ALIEN_FLY_ANIMATION_VELOCITY,  ALIEN_FLY_MOVEMENT_VELOCITY);
			alien.setBeginigPosition(canvas, yAxis);
			alien.setHealth(ALIEN_FLY_HEALTH);
			break;
		case FLY_GUY_ID:
	
			flyGuy = new Entity( X_AXIS_STARTING_POSITION, 0, 
								 GUY_FLY_IMAGE_WIDTH, GUY_FLY_IMAGE_HEIGHT, flyGuyFrames, 
								 GUY_FLY_ANIMATION_VELOCITY, GUY_FLY_MOVEMENT_VELOCITY);
			flyGuy.setBeginigPosition(canvas, yAxis);
			flyGuy.setHealth(FLY_GUY_HEALTH);
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
				arrows.push(new Entity(ARROW_POSITION_X, ARROW_TOP_SECTION, 
					ARROW_IMAGE_WIDTH, ARROW_IMAGE_HEIGHT, arrowImg, 
					ARROW_ANIMATION_VELOCITY, ARROW_MOVEMENT_VELOCITY));
				break;
			case 'MIDDLE':  
				arrows.push(new Entity(ARROW_POSITION_X, ARROW_MIDDLE_SECTION, 
					ARROW_IMAGE_WIDTH, ARROW_IMAGE_HEIGHT, arrowImg, 
					ARROW_ANIMATION_VELOCITY, ARROW_MOVEMENT_VELOCITY));
				break;
			case 'DOWN'  :  
				arrows.push(new Entity(ARROW_POSITION_X, ARROW_DOWN_SECTION, 
					ARROW_IMAGE_WIDTH, ARROW_IMAGE_HEIGHT, arrowImg, 
					ARROW_ANIMATION_VELOCITY, ARROW_MOVEMENT_VELOCITY));     
				break;
			}
			minChan.setShoot(false);	
		}
	}

	if(papaTwo !== undefined){
		if(papaTwo.isShoot()){
			switch(papaTwo.getArrowPosition()){
			case 'TOP'   :  
				arrows.push(new Entity(BOTTLE_POSITION_X, BOTTLE_TOP_SECTION, 
					BOTTLE_IMAGE_WIDTH, BOTTLE_IMAGE_HEIGHT, bottleImg, 
					BOTTLE_ANIMATION_VELOCITY, BOTTLE_MOVEMENT_VELOCITY));
				break;
			case 'MIDDLE':  
				arrows.push(new Entity(BOTTLE_POSITION_X, BOTTLE_MIDDLE_SECTION, 
					BOTTLE_IMAGE_WIDTH, BOTTLE_IMAGE_HEIGHT, bottleImg, 
					BOTTLE_ANIMATION_VELOCITY, BOTTLE_MOVEMENT_VELOCITY));
				break;
			case 'DOWN'  :  
			    
				break;
			}
			papaTwo.shootAgain();
		}
	}


	if(alienGirl !== undefined){
		if(alienGirl.isShoot()){
			switch(alienGirl.getArrowPosition()){
			case 'TOP'   :  
				arrows.push(new Entity(BLAST_POSITION_X, BLAST_TOP_SECTION, 
					BLAST_IMAGE_WIDTH, BLAST_IMAGE_HEIGHT, blastImage, 
					0, BLAST_MOVEMENT_VELOCITY));
				break;
			case 'MIDDLE':  
				arrows.push(new Entity(BLAST_POSITION_X, BLAST_MIDDLE_SECTION, 
					BLAST_IMAGE_WIDTH, BLAST_IMAGE_HEIGHT, blastImage, 
					0, BLAST_MOVEMENT_VELOCITY));
				break;
			case 'DOWN'  :  
				 
				break;
			}
			alienGirl.shootAgainGirl();
		}
	}

}


function difficultyUpdate(){

	if(!lvlStastes[0] && scoreCount > 10){
		lvlStastes[0] = true;
		creteFlyingEntities(0);
		console.log('update');
	}

	if(!lvlStastes[1] && scoreCount > 20 ){
		lvlStastes[1] = true;
	}

	if(!lvlStastes[2] && scoreCount > 40 && !createCute){
		lvlStastes[2] = true;
	}

}


function checkWindowObject(delta){

	if( scoreCount > 0 &&  scoreCount % 10 === 0){
		if(!createCute){
			if(!lvlStastes[1]){
				console.log('one');
				createWindowObject();
			}
			if(lvlStastes[1] && !lvlStastes[2]){
				console.log('two');
				createWindowObjectTwo();
			}
			if(lvlStastes[2] && lvlStastes[1]){
				console.log('three');
				createWindowObjectThree();
			}
		}
		createCute = true;
	}

	if(!lvlStastes[2]){
		if(alienGirl !== undefined){
			if(alienGirl.getStayOnWindow()){
				timerIdle(delta);
			}
		}
		if(papaTwo !== undefined){
			if(papaTwo.getStayOnWindow()){
				timerIdle(delta);
			}
		}
	}
	
	if(lvlStastes[2]){
		if(papaTwo !== undefined && alienGirl !== undefined){
			if(alienGirl.getStayOnWindow() && papaTwo.getStayOnWindow()){
				timerIdle(delta);
			}
		}
	}



}


function createWindowObject(){
	if(alienGirl === undefined){
		var position = Math.floor(Math.random() * 2);
		switch(position){
			case 0: 
				alienGirl = new Entity(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY, 'TOP');
				alienGirl.setPositionAlienGirl();
				break;
			case 1: 
				alienGirl = new Entity(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY, 'MIDDLE');
				alienGirl.setPositionAlienGirl();
				break;
		}
	}
}

function createWindowObjectTwo(){
	if( papaTwo === undefined  && alienGirl === undefined){

		var switchSides = Math.floor(Math.random() * 2);
		var position = Math.floor(Math.random() * 2);
		if(switchSides === 0){
			switch(position){
				case 0: 
					alienGirl = new Entity(WINDOW_X_STARTING_POSITION, 0, 
						ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
						ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY, 'TOP');
					alienGirl.setPositionAlienGirl();
				break;
			case 1: 
					papaTwo = new Entity( WINDOW_X_STARTING_POSITION, 0, 
						PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
						PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY, 'MIDDLE' );
					papaTwo.setPositionPapaTwo();
				break;
			}
		}else{
			switch(position){
			case 0: 
				papaTwo = new Entity( WINDOW_X_STARTING_POSITION, 0, 
					PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
					PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY, 'TOP' );
				papaTwo.setPositionPapaTwo();
				break;
			case 1: 
				alienGirl = new Entity(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY, 'MIDDLE');
				alienGirl.setPositionAlienGirl();
				break;
			}
		}

	}
}


function createWindowObjectThree(){
	if(papaTwo === undefined && alienGirl === undefined){
		var switchSides = Math.floor(Math.random() * 2);
		console.log("create two entitiess");
		if(switchSides === 0){
			alienGirl = new Entity(WINDOW_X_STARTING_POSITION, 0, 
						ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
						ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY, 'TOP');
					alienGirl.setPositionAlienGirl();
			papaTwo = new Entity( WINDOW_X_STARTING_POSITION, 0, 
						PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
						PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY, 'MIDDLE' );
					papaTwo.setPositionPapaTwo();
		}else{
			alienGirl = new Entity(WINDOW_X_STARTING_POSITION, 0, 
						ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
						ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY, 'MIDDLE');
					alienGirl.setPositionAlienGirl();
			papaTwo = new Entity( WINDOW_X_STARTING_POSITION, 0, 
						PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
						PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY, 'TOP' );
					papaTwo.setPositionPapaTwo();
		}
	}
}


function timerIdle(delta){
	if(totaltime > 0){
		totaltime -= delta;
		seconds = totaltime % 60;
	}else if(this.totaltime <= 0){

		if(alienGirl !== undefined && papaTwo === undefined){
			alienGirl.setOnWindow(false);
			alienGirl.hideWindow(delta);
			if(!alienGirl.getStayOnWindow()){
				alienGirl = null;
				alienGirl = undefined;
				console.log('delete girl');
				createCute = false;
				totaltime = TIMER_TO_STAY_ON_WINDOW;
				seconds = 0;
				return;
			}
		}
		if(papaTwo !== undefined && alienGirl === undefined){
			papaTwo.setOnWindow(false);
			papaTwo.hideWindow(delta);
			if(!papaTwo.getStayOnWindow()){
				papaTwo = null;
				papaTwo = undefined;
				console.log('delete papa');
				createCute = false;
				totaltime = TIMER_TO_STAY_ON_WINDOW;
				seconds = 0;
				return;
			}
		}

		if(papaTwo !== undefined && alienGirl !== undefined){
			alienGirl.setOnWindow(false);
			alienGirl.hideWindow(delta);
			papaTwo.setOnWindow(false);
			papaTwo.hideWindow(delta);
			if(!papaTwo.getStayOnWindow() || !alienGirl.getStayOnWindow()){
				console.log('delte all');
				alienGirl = null;
				alienGirl = undefined;
				papaTwo = null;
				papaTwo = undefined;
				createCute = false;
				totaltime = TIMER_TO_STAY_ON_WINDOW;
				seconds = 0;
				return;
			}
		}
		
	}
		
}
