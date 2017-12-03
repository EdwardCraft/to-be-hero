
class EnemyFlying extends AbstractEntity{

	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity){
		super(positionX, positionY, width, height, assets, animationVelocity, movementVelocity);

		this.setFrames();
		this.setCurrentImg(assets[0]);
		this.offscreenXPosition = positionX;
		this.directionIndex = 1;
		this.direction = ['TOP', 'MIDDLE', 'DOWN'];

	}






	update(delta, canvas){

		this.movementXRight(delta, canvas);		


		this.runAnimation();
	}


	movementXRight(delta, canvas){
		this.positionX += VELOCITY_X_ENTITIES * delta;
		if(this.positionX - 100 > canvas.width){
			this.positionX = this.offscreenXPosition;
			this.ofScreen = true;
			this.getNewPosition(canvas);
		}
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


	getNewPosition(canvas){
		switch(this.direction[this.checkPosition(Math.floor(Math.random() * 2), this.directionIndex)]){
				case'TOP':   this.positionY = 44; break;
				case'MIDDLE': this.positionY = (canvas.height / 2) - 70;  break;
				case 'DOWN':  this.positionY = canvas.height - 190;  break;
				default: break;
		}
		this.ofScreen = false;
	}


	checkPosition(value, index){
		if(value !== index ){
			this.directionIndex = value;
			return value ;
		}else{
			return this.checkPosition(Math.floor(Math.random() * 2), index);
		}
	}


	render( canvas , canvasctx){

		canvasctx.drawImage(
			this.currentImg, 
			this.positionX, 
			this.positionY
			);
	}


	getDirrectionIndex(){return this.directionIndex;}
	setDirrectionIndex(directionIndex){this.directionIndex = directionIndex;}


}