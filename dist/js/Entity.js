


class Entity{

	/*
	 1-argument = postion X
	 2-argument = postion Y
	 3-argument = width
	 4-argument = height
	 5-argument = arry of images
	 6.argument = animation speed;
	*/	

	constructor(){
		var data = arguments;
		switch(arguments.length){
			case 5: 
			this.firstConstructor(
				arguments[0], arguments[1],
				arguments[2], arguments[3], arguments[4]); break;
			case 7: 
			this.secondConstructor(
				arguments[0], arguments[1],
				arguments[2], arguments[3], 
				arguments[4], arguments[5], arguments[6]); break;
			case 8: 
			this.secondConstructor(
				arguments[0], arguments[1],
				arguments[2], arguments[3], 
				arguments[4], arguments[5], 
				arguments[6], arguments[7]); break;

			default: break;
		}

	}


	firstConstructor(postionX, postionY, width, height, asset){
		this.postionX = postionX;
		this.postionY = postionY;
		this.width = width;
		this.height = height;
		this.asset = asset;
	}

	secondConstructor(postionX, postionY, width, height, asset, animationSpeed, velocity){
		this.postionX = postionX;
		this.postionY = postionY;
		this.width = width;
		this.height = height;
		this.asset = asset;
		this.frame = 0;
 		this.index = 0;
		this.count = 0;
		this.speed = animationSpeed;;
		this.currentImg = new Image();
		this.ofScreen = false;
		this.movementVelocity = velocity;
		this.offscreenXPosition = -100;
		this.frames = asset.length;
		this.currentImg = asset[0];
		this.direction = ['TOP', 'MIDDLE', 'DOWN'];
		this.directionIndex = 0;
		this.temporalPositionY = 0;
		this.restartValueY = false;
		this.tempValueX = postionX;
		this.endLoop = false;
		this.health

	}

	secondConstructor(postionX, postionY, width, height, asset, animationSpeed, velocity, window){
		this.postionX = postionX;
		this.postionY = postionY;
		this.width = width;
		this.height = height;
		this.asset = asset;
		this.frame = 0;
 		this.index = 0;
		this.count = 0;
		this.speed = animationSpeed;;
		this.currentImg = new Image();
		this.ofScreen = false;
		this.movementVelocity = velocity;
		this.offscreenXPosition = -100;
		this.frames = asset.length;
		this.currentImg = asset[0];
		this.direction = ['TOP', 'MIDDLE', 'DOWN'];
		this.directionIndex = 0;
		this.temporalPositionY = 0;
		this.restartValueY = false;
		this.tempValueX = postionX;
		this.endLoop = false;
		this.window = window;
		this.totaltime = TIMER_TO_IDLE;
		this.second = 0;
		this.timerFinish = false;
		this.onWindow = false;
		this.isTop = false;
		this.isMiddle = false;
		this.isDown = false;
		this.endReposition = false;
		this.xAxis = 0;
		this.yAxis = 0;
		this.isArrow = false;
		this.section = 'MIDDLE';
		this.arroOfScreen = false;
		this.stayOnWindow= false;
		this.isAttack = false;
		this.assetAttack = [];
		this.health
	}

	

	setPositionAlienGirl(){
		switch(this.window){	
			case 'TOP'   :  
				this.postionY = ALIEN_GIRL_Y_TOP; 
				this.section = 'TOP';    
				break;
			case 'MIDDLE':  
				this.postionY =  ALIEN_GIRL_Y_MIDDLE; 
				this.section = 'MIDDLE';
				break;
			default: break;
		}
	}

	setPositionPapaTwo(){
		switch(this.window){	
			case 'TOP'   :  
				this.postionY = PAPA_TWO_Y_TOP; 
				this.section = 'TOP';    
				break;
			case 'MIDDLE':  
				this.postionY =  PATA_TWO_Y_MIDDLE; 
				this.section = 'MIDDLE';
				break;
			default: break;
		}
	}

