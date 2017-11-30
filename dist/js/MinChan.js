
class MinChan extends AbstractEntity{

	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity){
		super();
		this.setPositionX(positionX);
		this.setPositionY(positionY);
		this.setAssets(assets);
		this.setMovementVelocity(movementVelocity);
		this.setAnimationVelocity(animationVelocity);
		this.setFrames();
		this.setCurrentImg(assets[0]);
		this.isDown = false;
		this.isTop = false;
		this.isMiddle = false;
	}




	update(delta, canvas){

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
			this.currentImg = this.assets[this.count % this.frames];
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
			this.currentImg = this.assets[this.count % this.frames];
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
			this.currentImg = this.assets[this.count % this.frames];
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



	render(canvas, canvasctx){
		canvasctx.drawImage(
			this.currentImg, 
			this.postionX, 
			this.postionY
			);
	}




}