
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
var arrows = [];
var explosions = [];

function collisions(){

	if(flyGuy !== undefined ){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (flyGuy.getBounds()[0] + GUY_FLY_IMAGE_WIDTH) && 
					arrows[i].getBounds()[1] >= flyGuy.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (flyGuy.getBounds()[1] + GUY_FLY_IMAGE_HEIGHT)){
				
				switch(arrows[i].getID()){
					case ARROW_ID : flyGuy.setHealth(flyGuy.getHealth() - 10); break;
					case BOTTLE_ID: flyGuy.setHealth(flyGuy.getHealth() - 1); break;
					case BLAST_ID : flyGuy.setHealth(flyGuy.getHealth() - 1); break;
				}

				arrows[i].setOfScreen(true);
				if(flyGuy.getHealth() <= 0){
					explosions.push(
					new Explosion(flyGuy.getPositionX() - 25, flyGuy.getPositionY() - 5, 
						EXPLOSION_WIDTH, EXPLOSION_HEIGHT, explosionFrames,
						EXPLOSION_ANIMATION_VELOCITY, [0,0]));
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
				
				switch(arrows[i].getID()){
					case ARROW_ID : alien.setHealth(alien.getHealth() - 10); break;
					case BOTTLE_ID: alien.setHealth(alien.getHealth() - 1); break;
					case BLAST_ID : alien.setHealth(alien.getHealth() - 1); break;
				}
				
				arrows[i].setOfScreen(true);
				if(alien.getHealth() <= 0 ){
					explosions.push(
					new Explosion(alien.getPositionX() - 25, alien.getPositionY() - 5, 
						EXPLOSION_WIDTH, EXPLOSION_HEIGHT, explosionFrames,
						EXPLOSION_ANIMATION_VELOCITY, [0,0]));
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
				explosions.push(
					new Explosion(papa.getPositionX() - 50, papa.getPositionY() - 10, 
						EXPLOSION_WIDTH, EXPLOSION_HEIGHT, explosionFrames,
						EXPLOSION_ANIMATION_VELOCITY, [0,0]));
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
				explosions.push(
					new Explosion(guyPerv.getPositionX() - 50, guyPerv.getPositionY() - 10, 
						EXPLOSION_WIDTH, EXPLOSION_HEIGHT, explosionFrames,
						EXPLOSION_ANIMATION_VELOCITY, [0,0]));
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
				explosions.push(
					new Explosion(boosAlien.getPositionX() - 25, boosAlien.getPositionY() - 5, 
						EXPLOSION_WIDTH, EXPLOSION_HEIGHT, explosionFrames,
						EXPLOSION_ANIMATION_VELOCITY, [0,0]));
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
				explosions.push(
					new Explosion(toilet.getPositionX() - 25, toilet.getPositionY() - 5, 
						EXPLOSION_WIDTH, EXPLOSION_HEIGHT, explosionFrames,
						EXPLOSION_ANIMATION_VELOCITY, [0,0]));
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
				alienGirl.setStayOnWindow(true);

			}
		}
	}


	chekOfScreenWindow();
}


function chekOfScreenWindow(){
	if(papaTwo !== undefined){
		if(papaTwo.getOfScree()){
			papaTwo = null;
			papaTwo = undefined;
			createCute = false;
		}
	}

	if(alienGirl !== undefined){
		if(alienGirl.getOfScree()){
			alienGirl = null;
			alienGirl = undefined;
			createCute = false;
		}
	}

	if(papa !== undefined){
		if(papa.getOfScree()){
			papa = undefined;
			buildingHit = new BuildingHit([canvas.width - 294, 0]);
			health.setLives(health.getLives() - 1);
			createEntitie();
		}
	}

	if(guyPerv !== undefined){
		if(guyPerv.getOfScree()){
			guyPerv = undefined;
			buildingHit = new BuildingHit([canvas.width - 294, 0]);
			health.setLives(health.getLives() - 1);
			createEntitie();
		}
	}

	if(boosAlien !== undefined){
		if(boosAlien.getOfScree()){
			boosAlien = undefined;
			buildingHit = new BuildingHit([canvas.width - 294, 0]);
			health.setLives(health.getLives() - 1);
			createEntitie();
		}
	}

	if(toilet !== undefined){
		if(toilet.getOfScree()){
			toilet = undefined;
			buildingHit = new BuildingHit([canvas.width - 294, 0]);
			health.setLives(health.getLives() - 1);
			createEntitie();
		}
	}

	if(flyGuy !== undefined){
		if(flyGuy.getOfScree()){
			console.log('of screen');
			var newIndex = flyGuy.getDirrectionIndex();
			flyGuy = null;
			flyGuy = undefined;
			buildingHit = new BuildingHit([canvas.width - 294, 0]);
			health.setLives(health.getLives() - 1);
			creteFlyingEntities(newIndex);
		}
	}

	if(alien !== undefined){
		if(alien.getOfScree()){
			var newIndex = alien.getDirrectionIndex();
			alien = null;
			alien = undefined;
			buildingHit = new BuildingHit([canvas.width - 294, 0]);
			health.setLives(health.getLives() - 1);
			creteFlyingEntities(newIndex);
		}
	}


	if(buildingHit !== undefined){
		if(buildingHit.isEndAnimation()){
			buildingHit = null;
			buildingHit = undefined;
		}
	}

}


