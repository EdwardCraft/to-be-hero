


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
				arguments[0],arguments[1],
				arguments[2], arguments[3], arguments[4]); break;
			case 7: 
			this.secondConstructor(
				arguments[0],arguments[1],
				arguments[2], arguments[3], 
				arguments[4], arguments[5], arguments[6]); break;

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
		this.movementVelocity = velocity;
		this.offscreenXPosition = -100;
		this.frames = asset.length;
		this.currentImg = asset[0];
		//this.currentImg = asset[0];
		for(var i = 0; i < this.frames; i++){
			console.log(asset[i]);
		}

	}

	
	loopingAnimation(){
		this.asset.push(this.asset[1]);
		this.frames = this.asset.length;
	}


	update(delta){
		
	}


	updateAnimation(delta, canvas){
	
		this.movementX(delta, canvas);
		this.runAnimation();

	}

	movementX(delta, canvas){

		this.postionX += this.movementVelocity[0] * delta;

		if(this.postionX - 100 > canvas.width){
			this.postionX = this.offscreenXPosition;
		}

	}

	runAnimation(){
		this.index++;
		if(this.index > this.speed){
			this.index = 0;
			this.nextFrame();
		}
	}

	nextFrame(){

		if(this.count >= this.frames){
			this.count = 0;
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










}