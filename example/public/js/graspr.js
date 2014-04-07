// console.log('graspr', io);

function Graspr(options) {
	this.options = options;

	this._init();
}


Graspr.prototype._init = function() {
	console.log('init', this.options.id);
	var self = this;

	if (!this.options) {
		return {error: 'invalid init'};
	}

	var width = this.options.width,
		height = this.options.height;

	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');

	this.canvas.setAttribute('id', this.options.id.id + 'Canvas');
	this.canvas.setAttribute('width', width);
	this.canvas.setAttribute('height', height);

	// remove any old canvases
	while(this.options.id.hasChildNodes()) {
		this.options.id.removeChild(this.options.id.firstChild);
	}

	// add canvas to container
	this.options.id.appendChild(this.canvas);//"<canvas id="+this.options.id.id+"Canvas" + " width=" + width + " height=" + height + "></canvas>"

	// top bar
	this.context.moveTo(0, 0.5);
	this.context.lineTo(width, 0.5);

	// bottom bar
	this.context.moveTo(0, height - 0.5);
	this.context.lineTo(width, height - 0.5);
	
	// set styles
	this.context.strokeStyle = "#000";

	// draw it
	this.context.stroke();

	// set up draw interval
	this.draw = function() {
		var x = Math.floor(Math.random() * (self.options.width - 0) + 0);
		var y = Math.floor(Math.random() * (self.options.height - 0) + 0);
console.log('x:', x);
console.log('y:', y);
		// self.context.moveTo(x, y);
		self.context.fillRect(x, y, x + 1, y + 1);
		// self.context.stroke();
	};


	if (this.options.socket) {
		this.options.socket.on('graspr', function(data) {
			console.log('data:', data);
		})
	}
};

Graspr.prototype.start = function() {
	console.log('this.draw:', this.draw);
	this.timer = setInterval(this.draw, 1000);
};

Graspr.prototype.stop = function() {
	clearInterval(this.timer);
};

Graspr.prototype.reset = function(options) {
	this.options = options;
	this.canvas.setAttribute('width', this.options.width);
	this._init();
};