//Create unique namespace
var SpaceHipster = SpaceHipster || {};

//Load all game assets
SpaceHipster.Preload = function(){};
SpaceHipster.Preload.prototype = {
	preload: function() {
		//Show logo
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);
		
		//Show loading bar
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar); //This takes an image sprite and make it into a loading bar auto-magically
		
		//Load game images
		this.load.image('space', 'assets/images/space.png');		
		this.load.image('rock', 'assets/images/rock.png');
		this.load.image('playerParticle', 'assets/images/player-particle.png');
		
		//Load game sprites
		this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
		this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
		
		//Load game audio
		this.load.audio('collect', 'assets/audio/collect.ogg');
		this.load.audio('explosion', 'assets/audio/explosion.ogg');
	},
	create: function() {
		//Start the next state
		this.state.start('MainMenu');
	}
};