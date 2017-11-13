


class Entity{

	/*
	 1-argument = postion X
	 2-argument = postion Y
	 3-argument = width
	 4-argument = height
	 5-argument = image of images
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
		//this.currentImg = asset[0];
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
		/*y 115 first window and (canvas.height / 2) for second;*/
		switch(window){
			case 'first':  this.postionY = 115; break;
			case 'second': this.postionY = (canvas.height / 2);
		}
		//this.currentImg = asset[0];
	}

	
	
	loopingAnimation(){
		this.asset.push(this.asset[1]);
		this.frames = this.asset.length;
	}


	update(delta){

	
		

	}

	updateWindow(delta, canvas){

		switch(this.window){
			case 'first' :  this.peekWindow(delta); break;
			case 'second':  this.peekWindowSecond(delta, canvas); break;
			default: break;
		}
		
		

	}

	peekWindow(delta){
		if(this.postionY > 36){
			this.postionY -= this.movementVelocity[1] * delta;
		}

		if(this.postionY < 80){
			this.tweenWidth(delta);
		}

	}	

	peekWindowSecond(delta, canvas){
		if(this.postionY > (canvas.height / 2) - 75){
			this.postionY -= this.movementVelocity[1] * delta;
		}

		if(this.postionY < (canvas.height / 2) - 40){
			this.tweenWidth(delta);
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



	movementXRight(delta, canvas){

		this.postionX += this.movementVelocity[0] * delta;

		if(this.postionX - 100 > canvas.width){
			this.postionX = this.offscreenXPosition;
			this.ofScreen = true;
		}

	}

	movementXLeft(delta, canvas){

		this.postionX -= this.movementVelocity[0] * delta;

		if(this.postionX  < -100 ){
			this.postionX = canvas.width + 100;
		}

	}


	movementYDown(delta, canvas){
		if(this.postionY >= (canvas.height - 165)){
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
			switch(this.direction[this.checkPosition(Math.floor(Math.random() * 3), this.directionIndex)]){
				case'TOP':   this.postionY = 45; break;
				case'MIDDLE': this.postionY = (canvas.height / 2) - 70;  break;
				case'DOWN':  this.postionY = canvas.height - 190;  break;
				default: break;
			}
			
			this.ofScreen = false;
		}
	}

	checkPosition(value, index){
		if(value !== index ){
			this.directionIndex = value;
			return value ;
		}else{
			return this.checkPosition(Math.floor(Math.random() * 3), index);
		}
	}

	runAnimation(){
		this.index++;
		if(this.index > this.speed){
			this.index = 0;
			this.nextFrame();
		}
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
			return;
		}
		this.currentImg = this.asset[this.count % this.frames];
		this.count++;
		
	}



	render( canvas ,ctx){
		ctx.drawImage(
			this.asset, 
			this.postionX, 
			this.postionY,
			this.width,  
			this.height 
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







}