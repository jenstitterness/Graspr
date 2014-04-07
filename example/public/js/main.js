window.onload = function() {

	var socket = io.connect('127.0.0.1:3000');

	var grasprVariables = {
		id: grasprContainer, // give id of container
		width: 600, //px
		height: 150, // px
		socket: socket
	};



	var graspr = new Graspr(grasprVariables);

	console.log('graspr:', graspr);

	$('#upVote').on('click', function() {
		console.log('up vote');
		grasprVariables.width = 1000;
		graspr.reset(grasprVariables);
		socket.emit('upVote', {data: {test: 'test'}});
	});


	$('#downVote').on('click', function() {
		console.log('down vote');

		socket.emit('downVote', {data: {test: 'test'}});

	});

	$('#startGraspr').on('click', function() {
		console.log('start graspr');
		if (graspr) {
			graspr.start();
		}
	});


	$('#stopGraspr').on('click', function() {
		console.log('stop graspr');
		if (graspr) {
			graspr.stop();
		}
	});

	$('#resetGraspr').on('click', function() {
		console.log('stop graspr');
		if (graspr) {
			grasprVariables.width = 500;
			graspr.reset(grasprVariables);
		}
	});


};
