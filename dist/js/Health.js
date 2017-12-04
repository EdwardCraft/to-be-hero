

class Health{

	constructor(position, image){
		this.positionX = position[0];
		this.positionY = position[1];
		this.image = image;
		this.lives = 3;
		this.livesImage = [
			image,
			image,
			image,
			image,
			image
		];
	}


	update(delta, canvas){

	}


	render(canvas, canvasctx){
		canvasctx.globalAlpha = 0.8;
		if(this.lives === 3){
			var offset = 65;
			canvasctx.drawImage(this.image, this.positionX + offset,     this.positionY, 50, 70);
			canvasctx.drawImage(this.image, this.positionX + offset * 2, this.positionY, 50, 70);
			canvasctx.drawImage(this.image, this.positionX + offset * 3, this.positionY, 50, 70);
		}else if(this.lives === 2){
			var offset = 65;
			canvasctx.drawImage(this.image, this.positionX + offset,     this.positionY, 50, 70);
			canvasctx.drawImage(this.image, this.positionX + offset * 2, this.positionY, 50, 70);
		}else if(this.lives === 1){
			var offset = 65;
			canvasctx.drawImage(this.image, this.positionX + offset, this.positionY, 50, 70);
		}
		

		canvasctx.globalAlpha = 1;
	}


	getLives(){return this.lives;}
	setLives(lives){this.lives = lives;}


}