	reOrderTheAssets(){

		for(var i = 0; i < this.asset.length; i++){
			if(i > 6){
				this.assetAttack.push(this.asset[i]);
			}
		}
	
		this.count = 0;
		this.index = 0;
		this.frames = this.assetAttack.length;
		this.currentImg = this.assetAttack[this.count % this.frames];
		this.speed = ALIEN_GIRL_ATTACK_ANIMATION_VELOCITY;
	}
	
	loopingAnimation(){
		this.asset.push(this.asset[1]);
		this.frames = this.asset.length;
	}


	init(){
		this.totaltime = 600;
		this.second = 0;
		this.timerFinish = true;
		this.onWindow = false;
	}



	update(delta){

		
	}	

	updateArrow(delta, canvas){
		if(this.postionX + 110 > 0){
			this.postionX -= this.movementVelocity[0] * delta;
		}else if(this.postionX + 110 < 0){
			this.arroOfScreen = true;
		}
		

	}

	updateWindow(delta, canvas){

		if(this.stayOnWindow && !this.isAttack){
			this.runAnimationSingleLoop();
		}

		this.peekWindow(delta);

		if(!this.onWindow && !this.timerFinish && !this.stayOnWindow){
			if(this.postionX > PAPA_WINDOW_X_POSITION){
				this.postionX -= this.movementVelocity[0];
			}else if(this.postionX <= PAPA_WINDOW_X_POSITION){
				this.onWindow = true;
			}
		}

		

	}

	updateWindowGirl(delta, canvas){

		if(this.stayOnWindow && !this.isAttack){
			this.runAnimationSingleLoop();
			this.repositionFramesAlienGirl();
		}

		this.peekWindow(delta);

		if(!this.onWindow && !this.timerFinish && !this.stayOnWindow){
			if(this.postionX > WINDOW_X_POSITION){
				this.postionX -= this.movementVelocity[0];
			}else if(this.postionX <= WINDOW_X_POSITION){
				this.onWindow = true;
			}
		}

		if(this.isAttack && this.onWindow){
			this.runAnimationAttack();
		}else if(this.isAttack && !this.onWindow){
			this.currentImg = this.asset[0];
		}

	}

	peekWindow(delta){
		if(this.onWindow && !this.timerFinish && !this.stayOnWindow){
			this.timerIdle(delta);
		}
		if(this.onWindow && this.timerFinish && !this.stayOnWindow){
			if(this.postionX < WINDOW_X_STARTING_POSITION){
				this.postionX += this.movementVelocity[0];
			}
		}
	}

	hideWindow(delta){
		if(this.stayOnWindow){
			if(this.postionX < GAME_WORLD_WIDTH){
				this.postionX +=  this.movementVelocity[0];
			}else if(this.postionX >= GAME_WORLD_WIDTH){
				this.stayOnWindow = false;
			}
		}
		
	}	

