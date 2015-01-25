//Create unique namespace
var SpaceHipster = SpaceHipster || {};

//Set up game and load preload assets
SpaceHipster.Boot = function(){};
SpaceHipster.Boot.prototype = {
	preload: function() {
		//assets for preload screen
		this.load.image('logo', 'assets/images/logo.png');
		this.load.image('preloadBar', 'assets/images/preloader-bar.png');
	},
	create: function() {
		//Background
		this.game.stage.backGroundColor = '#fff';
		
		//Scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 240;
		this.scale.minHeight = 170;
		this.scale.maxWidth = 2880;
		this.scale.maxHeight = 1920;
		this.scale.pageAlignHorizontally = true; //center game horizontally
		this.scale.setScreenSize(true); //set screen size automatically
		
		//Physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
		
		//Start the next state
		this.state.start('Preload');
	}
};