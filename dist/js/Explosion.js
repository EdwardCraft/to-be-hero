
class Explosion extends AbstractEntity{

	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity){
		super(positionX, positionY, width, height, assets, animationVelocity, movementVelocity);
		this.setFrames();
		this.setCurrentImg(assets[0]);
		this.finishExplotion = false;
	}

	update(delta, canvas){
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
			this.finishExplotion = true;
			return;
		}
		this.currentImg = this.assets[this.count % this.frames];
		this.count++;
	}

	render(canvas, canvasctx){
		canvasctx.drawImage(
			this.currentImg, 
			this.positionX, 
			this.positionY,
			this.imageWith,
			this.imageHeight
			);
	}


	isFinishExplotion(){return this.finishExplotion;}

}