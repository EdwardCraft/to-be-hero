class AbstractEntity{

	constructor(positionX, positionY, width, height, 
		assets, animationVelocity, movementVelocity){
		this.positionX = positionX;
		this.positionY = positionY;
		this.imageWith = width;
		this.imageHeight = height;
		this.assets = assets;
		this.movementVelocity = movementVelocity;
		this.animationVelocity = animationVelocity;
		this.yAxis = 0; 
		this.xAxis = 0;
		this.isArrow = false;
		this.frames = 0;
		this.count = 0;
		this.endLoop = false;
		this.currentImg = new Image();
		this.index = 0;
		this.section = 'TOP';
		this.ofScreen = false;
		this.health = 1;
		this.second = 0;
		this.isDown = false;
		this.isMiddle = false;
		this.isTop = false;
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
	getXAxis(){return this.xAxis;}
	getYAxis(){return this.yAxis;}
	setFrames(){this.frames = this.assets.length;}
	setCurrentImg(img){this.currentImg = img;}
	isShoot(){return this.isArrow;}
	setShoot(isArrow){this.isArrow = isArrow;}
	getArrowPosition(){return this.section;}
	setHealth(health){this.health = health;}
	getHealth(){return this.health;}
	getOfScree(){return this.ofScreen;}
	setOfScreen(ofScreen){this.ofScreen = ofScreen;}

	shootAgain(){
		this.isArrow = false;
		this.endLoop = false;
		this.count = 0;
		this.currentImg = this.assets[this.count % this.frames];
	}

	
	getBounds(){
		return [this.positionX, this.positionY, this.imageWith, this.imageHeight];
	}

	
}