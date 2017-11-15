

//Entity Objects
var papaLoaded = false;
var perLoaded = false;
var papaTwoLoaded = false;
var boosAlienLoaded = false;


var arrowImg;
var papaAssets = [
	'assets/papa-1.png',
	'assets/papa-2.png',
    'assets/papa-3.png',
    'assets/papa-2.png'
];
var papaFrames = [];

var guyPervAssets = [
	'assets/perv-1.png',
	'assets/perv-2.png'
];
var guyPervFrames = [];

var papaTwoAssets = [
	'assets/papaTwo-1.png',
	'assets/papaTwo-2.png',
	'assets/papaTwo-3.png'
];
var papaTwoFrames = [];

var boosAlienAssets = [
	'assets/boosalien-1.png',
	'assets/boosalien-2.png',
	'assets/boosalien-3.png',
	'assets/boosalien-4.png'
];
var boosAlienFrames = [];

var flyGuyAssets = [
	'assets/fly-1.png',
	'assets/fly-2.png',
	'assets/fly-3.png'
];
var flyGuyFrames = [];

var toiletAssets = [
	'assets/toilet-1.png',
	'assets/toilet-2.png',
	'assets/toilet-3.png',
	'assets/toilet-4.png',
];
var toiletFrames = [];

var cloudToiletAssets = [
	'assets/pop-cloud-3.png',
	'assets/pop-cloud-1.png',
	'assets/pop-cloud-2.png',
	'assets/pop-cloud-1.png',
];
var cloudToiletFrames = [];

var alienAssets = [
	'assets/alien-1.png',
	'assets/alien-2.png',
];
var alienFlyFrames = [];

var alienGirlAssets = [
	'assets/aliengirl-1.png',
	'assets/aliengirl-2.png',
	'assets/aliengirl-3.png',
	'assets/aliengirl-4.png'
];
var alienGirlFrames = [];

var minChanAssets = [
	'assets/min-chan-1.png',
	'assets/min-chan-2.png',
	'assets/min-chan-3.png',
	'assets/min-chan-4.png',
	'assets/min-chan-5.png',
	'assets/min-chan-6.png',
	'assets/min-chan-7.png'
];
var minChanFrames = [];

function getAssets(){
	img = new Image();
	img.onload = function(){
		background = new Entity( 0 , 0,  canvas.width,  canvas.height, img);
	}

	var hour = (new Date()).getHours();
	if(hour >= 19){  // if the time is around 7pm,  use the night background
		img.src = 'assets/backgroundNight.jpg';
	}else{
		img.src = 'assets/backgroundDay.jpg';
	}
	
	floorImg = new Image();
	floorImg.onload = function(){
		floor = new  Entity( 0 , canvas.height - 50, 960, 50, floorImg);
	}
	floorImg.src = 'assets/flor.png';

	buildingImg = new Image();
	buildingImg.onload = function(){
		
		building = new Entity(canvas.width - 294, 0, 294, 560, buildingImg);
	}
	buildingImg.src = 'assets/building.png';

	backWindowImg = new Image();
	backWindowImg.onload = function(){
		
		lowerBackWindow = new Entity(
			canvas.width - 126, 42, 
			85, 81, backWindowImg);
		uperBackWindow = new Entity(
			canvas.width - 126, (canvas.height / 2) - 72,
			85, 81, backWindowImg);

	}
	backWindowImg.src = 'assets/backWindow.png';

	arrowImg = new Image();
	arrowImg.onload = function(){
	}
	arrowImg.src = 'assets/arroflush.png';
	
	getAnimationsAssets();
}


function getAnimationsAssets(){
	
	/*loadAnimationAssets(papaAssets, 'papa');
	loadAnimationAssets(guyPervAssets, 'perv');
	loadAnimationAssets(papaTwoAssets, 'papaTwo');
	loadAnimationAssets(boosAlienAssets, 'boos');
	loadAnimationAssets(toiletAssets, 'toiletGuy');
	loadAnimationAssets(cloudToiletAssets, 'cloudPop');
	loadAnimationAssets(alienGirlAssets, 'alienCute');*/

	loadAnimationAssets(toiletAssets, 'toiletGuy', toiletFrames);
	loadAnimationAssets(cloudToiletAssets, 'cloudPop', cloudToiletFrames);
	loadAnimationAssets(papaAssets, 'papa', papaFrames);
	loadAnimationAssets(alienAssets, 'alienM', alienFlyFrames);
	loadAnimationAssets(flyGuyAssets, 'fly', flyGuyFrames);
	loadAnimationAssets(minChanAssets, 'min', minChanFrames);

}


function loadAnimationAssets(assets, object, assetArray){


	var assetsFrames = [];
	var loaded = 0;
	for(var i = 0; i < assets.length; i++){
		var img = new Image();
		img.onload = function(){
			++loaded;
			if(loaded >= assets.length){
				for(var i = 0; i < assetsFrames.length; i++){
					assetArray.push(assetsFrames[i]);
				}
				createObject(object, assetsFrames);
			}
		}
		img.src = assets[i];
		assetsFrames.push(img);
	}
}
