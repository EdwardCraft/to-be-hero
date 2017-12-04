
class EnemyGround extends AbstractEntity{

	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity, orientantion){
		super(positionX, positionY, width, height, assets, animationVelocity, movementVelocity);

		this.setFrames();
		this.setCurrentImg(assets[0]);
		this.orientantion = orientantion;
		this.offscreenXPosition = positionX;

	}


	update(delta, canvas){

		if(this.orientantion === 'xAxis'){
			 this.movementXRight(delta, canvas);
		}else if(this.orientantion === 'yAxis'){
 			 this.movementYDown(delta, canvas); 
		}	
		this.runAnimation();
	}


	runAnimation(){
		this.index++;
		if(this.index > this.animationVelocity){
			this.index = 0;
			this.nextFrame();
		}
	}


	nextFrame(){
		if(this.count >= this.frames){
			this.count = 0;
		}
		this.currentImg = this.assets[this.count % this.frames];
		this.count++;
	}

	movementXRight(delta, canvas){

		this.positionX += VELOCITY_X_ENTITIES * delta;
		if(this.positionX - 100 > (canvas.width - 220)){
			this.positionX = this.offscreenXPosition;
			this.ofScreen = true;
		}

	}


	movementYDown(delta, canvas){
		if(this.positionY >= (TOILET_GROUND_OFFSET)){
			this.movementXRight(delta, canvas);
		}else{
			this.positionY += this.movementVelocity[1] * delta;
		}
	}


	render( canvas , canvasctx){

		canvasctx.drawImage(
			this.currentImg, 
			this.positionX, 
			this.positionY
			);
	}





}