function createEntitie(){

	curremtId =  getNewId(curremtId,  Math.floor(Math.random() * randOffset), randOffset);
	switch(curremtId){
		case PAPA_ID: 
			papa = new EnemyGround(  X_AXIS_STARTING_POSITION , PAPA_GROUND_OFFSET , 
		 			PAPA_IMAGE_WIDTH, PAPA_IMAGE_HEIGHT,  papaFrames, PAPA_ANIMATION_VELOCITY, 
		 			PAPA_MOVEMENT_VELOCITY, 'xAxis');	
			break;
		case PERV_ID: 
			guyPerv = new EnemyGround( X_AXIS_STARTING_POSITION , PERV_GROUND_OFFSET, 
									PERV_IMAGE_WIDTH, PERV_IMAGE_HEIGHT,  guyPervFrames, 
									PERV_ANIMATION_VELOCITY, PERV_MOVEMENT_VELOCITY, 'xAxis');
			break;
		case BOSS_ID: 
			boosAlien = new EnemyGround( X_AXIS_STARTING_POSITION, BOSS_GROUND_OFFSET, 
									BOSS_IMAGE_WIDTH, BOSS_IMAGE_HEIGHT , boosAlienFrames, 
									BOSS_ANIMATION_VELOCITY, BOSS_MOVEMENT_VELOCITY, 'xAxis');
			break;
		case TOILET_ID:
			toilet = new EnemyGround( TOILET_SKY_X_OFFSET , X_AXIS_STARTING_POSITION, 
								 TOILET_IMAGE_WIDTH, TOILET_IMAGE_HEIGHT, toiletFrames , 
								 TOILET_ANIMATION_VELOCITY,  TOILET_MOVEMENT_VELOCITY,'yAxis');
			break;
	}

}


function creteFlyingEntities(yAxis){

	currentFlyId =  getNewId(currentFlyId,  Math.floor(Math.random() * randOffsetFly), randOffsetFly);
	switch(currentFlyId){
		case FLY_ID:
			alien = new EnemyFlying( X_AXIS_STARTING_POSITION, 0 , 
								ALIEN_FLY_IMAGE_WIDTH, ALIEN_FLY_IMAGE_HEIGHT, alienFlyFrames, 
								ALIEN_FLY_ANIMATION_VELOCITY,  [0.05, 0.05]);
			alien.setDirrectionIndex(yAxis);
			alien.getNewPosition(canvas);
			alien.setHealth(ALIEN_FLY_HEALTH);
			break;
		case FLY_GUY_ID:
	
			flyGuy = new EnemyFlying( X_AXIS_STARTING_POSITION, 0, 
								 GUY_FLY_IMAGE_WIDTH, GUY_FLY_IMAGE_HEIGHT, flyGuyFrames, 
								 GUY_FLY_ANIMATION_VELOCITY, [0.05, 0.05]);
			flyGuy.setDirrectionIndex(yAxis);
			flyGuy.getNewPosition(canvas);
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
		if(arrows[i].getOfScree()){
			arrows[i] = undefined;
			key = 1;
		}
		if(key === 1){
			arrows[i] = arrows[i + 1];
		}
	}
	if(key === 1){
		arrows.length -= 1;
		console.log("arrows.length: ", arrows.length);
	}

}

function removeExplosion(){
	var key = 0;
	for(var i = 0; i < explosions.length; i++){
		if(explosions[i].isFinishExplotion()){
			explosions[i] = undefined;
			key = 1;
		}
		if(key === 1){
			explosions[i] = explosions[i + 1];
		}
	}
	if(key === 1){
		explosions.length -= 1;
	}
}




