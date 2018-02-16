
class ArrowPointer extends AbstractEntity{


	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity){
		super(positionX, positionY, width, height, assets, animationVelocity, movementVelocity);
		this.offsetUp = positionY + 20;
		this.offsetYDown = positionY;
		this.goUp = false;
		this.SECTION = '';
	}


	update(delta, canvas){
		
		if(this.positionY < this.offsetUp && this.goUp === false){
			this.positionY += 0.08 * delta;
		}else this.goUp = true;
		
		if(this.positionY > this.offsetYDown && this.goUp === true){
			this.positionY -= 0.08 * delta;
		}else this.goUp = false;

		

	}


	render( canvas , canvasctx){
		canvasctx.drawImage(
			this.assets, 
			this.positionX, 
			this.positionY
		);
	}

	setPointerArrow(SECTION){
		switch(SECTION){
			case 'TOP' : 
				this.positionY = 100;
				this.offsetUp = this.positionY + 20;
				this.offsetYDown = this.positionY; 
				break;
			case 'MIDDLE' :  
				this.positionY =  (GAME_WORLD_HEIGHT / 2) - 20;
				this.offsetUp = this.positionY + 20;
				this.offsetYDown = this.positionY; 
				break;
			case 'DOWN' : 
				this.positionY = GAME_WORLD_HEIGHT - 145; 
				this.offsetUp = this.positionY + 20;
				this.offsetYDown = this.positionY;
				break;
		}

		this.SECTION = SECTION;
	}


	getSectionPointer(){return this.SECTION;}


}