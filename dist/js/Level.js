
class Level{


	constructor(){


	}


	update(delta, canvas){
		if(papa !== undefined) papa.update(delta, canvas);
		if(guyPerv !== undefined) guyPerv.update(delta, canvas);
		//if(papaTwo !== undefined) papaTwo.updateAnimation(delta, canvas, 'left','xAxis','one');
		if(papaTwo !== undefined) papaTwo.update(delta, canvas );
		if(boosAlien !== undefined) boosAlien.update(delta, canvas);
		if(flyGuy !== undefined)flyGuy.update(delta, canvas);
		if(toilet !== undefined)toilet.update(delta, canvas);
		if(alien !== undefined)alien.update(delta, canvas);
		if(cloudToilet !== undefined && toilet !== undefined)
			cloudToilet.updateAttachObject( delta, canvas,  toilet.getPositionX(), toilet.getPositionY() );
		if(alienGirl !== undefined)alienGirl.update(delta, canvas);
		if(minChan !== undefined)minChan.update(delta, canvas);
		if(buildingHit !== undefined)buildingHit.update(delta, canvas);
		if(health !== undefined)health.update(delta, canvas);

		for(var i = 0; i < arrows.length; i++){
			if(arrows[i] !== undefined)
				arrows[i].update(delta, canvas);
		}

		for(var i = 0; i < explosions.length; i++){
			if(explosions[i] != undefined){
				explosions[i].update(delta, canvas);
			}
		}

		
		

		
	}


	render(canvas, canvasctx){
		// World Objects
		canvasctx.globalAlpha = 1;

		if($('#backgroundChange').is(":checked")){
			if(backgroundDay !== undefined)backgroundDay.render(canvas, canvasctx);
    	}else{
    		if(backgroundNight !== undefined)backgroundNight.render(canvas, canvasctx);
    	}
	

		/*if(videoTest !== undefined){
			canvasctx.globalAlpha = 0.5;
			canvasctx.drawImage(videoTest, 0, 0, canvas.width, canvas.height);
		}*/

		canvasctx.globalAlpha = 1;
		if(towers !== undefined)towers.render( canvas, canvasctx);
		if(flyGuy !== undefined)flyGuy.render(canvas, canvasctx);
		if(alien !== undefined)alien.render(canvas, canvasctx);
		if(lowerBackWindow !== undefined)lowerBackWindow.render(canvas, canvasctx);
		if(uperBackWindow !== undefined)uperBackWindow.render(canvas, canvasctx);
		if(alienGirl !== undefined){
			if(!alienGirl.getOnWindow())
				alienGirl.render(canvas, canvasctx);
		}
		if(papaTwo !== undefined)papaTwo.render(canvas, canvasctx);
		if(minChan !== undefined)minChan.render(canvas, canvasctx);
		if(building !== undefined)building.render(canvas, canvasctx);

		if(alienGirl !== undefined){
			if(alienGirl.getOnWindow()){
				alienGirl.render(canvas, canvasctx);
			}
		}
		if(hideLower !== undefined)hideLower.render(canvas, canvasctx);
		if(hideLowerOne !== undefined)hideLowerOne.render(canvas, canvasctx);
		if(buildingHit !== undefined)buildingHit.render(canvas, canvasctx);
		if(floor !== undefined)floor.render(canvas, canvasctx);

		// Entities Objects

		if(cloudToilet !== undefined && toilet !== undefined){
			if(cloudToilet.getPositionY() - 100 < (canvas.height - 165))
				cloudToilet.renderAnimation(canvas, canvasctx);
		}
		if(toilet !== undefined)toilet.render(canvas, canvasctx);
		if(guyPerv !== undefined) guyPerv.render(canvas, canvasctx);
		if(papa !== undefined) papa.render(canvas, canvasctx);
		if(boosAlien !== undefined) boosAlien.render(canvas, canvasctx);
		if(health !== undefined)health.render(canvas, canvasctx);


		for(var i = 0; i < arrows.length; i++){
			if(arrows[i] !== undefined)
				arrows[i].render(canvas, canvasctx);
		}
	
		for(var i = 0; i < explosions.length; i++){
			if(explosions[i] !== undefined){
				explosions[i].render(canvas, canvasctx);
			}
		}
	

	}



}