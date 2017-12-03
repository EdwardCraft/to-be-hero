
class AlienCute extends AbstractEntity{

	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity){
		super(positionX, positionY, width, height, assets, animationVelocity, movementVelocity);
		this.setFrames();
		this.setCurrentImg(assets[0]);
		this.offscreenXPosition = positionX;
		this.totaltime = TIMER_TO_IDLE;
		this.timerFinish = false;
		this.onWindow = false;
		this.stayOnWindow = false;
		this.assetAttack = [];
	}


	update(delta, canvas){
		if(this.stayOnWindow && !this.isAttack){
			this.runAnimationSingleLoop();
			this.repositionFramesAlienGirl();
		}
		this.peekWindow(delta);
		if(!this.onWindow && !this.timerFinish && !this.stayOnWindow){
			if(this.positionX > WINDOW_X_POSITION){
				this.positionX -= this.movementVelocity[0];
			}else if(this.positionX <= WINDOW_X_POSITION){
				this.onWindow = true;
			}
		}
		if(this.isAttack && this.onWindow){
			this.runAnimationAttack();
		}else if(this.isAttack && !this.onWindow){
			this.currentImg = this.assets[0];
		}
	}


	peekWindow(delta){
		if(this.onWindow && !this.timerFinish && !this.stayOnWindow){
			this.timerIdle(delta);
		}
		if(this.timerFinish && !this.stayOnWindow){
			if(this.positionX < WINDOW_X_STARTING_POSITION){
				this.positionX += this.movementVelocity[0];
			}else{
				this.ofScreen = true; 
			}
		}
	}


	hideWindow(delta){
		if(this.stayOnWindow){
			if(this.positionX < GAME_WORLD_WIDTH){
				this.positionX +=  this.movementVelocity[0];
			}else if(this.positionX >= GAME_WORLD_WIDTH){
				this.stayOnWindow = false;
			}
		}
	}	


	timerIdle(delta){
		if(this.totaltime > 0){
			this.totaltime -= delta;
			this.seconds = this.totaltime % 60;
		}else if(this.totaltime <= 0){
			this.seconds = 0;
			this.timerFinish = true;
			this.onWindow = false;
		}
	}

	repositionFramesAlienGirl(){
		if(this.count === 2 && this.index === 0){
			this.positionY -= 1;
		}

		if(this.count === 3 && this.index === 0){
			this.positionY += 10;
		}

		if(this.count === 4 && this.index === 0){
			this.positionY -= 10;
		}

		if(this.count === 5 && this.index === 0){
			this.positionX += 5;
			this.positionY += 1;
		}

		if(this.count === 6 && this.index === 0){
			this.positionX -= 5;
		}

		if(this.count === 7 && this.index === 0){
			this.positionX += 1;
		}

		if(this.count === 8 && this.index === 0){
			this.positionX -= 1;
		
		}

		if(this.count === 9 && this.index === 0){
			this.isAttack = true;
			this.reOrderTheAssets();
		}
	}	

	reOrderTheAssets(){
		for(var i = 0; i < this.assets.length; i++){
			if(i > 6){
				this.assetAttack.push(this.assets[i]);
			}
		}
		this.count = 0;
		this.index = 0;
		this.frames = this.assetAttack.length;
		this.currentImg = this.assetAttack[this.count % this.frames];
		this.animationVelocity = ALIEN_GIRL_ATTACK_ANIMATION_VELOCITY;
	}

	runAnimationAttack(){
		if(this.endLoop)return;
		this.index++;
		if(this.index > this.animationVelocity){
			this.index = 0;
			this.nextFrameAttack();
		}
	}

	nextFrameAttack(){
		if(this.count >= this.frames){
			this.count = 0;
			this.endLoop = true;
			this.isDown = false;
			this.isMiddle = false;
			this.isTop = false;
			this.xAxis = 0;
			this.yAxis = 0;
			this.isArrow = true;
			return;
		}
		this.currentImg = this.assetAttack[this.count % this.frames];
		this.count++;
		
	}

	runAnimationSingleLoop(){
		if(this.endLoop)return;
		this.index++;
		if(this.index > this.animationVelocity){
			this.index = 0;
			this.nextFrameSimgle();
		}
	}

	nextFrameSimgle(){
		if(this.count >= this.frames){
			this.count = 0;
			this.endLoop = true;
			this.isDown = false;
			this.isMiddle = false;
			this.isTop = false;
			this.xAxis = 0;
			this.yAxis = 0;
			this.isArrow = true;
			return;
		}
		this.currentImg = this.assets[this.count % this.frames];
		this.count++;
	}


	render( canvas , canvasctx){
		canvasctx.drawImage(
			this.currentImg, 
			this.positionX, 
			this.positionY
			);
	}

	shootAgainGirl(){
		this.isArrow = false;
		this.endLoop = false;
		this.count = 0;
		this.currentImg = this.assetAttack[this.count % this.frames];
	}

	setPositionAlienGirl(window){
		switch(window){	
			case 'TOP'   :  
				this.positionY = ALIEN_GIRL_Y_TOP; 
				this.section = 'TOP';    
				break;
			case 'MIDDLE':  
				this.positionY =  ALIEN_GIRL_Y_MIDDLE; 
				this.section = 'MIDDLE';
				break;
			default: break;
		}
	}

	setOnWindow(onWindow){this.onWindow = onWindow;}
	getOnWindow(){return this.onWindow; }
	setStayOnWindow(stayOnWindow){this.stayOnWindow = stayOnWindow;}
	getStayOnWindow(){return this.stayOnWindow;}
	getTimerFinish(){return this.timerFinish; }


}