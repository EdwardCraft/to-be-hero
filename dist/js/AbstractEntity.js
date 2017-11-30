class AbstractEntity{

	constructor(){
		this.positionX = 0;
		this.positionY = 0;
		this.imageWith = 0;
		this.imageHeight = 0;
		this.assets;
		this.movementVelocity;
		this.animationVelocity;
		this.yAxis = 0; 
		this.xAxis = 0;
		this.isArrow = false;
		this.frames = 0;
		this.count = 0;
		this.endLoop = false;
		this.currentImg = new Image();
		this.index = 0;
		this.section = 'TOP';
	}

	

	getPositionX(){return this.positionX;}
	setPositionX(positionX){this.positionX = positionX;}
	getPositionY(){return this.positionY;}
	setPositionY(positionY){this.positionY = positionY;}
	getImageWidth(){return this.imageWith;}
	setImageWidth(imageWith){this.imageWith = imageWith;}
	getImageHeight(){return this.imageHeight;}
	setImageHeight(imageHeight){this.imageHeight = imageHeight;}
	getAssets(){return this.assets;}
	setAssets(assets){this.assets = assets;}
	getMovementVelocity(){return this.movementVelocity;}
	setMovementVelocity(movementVelocity){this.movementVelocity = movementVelocity;}
	getAnimationVelocity(){return animationVelocity;}
	setAnimationVelocity(animationVelocity){this.animationVelocity = animationVelocity;}
	setXAxis(xAxis){this.xAxis = xAxis;}
	setYAxis(yAxis){this.yAxis = yAxis;}
	setFrames(){this.frames = this.assets.length;}
	setCurrentImg(img){this.currentImg = img;}
	isShoot(){return this.isArrow;}
	setShoot(isArrow){this.isArrow = isArrow;}
	getArrowPosition(){return this.section;}

	shootAgain(){
		this.isArrow = false;
		this.endLoop = false;
		this.count = 0;
		this.currentImg = this.asset[this.count % this.frames];
	}

}