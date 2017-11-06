class Entity{

	constructor(postionX, postionY, asset){
		this.postionX = postionX;
		this.postionY = postionY;
		this.asset = asset;

	}

	update(delta){
		
	}

	render( canvas ,ctx){
		ctx.drawImage(
			this.asset, 
			this.postionX, 
			this.postionY,
			canvas.width,  
			canvas.height 
			);
	}

}