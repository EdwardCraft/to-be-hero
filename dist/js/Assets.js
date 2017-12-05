

//Entity Objects
var papaLoaded = false;
var perLoaded = false;
var papaTwoLoaded = false;
var boosAlienLoaded = false;


//World objects
let background;
let floor;
let building;
let lowerBackWindow;
let uperBackWindow;

//entities
let papa;
let guyPerv;
let papaTwo;
let boosAlien;
let flyGuy;
let toilet;
let cloudToilet;
let alien;
let alienGirl;
let minChan;
let arrow;
let buildingHit;
let health;

/*level*/
let level
let screenScore;

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
	'assets/aliengirl-4.png',
	'assets/aliengirl-5.png',
	'assets/aliengirl-6.png',
	'assets/aliengirl-7.png',
	'assets/aliengirl-attack-1.png',
	'assets/aliengirl-attack-2.png',
	'assets/aliengirl-attack-3.png',
	'assets/aliengirl-attack-4.png',
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

var papaAttackAssets = [
	'assets/papa-two-attack-1.png',
	'assets/papa-two-attack-2.png',
	'assets/papa-two-attack-3.png',
	'assets/papa-two-attack-4.png',
	'assets/papa-two-attack-5.png',
	'assets/papa-two-attack-6.png',
	'assets/papa-two-attack-7.png'
];
var papaAttackFrames = [];

var explosionAssets = [
	'assets/explotion-1.png',
	'assets/explotion-2.png',
	'assets/explotion-2.png',
	'assets/explotion-3.png',
	'assets/explotion-3.png',
	'assets/explotion-4.png',
	'assets/explotion-4.png'
]
var explosionFrames = [];


var bottleImg;
var hideLowerImage;
var blastImage;
var towerImage;
let backgroundNight;
let backgroundDay;

let hideLower;
let hideLowerOne;
let towers;

function getAssets(){
	var backgroundNightImg = new Image();
	backgroundNightImg.onload = function(){
		backgroundNight = new Entity(0, 0, 0, 0, backgroundNightImg);
	}
	backgroundNightImg.src = 'assets/backgroundNight.jpg';

	var backgroundDayImg = new Image();
	backgroundDayImg.onload = function(){
		backgroundDay = new  Entity(0, 0, 0, 0, backgroundDayImg);
	}
	backgroundDayImg.src = 'assets/backgroundDay.jpg';
	
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

	bottleImg = new Image();
	bottleImg.onload = function(){
	}
	bottleImg.src = 'assets/bottle.png';

	hideLowerImage = new Image();
	hideLowerImage.onload = function(){
		hideLower = new Entity( GAME_WORLD_WIDTH - 145, (GAME_WORLD_HEIGHT / 2) + 10, 
			0, 0, hideLowerImage);
		hideLowerOne = new Entity( GAME_WORLD_WIDTH - 145, 123, 
			0, 0, hideLowerImage);
	}
	hideLowerImage.src = 'assets/hide-button.png';

	blastImage = new Image();
	blastImage.onload = function(){}
	blastImage.src = 'assets/blast.png';

	towerImage = new Image();
	towerImage.onload = function(){
		towers = new  Entity(0, 0, 0, 0, towerImage);
	}
	towerImage.src = 'assets/towers.png';

}


function getAnimationsAssets(){
	
	
	loadAnimationAssets(papaAttackAssets, 'papaTwo', papaAttackFrames, false);
	loadAnimationAssets(alienGirlAssets, 'alienCute', alienGirlFrames, false);
	loadAnimationAssets(toiletAssets, 'toiletGuy', toiletFrames, false);
	//loadAnimationAssets(cloudToiletAssets, 'cloudPop', cloudToiletFrames, true);
	loadAnimationAssets(alienAssets, 'alienM', alienFlyFrames, false);
	loadAnimationAssets(flyGuyAssets, 'fly', flyGuyFrames, false);
	loadAnimationAssets(papaAssets, 'papa', papaFrames, true);
	loadAnimationAssets(boosAlienAssets, 'boos', boosAlienFrames, false);
	loadAnimationAssets(guyPervAssets, 'perv', guyPervFrames, false);
	loadAnimationAssets(minChanAssets, 'min', minChanFrames, true);
	loadAnimationAssets(explosionAssets, ' ', explosionFrames, false);

	level = new Level();
	screenScore = new ScoreScreen( 
		[(GAME_WORLD_WIDTH / 2) - (400 / 2),(GAME_WORLD_HEIGHT / 2) - (300 / 2)], 400, 300);

}


