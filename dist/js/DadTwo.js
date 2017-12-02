
class DadTwo extends AbstractEntity{

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
	}


	update(delta, canvas){

		if(this.stayOnWindow && !this.isAttack){
			this.runAnimationSingleLoop();
		}
		this.peekWindow(delta);
		if(!this.onWindow && !this.timerFinish && !this.stayOnWindow){
			if(this.positionX > PAPA_WINDOW_X_POSITION){
				this.positionX -= this.movementVelocity[0];
			}else if(this.positionX <= PAPA_WINDOW_X_POSITION){
				this.onWindow = true;
			}
		}
	}

	peekWindow(delta){
		if(this.onWindow && !this.timerFinish && !this.stayOnWindow){
			this.timerIdle(delta);
		}
		if(this.onWindow && this.timerFinish && !this.stayOnWindow){
			if(this.positionX < WINDOW_X_STARTING_POSITION){
				this.positionX += this.movementVelocity[0];
			}else{
				this.ofScreen = true; 
			}
		}
	}

	hideWindow(delta){
		if(this.stayOnWindow){
			console.log("hello");
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
		}
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

	
	setPositionPapaTwo(window){
		switch(window){	
			case 'TOP'   :  
				this.positionY = PAPA_TWO_Y_TOP; 
				this.section = 'TOP';    
				break;
			case 'MIDDLE':  
				this.positionY =  PATA_TWO_Y_MIDDLE; 
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