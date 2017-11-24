

/* Wolrd*/

var GAME_WORLD_WIDTH  = 960;
var GAME_WORLD_HEIGHT = 560; 

/* Entities*/
var X_AXIS_STARTING_POSITION = -150; 
var TIMER_TO_IDLE = 2000;
var TIMER_TO_STAY_ON_WINDOW = 10000;
var TIMER_TO_RESIZE_SCORE = 250;
var VELOCITY_X_ENTITIES = 0.1;
var VELOCITY_Y_CLOUD = VELOCITY_X_ENTITIES * 2;

/* Papa entitie characteristics */
var PAPA_ANIMATION_VELOCITY = 20;
var PAPA_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
var PAPA_GROUND_OFFSET = GAME_WORLD_HEIGHT - 145;
var PAPA_IMAGE_WIDTH  =  85;
var PAPA_IMAGE_HEIGHT = 128;

/*Guy Perv*/

var PERV_ANIMATION_VELOCITY = 10;
var PERV_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
var PERV_GROUND_OFFSET = GAME_WORLD_HEIGHT - 140;
var PERV_IMAGE_WIDTH  =  61;
var PERV_IMAGE_HEIGHT = 113;

/*BOSS */
var BOSS_ANIMATION_VELOCITY = 5;
var BOSS_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, 0 ];
var BOSS_GROUND_OFFSET = GAME_WORLD_HEIGHT - 168;
var BOSS_IMAGE_WIDTH  =  109;
var BOSS_IMAGE_HEIGHT =  141;

/*Toilet guy */
var TOILET_ANIMATION_VELOCITY = 5;
var TOILET_MOVEMENT_VELOCITY  = [ VELOCITY_X_ENTITIES, VELOCITY_X_ENTITIES ];
var TOILET_SKY_X_OFFSET =  200;
var TOILET_GROUND_OFFSET = GAME_WORLD_HEIGHT - 165;
var TOILET_IMAGE_WIDTH  =  85;
var TOILET_IMAGE_HEIGHT =  138;

/*Alien fly*/
var ALIEN_FLY_ANIMATION_VELOCITY = 5;
var ALIEN_FLY_MOVEMENT_VELOCITY  = [ 0.1, 0.1 ];
var ALIEN_FLY_IMAGE_WIDTH  =  99;
var ALIEN_FLY_IMAGE_HEIGHT =  91;

/* Guy fly*/
var GUY_FLY_ANIMATION_VELOCITY = 5;
var GUY_FLY_MOVEMENT_VELOCITY  = [ 0.1, 0.1 ];
var GUY_FLY_IMAGE_WIDTH  =  97;
var GUY_FLY_IMAGE_HEIGHT =  90;


/*Arrow */
var ARROW_IMAGE_WIDTH  = 111;
var ARROW_IMAGE_HEIGHT = 24;
var ARROW_MOVEMENT_VELOCITY = [0.7, 0.1];
var ARROW_ANIMATION_VELOCITY = 0;
var ARROW_POSITION_X = (GAME_WORLD_WIDTH / 2) + 140;
var ARROW_TOP_SECTION = 97;
var ARROW_MIDDLE_SECTION = 265;
var ARROW_DOWN_SECTION = (GAME_WORLD_HEIGHT) - 135

/*Bottle */
var BOTTLE_IMAGE_WIDTH  = 36;
var BOTTLE_IMAGE_HEIGHT = 16;
var BOTTLE_MOVEMENT_VELOCITY = [0.7, 0.1];
var BOTTLE_ANIMATION_VELOCITY = 0;
var BOTTLE_POSITION_X = (GAME_WORLD_WIDTH ) - 155;
var BOTTLE_TOP_SECTION = 97;
var BOTTLE_MIDDLE_SECTION = 263;
var BOTTLE_DOWN_SECTION = (GAME_WORLD_HEIGHT) - 135

/*Blast*/
var BLAST_POSITION_X = (GAME_WORLD_WIDTH ) - 155;
var BLAST_IMAGE_WIDTH = 26;
var BLAST_IMAGE_HEIGHT = 26;
var BLAST_MOVEMENT_VELOCITY =  [0.7, 0.1];
var BLAST_TOP_SECTION = 93;
var BLAST_MIDDLE_SECTION = 260;

/*Window position*/

var WINDOW_WIDTH = 84;
var WINDOW_HEIGHT = 81;
var WINDOW_X_STARTING_POSITION = GAME_WORLD_WIDTH;
var WINDOW_X_POSITION = GAME_WORLD_WIDTH - 140;
var WINDOW_TOP_SECTION = 0;
var WINDOW_MIDDLE_SECTION = (GAME_WORLD_HEIGHT / 2) - 70;
var WINDOW_DOWN_SECTION = 0;

/*Papa two */
var PAPA_WINDOW_X_POSITION =  GAME_WORLD_WIDTH - 120;
var PAPA_TWO_Y_TOP = 45;
var PATA_TWO_Y_MIDDLE = (GAME_WORLD_HEIGHT / 2) - 70;
var PAPA_TWO_IMAGE_WIDTH  = 85;
var PAPA_TWO_IMAGE_HEIGHT = 128;
var PAPA_TWO_MOVEMENT_VELOCITY = [1, 0];
var PAPA_TWO_ANIMATION_VELOCITY = 5;

/*Alien Girl */

var ALIEN_GIRL_Y_TOP = 35;
var ALIEN_GIRL_Y_MIDDLE = (GAME_WORLD_HEIGHT / 2) - 78;
var ALIEN_GIRL_IMAGE_WIDTH = 96;
var ALIEN_GIRL_IMAGE_HEIGHT = 91;
var ALIEN_GIRL_MOVEMENT_VELOCITY  = [1, 0];
var ALIEN_GIRL_ANIMATION_VELOCITY = 6;
var ALIEN_GIRL_ATTACK_ANIMATION_VELOCITY = 5;

/*Enemyes health's*/
var FLY_GUY_HEALTH = 3;
var ALIEN_FLY_HEALTH = 3;


/*Score values*/
var FLY_GUY_SCORE = 2;
var ALIEN_FLY_SCORE = 5;
var GROUND_ENEMY_SCORE = 1;