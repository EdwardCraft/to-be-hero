
class Bullet extends AbstractEntity{

	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity, ID){
		super(positionX, positionY, width, height, 
				assets, animationVelocity, movementVelocity);
		this.ID = ID;

	}

	update(delta, canvas){
		if(this.positionX + 110 > 0){
			this.positionX -= this.movementVelocity[0] * delta;
		}else if(this.positionX + 110 < 0){
			this.ofScreen = true;
		}
	}

	render(canvas, canvasctx){
		canvasctx.drawImage(
			this.assets, 
			this.positionX, 
			this.positionY
		)
	}

	getID(){return this.ID;}

}