
class ScoreScreen{



	constructor(position, width, height){
		this.position = position;
		this.width = width;
		this.height = height;

	}




	update(delta, canvas){

	}


	render(canvas, canvasctx){

		canvasctx.globalAlpha = 0.3;
		canvasctx.fillStyle = "black";
		canvasctx.fillRect( 0, 0,  canvas.width, canvas.height );
		canvasctx.globalAlpha = 1;

		canvasctx.lineWidth = 10;
		canvasctx.strokeStyle = "white";
		canvasctx.strokeRect( this.position[0], this.position[1], this.width, this.height);
		canvasctx.fillStyle = "#FFA6EB";
		canvasctx.fillRect( this.position[0], this.position[1], this.width, this.height);

		canvasctx.font = 70 +"px" + " Passion One";
		canvasctx.strokeStyle = 'white';
		canvasctx.lineWidth = 8;
		canvasctx.strokeText("SCORE   " + scoreCount, (this.position[0]) + 50, (this.position[1]) + 160);
		canvasctx.fillStyle = '#FFA4EE';
		canvasctx.fillText("SCORE   "  + scoreCount, (this.position[0]) + 50, (this.position[1]) + 160);
		canvasctx.font = originalFontSize +"px" + " Passion One";

	}



}