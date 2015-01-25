//Create unique namespace
var SpaceHipster = SpaceHipster || {};

SpaceHipster.Game = function(){};
SpaceHipster.Game.prototype = {
	create: function() {
		//Set world dimensions
		this.game.world.setBounds(0, 0, 1920, 1920);
		
		//Tile space background
		this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
		
		//Create player
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
		this.player.scale.setTo(2); //Increase the size
		this.player.animations.add('fly', [0, 1, 2, 3], 5, true); //Cycle through sprites 0-3 at 5 frames each and repeat
		this.player.animations.play('fly');
		
		//Lock the camera on the player
		this.game.camera.follow(this.player); 
		
		//Create collectables
		this.generateCollectables();
		
		//Create asteroids
		this.generateAsteroids();
		
		//Set player score
		this.playerScore = 0;
		
		//Enable player physics
		this.game.physics.arcade.enable(this.player);
		this.playerSpeed = 120;
		this.player.body.collideWorldBounds = true;
		
		//Sounds
		this.explosionSound = this.game.add.audio('explosion');
		this.collectSound = this.game.add.audio('collect');
		
		//Show score
		this.showLabels();
	},
	update: function() {
		//When the user tap/clicks, move the player towards the click
		if(this.game.input.activePointer.justPressed()) {
			this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
		}
		
		//Detect collision between player and asteroid
		this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
		
		//Detect overlap between player and collectable
		this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
	},
	showLabels: function() {
		var text = "0";
		var style = { font: "20px Arial", fill: "#fff", align: "center" };
		this.scoreLabel = this.game.add.text(this.game.width - 50, this.game.height - 50, text, style);
		this.scoreLabel.fixedToCamera = true;
	},
	generateCollectables: function() {
		//Create a group for collectables
		this.collectables = this.game.add.group();
		
		//Physics
		this.collectables.enableBody = true;
		this.collectables.physicsBodyType = Phaser.Physics.ARCADE;
		
		//Create a random number of collectables
		var numCollectables = this.game.rnd.integerInRange(100, 150);
		var collectable;
		for (var i = 0; i < numCollectables; i++) {
			//Add sprite
			collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
			collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
			collectable.animations.play('fly');
		}
	},
	collect: function(player, collectable) {
		//Play collect sound
		this.collectSound.play();
		
		//Update score
		this.playerScore++;
		this.scoreLabel.text = this.playerScore;
		
		//Remove sprite
		collectable.destroy();
	},
	generateAsteroids: function() {
		//Create a group for asteroids
		this.asteroids = this.game.add.group();
		
		//Physics
		this.asteroids.enableBody = true;
		this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
		
		//Create a random number of asteroids
		var numAsteroids = this.game.rnd.integerInRange(150, 200);
		var asteroid;
		for (var i = 0; i < numAsteroids; i++) {
			//Add sprite
			asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
			asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40)/10);
			//Set physics
			asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
			asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
			asteroid.body.immovable = true; //This means colliding with the player wont affect their trajectory, not that they can't move at all
			asteroid.body.collideWorldBounds = true;
		}		 
	},
	hitAsteroid: function(player, asteroid) {
		//Play explosion sound
		this.explosionSound.play();
		
		//Make player explode
		var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
		emitter.makeParticles('playerParticle');
		emitter.minParticleSpeed.setTo(-200, -200);
		emitter.maxParticleSpeed.setTo(200, 200);
		emitter.gravity = 0;
		emitter.start(true, 1000, null, 100); //single emission = true, lasts 1000ms, null used for repeated emissions (we wont have any), 100 particles in this emission
		this.player.destroy();
		
		//Wait 800ms and call the Game Over method
		this.game.time.events.add(800, this.gameOver, this);
	},
	gameOver: function() {
		//Start the Main Menu state
		this.game.state.start('MainMenu', true, false, this.playerScore); //Start Main Menu, refresh game world = true, reset game cache = false, our parameter for init
	}
}