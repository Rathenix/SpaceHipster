//Create unique namespace
var SpaceHipster = SpaceHipster || {};

SpaceHipster.MainMenu = function(){};
SpaceHipster.MainMenu.prototype = {
	init: function(score) {
		var score = score || 0;
		this.highestScore = this.highestScore || 0;
		this.highestScore = Math.max(score, this.highestScore);
	},
	create: function() {
		//Tile the space image from 0,0 to width,height
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		
		//Give it speed in the x axis
		this.background.autoScroll(-20, 0);
		
		//Start Game text
		var text = "Tap to Begin";
		var style = { font: "30px Arial", fill: "#fff", align: "center" };
		var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
		t.anchor.set(0.5);
		
		//High Score text
		text = "High Score: " + this.highestScore;
		style = { font: "15px Arial", fill: "#fff", align: "center" };
		var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
		h.anchor.set(0.5);
	},
	update: function() {
		//Once the screen is clicked/touched, start the next state
		if(this.game.input.activePointer.justPressed()) {
			this.game.state.start('Game');
		}
	}
};