	peekWindowGirl(delta){
		if(this.onWindow && !this.timerFinish && !this.stayOnWindow){
			this.timerIdle(delta);
		}

		if(this.onWindow && this.timerFinish && !this.stayOnWindow){
			if(this.postionX < WINDOW_X_STARTING_POSITION){
				this.postionX += this.movementVelocity[0];
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

	tweenWidth(delta){
		if(this.index === 0 && !this.endLoop){
			this.postionX -= 3;
		}

		if(this.count >= this.frames){
			this.postionX = this.tempValueX - 15;
		}
		this.runAnimationSingleLoop();
	}

	updateAnimation(delta, canvas, direction, orientantion, mixMove){
		
		if(orientantion === 'xAxis'){
			switch(direction){
				case 'left' : this.movementXLeft(delta, canvas); break;
				case 'right': this.movementXRight(delta, canvas); break;
			}
		}else{
			switch(mixMove){
				case 'one': this.movementY(delta, canvas);break;
				case 'two': this.movementYDown(delta, canvas); break;
			}
			
		}
				
		this.runAnimation();

	}


	updateAttachObject(delta, canvas, x, y ){	
		
		this.postionX = x + 15;

		if(!this.restartValueY){
			this.postionY = y + 80;
			this.restartValueY = true;
		}
		
		this.postionY += this.movementVelocity[1] * delta;
		
		if(this.postionY >  (y + 150)){
			this.restartValueY  = false;
		}
	


		this.runAnimation();
		
	}

	updateMinChan(delta, canvas, xAxis, yAxis){

		/*console.log('position X', this.postionX);
		console.log('position Y', this.postionY);*/

		if( !this.isTop && (this.yAxis <= 130 && this.yAxis >= 43 && this.xAxis >= 670 && this.xAxis <= 770)){
			
			this.section = 'TOP';
			this.isTop = true;
			this.isMiddle = false;
			this.isDown = false;
			this.postionY = 40;
			this.postionX = (canvas.width / 2) + 200;
			this.endLoop = false;
			this.count = 0;
			this.currentImg = this.asset[this.count % this.frames];
		}

		if(!this.isMiddle && (this.yAxis <= 296 && this.yAxis >= 209 && this.xAxis >= 670 && this.xAxis <= 770)){
			
			this.section = 'MIDDLE';
			this.isMiddle = true;
			this.isTop = false;
			this.isDown = false;
			this.postionY = 208;
			this.postionX = (canvas.width / 2) + 200;
			this.endLoop = false;
			this.count = 0;
			this.currentImg = this.asset[this.count % this.frames];
		}

		if(!this.isDown && (this.yAxis <= 458 && this.yAxis >= 368 && this.xAxis >= 670 && this.xAxis <= 770)){
			
			this.section = 'DOWN';
			this.isDown = true;
			this.isTop = false;
			this.isMiddle = false;
			this.postionX = (canvas.width / 2) + 200;
			this.postionY = (canvas.height) - 193;
			this.endLoop = false;
			this.count = 0;
			this.currentImg = this.asset[this.count % this.frames];
		}


		this.runAnimationSingleLoop();
		this.repositionFrames(delta);
	}
	

	repositionFrames(delta){

		if(this.count === 4 && this.index === 0){
			this.postionY  += 4;
			this.postionX  += 11;
		}
		if(this.count === 5 && this.index === 0){
			this.postionY  -= 4;
			this.postionX  -= 38;
		}
		if(this.count === 6 && this.index === 0){
			this.postionX  += 4;
		}
		if(this.count === 7 && this.index == 0){
			this.postionX += 26;
		}
	}

	repositionFramesAlienGirl(){
		if(this.count === 2 && this.index === 0){
			this.postionY -= 1;
		}

		if(this.count === 3 && this.index === 0){
			this.postionY += 10;
		}

		if(this.count === 4 && this.index === 0){
			this.postionY -= 10;
		}

		if(this.count === 5 && this.index === 0){
			this.postionX += 5;
			this.postionY += 1;
		}

		if(this.count === 6 && this.index === 0){
			this.postionX -= 5;
		}

		if(this.count === 7 && this.index === 0){
			this.postionX += 1;
		}

		if(this.count === 8 && this.index === 0){
			this.postionX -= 1;
		
		}

		if(this.count === 9 && this.index === 0){
			this.isAttack = true;
			this.reOrderTheAssets();
		}
	}

	movementXRight(delta, canvas){

		this.postionX += VELOCITY_X_ENTITIES * delta;

		if(this.postionX - 100 > canvas.width){
			this.postionX = this.offscreenXPosition;
			this.ofScreen = true;
		}

	}

	movementXLeft(delta, canvas){

		this.postionX -= VELOCITY_X_ENTITIES * delta;

		if(this.postionX  < -100 ){
			this.postionX = canvas.width + 100;
		}

	}


	movementYDown(delta, canvas){
		if(this.postionY >= (TOILET_GROUND_OFFSET)){
			this.movementXRight(delta, canvas);
		}else{
			this.postionY += this.movementVelocity[1] * delta;
		}
	}


	movementY(delta, canvas){
		this.getNewPosition(canvas);
		this.movementXRight(delta, canvas);
	}

	getNewPosition(canvas){
		if(this.ofScreen){
			switch(this.direction[this.checkPosition(Math.floor(Math.random() * 2), this.directionIndex)]){
				case'TOP':   this.postionY = 44; break;
				case'MIDDLE': this.postionY = (canvas.height / 2) - 70;  break;
				//case'DOWN':  this.postionY = canvas.height - 190;  break;
				default: break;
			}
			
			this.ofScreen = false;
		}
	}

	setBeginigPosition(canvas, directionIndex){

		switch(this.direction[this.checkPosition(Math.floor(Math.random() * 2), directionIndex)]){
				case'TOP':   this.postionY = 44; break;
				case'MIDDLE': this.postionY = (canvas.height / 2) - 70;  break;
				//case'DOWN':  this.postionY = canvas.height - 190;  break;
				default: break;
		}
	}

	checkPosition(value, index){
		if(value !== index ){
			this.directionIndex = value;
			return value ;
		}else{
			return this.checkPosition(Math.floor(Math.random() * 2), index);
		}
	}

	runAnimation(){
		this.index++;
		if(this.index > this.speed){
			this.index = 0;
			this.nextFrame();
		}
	}

	runAnimationAttack(){
		if(this.endLoop)return;
		this.index++;
		if(this.index > this.speed){
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
		if(this.index > this.speed){
			this.index = 0;
			this.nextFrameSimgle();
		}
	}

	nextFrame(){

		if(this.count >= this.frames){
			this.count = 0;

		}
		this.currentImg = this.asset[this.count % this.frames];
		this.count++;
		
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
		this.currentImg = this.asset[this.count % this.frames];
		this.count++;
		
	}



	render( canvas ,ctx){
		ctx.drawImage(
			this.asset, 
			this.postionX, 
			this.postionY
			);
	}



	renderAnimation( canvas ,ctx){

		ctx.drawImage(
			this.currentImg, 
			this.postionX, 
			this.postionY
			);
	}



	getPositionX(){return this.postionX;}
	getPositionY(){return this.postionY;}
	setXAxis(xAxis){this.xAxis = xAxis;}
	setYAxis(yAxis){this.yAxis = yAxis;}
	getXAxis(){return this.xAxis;}
	getYAxis(){return this.yAxis;}
	isShoot(){return this.isArrow;}
	setShoot(isArrow){this.isArrow = isArrow;}
	getArrowPosition(){return this.section;}
	isOfScreen(){return this.arroOfScreen;}
	setOfScreen(arroOfScreen){this.arroOfScreen = arroOfScreen;}
	getDirrectionIndex(){return this.directionIndex;}
	setDirrectionIndex(directionIndex){this.directionIndex = directionIndex;}
	setOnWindow(onWindow){this.onWindow = onWindow;}
	getOnWindow(){return this.onWindow; }
	getTimerFinish(){return this.timerFinish; }
	setStayOnWindow(stayOnWindow){this.stayOnWindow = stayOnWindow;}
	getStayOnWindow(){return this.stayOnWindow;}
	getEntitieState(){return this.isAttack;}
	setHealth(health){this.health = health;}
	getHealth(){return this.health;}
	setAnimationVelocity(speed){this.speed = speed;}


	shootAgain(){
		this.isArrow = false;
		this.endLoop = false;
		this.count = 0;
		this.currentImg = this.asset[this.count % this.frames];
	}

	shootAgainGirl(){
		this.isArrow = false;
		this.endLoop = false;
		this.count = 0;
		this.currentImg = this.assetAttack[this.count % this.frames];
	}


	getBounds(){
		return [this.postionX, this.postionY, this.width, this.height];
	}


}