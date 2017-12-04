
class BuildingHit{

	constructor(position){
		this.positionX = position[0];
		this.positionY = position[1];
		this.frames = 6;
		this.currentColor = "#FFBDBD";
		this.colors = [
			"#FF7575",
			"#FF75FF",
			"#7E75FF",
			"#75EDFF",
			"#75FF90",
			"#F7FF75"
		];
		this.frames = this.colors.length;
		this.index = 0;
		this.count = 0;
		this.endAnimation = false;
	}

	update(delta, canvas){

		this.runAnimation();
	}

	runAnimation(){
		this.index++;
		if(this.index > 2){
			this.index = 0;
			this.nextFrame();
		}
	}


	nextFrame(){
		if(this.count >= this.frames){
			this.endAnimation = true;
			return;
		}
		this.currentColor = this.colors[this.count % this.frames];
		this.count++;
	}

	render(canvas, canvasctx){
		canvasctx.fillStyle = this.currentColor;
		canvasctx.globalAlpha = 0.5;
		canvasctx.fillRect( this.positionX, this.positionY,  110, 42);
		canvasctx.fillRect( this.positionX, this.positionY + 134, 110, 75);
		canvasctx.fillRect( this.positionX, this.positionY + 300, 110, 68);
		canvasctx.fillRect( this.positionX, this.positionY + 460, 110, 68);
		canvasctx.fillRect( this.positionX + 110, this.positionY , 185, 550);
		canvasctx.globalAlpha = 1;
	}


	isEndAnimation(){return this.endAnimation;}





}