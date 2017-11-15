function collisions(){

	if(flyGuy !== undefined ){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (flyGuy.getBounds()[0] + 97) && 
					arrows[i].getBounds()[1] >= flyGuy.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (flyGuy.getBounds()[1] + 90)){
				console.log('hit fly guy ');
				arrows[i].setOfScreen(true);
				var newIndex = flyGuy.getDirrectionIndex();
				console.log(newIndex);
				flyGuy = null;
				flyGuy = undefined;
				flyGuy = new Entity( -200, 0, 0, 0,  flyGuyFrames, 5, [0.3,0]);
				flyGuy.setBeginigPosition(canvas, newIndex);
				break;
			}
		}
	}

	if(alien !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (alien.getBounds()[0] + 97) && 
					arrows[i].getBounds()[1] >= alien.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (alien.getBounds()[1] + 90)){
				console.log('hit alien');
				arrows[i].setOfScreen(true);
				var newIndex = alien.getDirrectionIndex();
				console.log(newIndex);
				alien = null;
				alien = undefined;
				alien = new Entity( -200, 0, 0, 0,  alienFlyFrames, 5, [0.3,0]);
				alien.setBeginigPosition(canvas, newIndex);
				break;
			}
		}
	}

	if(papa !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (papa.getBounds()[0] + 97) && 
					arrows[i].getBounds()[1] >= papa.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (papa.getBounds()[1] + 90)){
				console.log('hit papa');
				arrows[i].setOfScreen(true);
				papa = null;
				papa = undefined;
				papa = new Entity( -100 , canvas.height - 145, 0, 0, papaFrames, 20, [0.1,0]);
				break;
			}
		}
	}

	if(toilet !== undefined){
		for(var i = 0; i < arrows.length; i++){
			if(arrows[i].getBounds()[0] <= (toilet.getBounds()[0] + 97) && 
					arrows[i].getBounds()[1] >= toilet.getBounds()[1]   && 
					arrows[i].getBounds()[1] <= (toilet.getBounds()[1] + 90)){
				console.log('hit toilet');
				arrows[i].setOfScreen(true);
				toilet = null;
				toilet = undefined;
				toilet = new Entity( 100, -150, 0, 0, toiletFrames, 5,  [ 0.1, 0.1]);
				break;
			}
		}
	}

}

function removeArrows(){
	var key = 0;
	for(var i = 0; i < arrows.length; i++){
		if(arrows[i].isOfScreen()){
			arrows[i] = undefined;
			key = 1;
		}
		if(key === 1){
			arrows[i] = arrows[i + 1];
		}
	}
	
	if(key === 1){
		arrows.length -= 1;
	}

}


function createArrow(){
	if(minChan !== undefined){
		if(minChan.isShoot()){
			switch(minChan.getArrowPosition()){
			case 'TOP'   :  
				arrows.push(new Entity((canvas.width / 2) + 140, 97, 111, 24, arrowImg, 0, [0.7, 0.1]));
				break;
			case 'MIDDLE':  
				arrows.push(new Entity((canvas.width / 2) + 140, 265, 111, 24, arrowImg, 0, [0.7, 0.1]));
				break;
			case 'DOWN'  :  
				arrows.push(new Entity((canvas.width / 2) + 140, (canvas.height) - 135, 111, 24, arrowImg, 0, [0.7, 0.1]));     
				break;
			}
			minChan.setShoot(false);	
		}
	}	
}