function loadAnimationAssets(assets, object, assetArray, initializeObject){

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
				if(initializeObject)
					createObject(object, assetsFrames);
			}
		}
		img.src = assets[i];
		assetsFrames.push(img);
	}
}


function createObject(object, assetsFrames){
	switch(object){
		case 'papa':  
		 	papa = new EnemyGround(  X_AXIS_STARTING_POSITION , PAPA_GROUND_OFFSET , 
		 			PAPA_IMAGE_WIDTH, PAPA_IMAGE_HEIGHT, assetsFrames, PAPA_ANIMATION_VELOCITY, 
		 			PAPA_MOVEMENT_VELOCITY, 'xAxis');
			break;
		case 'perv':
			guyPerv = new EnemyGround( X_AXIS_STARTING_POSITION , PERV_GROUND_OFFSET, 
									PERV_IMAGE_WIDTH, PERV_IMAGE_HEIGHT, assetsFrames, 
									PERV_ANIMATION_VELOCITY, PERV_MOVEMENT_VELOCITY, 'xAxis');
			break;
		case 'papaTwo': 
			papaTwo = new DadTwo( WINDOW_X_STARTING_POSITION, 0, 
				PAPA_TWO_IMAGE_WIDTH, PAPA_TWO_IMAGE_HEIGHT, assetsFrames, 
				PAPA_TWO_ANIMATION_VELOCITY,  PAPA_TWO_MOVEMENT_VELOCITY);
				papaTwo.setPositionPapaTwo('TOP');
			break;
		case 'boos':
			boosAlien = new EntEnemyGroundity( X_AXIS_STARTING_POSITION, BOSS_GROUND_OFFSET, 
									BOSS_IMAGE_WIDTH, BOSS_IMAGE_HEIGHT ,assetsFrames, 
									BOSS_ANIMATION_VELOCITY, BOSS_MOVEMENT_VELOCITY, 'xAxis');
			break;
		case 'fly': 
			flyGuy = new EnemyFlying( X_AXIS_STARTING_POSITION, 0, 
								 GUY_FLY_IMAGE_WIDTH, GUY_FLY_IMAGE_HEIGHT, assetsFrames, 
								 GUY_FLY_ANIMATION_VELOCITY, GUY_FLY_MOVEMENT_VELOCITY);
			flyGuy.getNewPosition(canvas);
			flyGuy.setHealth(FLY_GUY_HEALTH);
			break;
		case 'toiletGuy':
			toilet = new EnemyGround( TOILET_SKY_X_OFFSET , X_AXIS_STARTING_POSITION, 
								 TOILET_IMAGE_WIDTH, TOILET_IMAGE_HEIGHT, assetsFrames, 
								 TOILET_ANIMATION_VELOCITY,  TOILET_MOVEMENT_VELOCITY,'yAxis');
			break;
		case 'cloudPop':
			cloudToilet = new EnemyGround( 100, -100, 0, 0, assetsFrames, 6, [ VELOCITY_X_ENTITIES, VELOCITY_Y_CLOUD], 'yAxis');
			break;
		case 'alienM':
			alien = new EnemyFlying( X_AXIS_STARTING_POSITION, 0 , 
								ALIEN_FLY_IMAGE_WIDTH, ALIEN_FLY_IMAGE_HEIGHT, assetsFrames, 
								ALIEN_FLY_ANIMATION_VELOCITY,  ALIEN_FLY_MOVEMENT_VELOCITY);
			alien.getNewPosition(canvas);
			alien.setHealth(ALIEN_FLY_HEALTH);
			break;
		case 'alienCute':
			alienGirl = new Entity(WINDOW_X_STARTING_POSITION, 0, 
					ALIEN_GIRL_IMAGE_WIDTH, ALIEN_GIRL_IMAGE_HEIGHT, assetsFrames, 
					ALIEN_GIRL_ANIMATION_VELOCITY, ALIEN_GIRL_MOVEMENT_VELOCITY, 'MIDDLE');
			alienGirl.setPositionAlienGirl();
			break;
		case 'min':
			minChan = new  MinChan(MIN_POSITION_X, INITIAL_Y_POSITION, 
				MIN_CHAN_WIDHT, MIN_CHAN_HEIGHT, assetsFrames, 
				MIN_ANIMATION_VELOCITY, MIN_MOVEMENT_VELOCITY);
			health = new Health([ (GAME_WORLD_WIDTH  / 2) + 230, 0], assetsFrames[0]);
			break;
	}
}