function createArrow(){
	if(minChan !== undefined){
		if(minChan.isShoot()){
			switch(minChan.getArrowPosition()){
			case 'TOP'   :  
				arrows.push(new Bullet(ARROW_POSITION_X, ARROW_TOP_SECTION, 
					ARROW_IMAGE_WIDTH, ARROW_IMAGE_HEIGHT, arrowImg, 
					ARROW_ANIMATION_VELOCITY, ARROW_MOVEMENT_VELOCITY, ARROW_ID));
				break;
			case 'MIDDLE':  
				arrows.push(new Bullet(ARROW_POSITION_X, ARROW_MIDDLE_SECTION, 
					ARROW_IMAGE_WIDTH, ARROW_IMAGE_HEIGHT, arrowImg, 
					ARROW_ANIMATION_VELOCITY, ARROW_MOVEMENT_VELOCITY, ARROW_ID));
				break;
			case 'DOWN'  :  
				arrows.push(new Bullet(ARROW_POSITION_X, ARROW_DOWN_SECTION, 
					ARROW_IMAGE_WIDTH, ARROW_IMAGE_HEIGHT, arrowImg, 
					ARROW_ANIMATION_VELOCITY, ARROW_MOVEMENT_VELOCITY, ARROW_ID));     
				break;
			}
			minChan.setShoot(false);	
		}
	}

	if(papaTwo !== undefined){
		if(papaTwo.isShoot()){
			switch(papaTwo.getArrowPosition()){
			case 'TOP'   :  
				arrows.push(new Bullet(BOTTLE_POSITION_X, BOTTLE_TOP_SECTION, 
					BOTTLE_IMAGE_WIDTH, BOTTLE_IMAGE_HEIGHT, bottleImg, 
					BOTTLE_ANIMATION_VELOCITY, BOTTLE_MOVEMENT_VELOCITY, BOTTLE_ID));
				break;
			case 'MIDDLE':  
				arrows.push(new Bullet(BOTTLE_POSITION_X, BOTTLE_MIDDLE_SECTION, 
					BOTTLE_IMAGE_WIDTH, BOTTLE_IMAGE_HEIGHT, bottleImg, 
					BOTTLE_ANIMATION_VELOCITY, BOTTLE_MOVEMENT_VELOCITY, BOTTLE_ID));
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
				arrows.push(new Bullet(BLAST_POSITION_X, BLAST_TOP_SECTION, 
					BLAST_IMAGE_WIDTH, BLAST_IMAGE_HEIGHT, blastImage, 
					0, BLAST_MOVEMENT_VELOCITY, BLAST_ID));
				break;
			case 'MIDDLE':  
				arrows.push(new Bullet(BLAST_POSITION_X, BLAST_MIDDLE_SECTION, 
					BLAST_IMAGE_WIDTH, BLAST_IMAGE_HEIGHT, blastImage, 
					0, BLAST_MOVEMENT_VELOCITY, BLAST_ID));
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
		VELOCITY_X_ENTITIES += VELOCITY_X_ENTITIES / 2;
	}

	if(!lvlStastes[1] && scoreCount > 20){
		lvlStastes[1] = true;
		//VELOCITY_X_ENTITIES_FLY
		VELOCITY_X_ENTITIES += VELOCITY_X_ENTITIES / 2;
	}

	if(!lvlStastes[2] && scoreCount > 30 && !createCute){
		lvlStastes[2] = true;
		VELOCITY_X_ENTITIES_FLY += VELOCITY_X_ENTITIES_FLY / 2;
		VELOCITY_X_ENTITIES += VELOCITY_X_ENTITIES;
	}

}


function checkWindowObject(delta){

	if( scoreCount > 0 &&  scoreCount % 10 === 0){
		if(!createCute){
			if(!lvlStastes[1]){
				createWindowObject();
			}
			if(lvlStastes[1] && !lvlStastes[2]){
				createWindowObjectTwo();
			}
			if(lvlStastes[2] && lvlStastes[1]){
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
		}else if(papaTwo !== undefined && alienGirl === undefined){
			if(papaTwo.getStayOnWindow()){
				timerIdle(delta);
			}
		}else if(papaTwo === undefined && alienGirl !== undefined){
			if(alienGirl.getStayOnWindow()){
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
				alienGirl = new AlienCute(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY);

				alienGirl.setPositionAlienGirl('TOP');
				break;
			case 1: 
				alienGirl = new AlienCute(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY);

				alienGirl.setPositionAlienGirl('MIDDLE');
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
					alienGirl = new AlienCute(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY);

					alienGirl.setPositionAlienGirl('TOP');
				break;
			case 1: 
					papaTwo = new DadTwo( WINDOW_X_STARTING_POSITION, 0, 
					PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
					PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY);
					papaTwo.setPositionPapaTwo('MIDDLE');
				break;
			}
		}else{
			switch(position){
			case 0: 
				papaTwo = new DadTwo( WINDOW_X_STARTING_POSITION, 0, 
					PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
					PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY);
					papaTwo.setPositionPapaTwo('TOP');
				break;
			case 1: 
				alienGirl = new AlienCute(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY);

					alienGirl.setPositionAlienGirl('MIDDLE');
				break;
			}
		}

	}
}


function createWindowObjectThree(){
	if(papaTwo === undefined && alienGirl === undefined){
		var switchSides = Math.floor(Math.random() * 2);
		if(switchSides === 0){
			alienGirl = new AlienCute(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY);
					alienGirl.setPositionAlienGirl('TOP');
			papaTwo = new DadTwo( WINDOW_X_STARTING_POSITION, 0, 
					PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
					PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY);
					papaTwo.setPositionPapaTwo('MIDDLE');
		}else{
			papaTwo = new DadTwo( WINDOW_X_STARTING_POSITION, 0, 
					PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, papaAttackFrames, 
					PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY);
					papaTwo.setPositionPapaTwo('TOP');
			alienGirl = new AlienCute(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, alienGirlFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY);
					alienGirl.setPositionAlienGirl('MIDDLE');
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
				createCute = false;
				totaltime = TIMER_TO_STAY_ON_WINDOW;
				seconds = 0;
				return;
			}
		}
		if(papaTwo !== undefined && alienGirl === undefined){;
			papaTwo.setOnWindow(false);
			papaTwo.hideWindow(delta);
			if(!papaTwo.getStayOnWindow()){
				papaTwo = null;
				papaTwo = undefined;
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
