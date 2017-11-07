class Entity{

	constructor(postionX, postionY,  width, height, asset){
		this.postionX = postionX;
		this.postionY = postionY;
		this.width = width;
		this.height = height;
		this.asset = asset;

	}

	update(delta){
		
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

}