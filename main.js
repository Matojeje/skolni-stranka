function onload() {

	// Canvas setup
	canvas = document.getElementById('animace');
	ctx = canvas.getContext('2d');

	fps = 60;
	thickness = 3;
	gap = 1;
	barCount = canvas.width / (thickness + gap);

	bar = [];
	for (let i = 0; i < barCount; i++) {
		bar[i] = {
			position: Math.random() * (canvas.height / 2) + (canvas.height / 2) - (Math.sin((i / barCount + 0.5) * Math.PI) * canvas.height / 3),
			speed: Math.random() * (canvas.height) + 80
		}
	}

	frame = 0;
	setInterval(draw, 1000 / fps);
}

function displayView(view) {
	document.getElementById("content").innerHTML = document.getElementById(view).innerHTML;
	document.getElementById("title").innerHTML = document.getElementById(view).title;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < barCount; i++) {

		// Draw rainbow sine wave
		var hue = Math.sin(i / barCount + frame / 1000) * 360;
		ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.35)`;
		ctx.fillRect(
			i * (thickness + gap),
			Math.sin((i / barCount * 4 + frame / 600) * Math.PI) * canvas.height / 2 + canvas.height / 2,
			thickness,
			3
		);

		// Draw audio bars
		bar[i].position += bar[i].speed / canvas.height;
		if (bar[i].position > canvas.height) {
			bar[i].position -= canvas.height;
		}
		var alpha = bar[i].position / canvas.height;

		ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
		ctx.fillRect(
			i * (thickness + gap),
			bar[i].position,
			thickness,
			canvas.height
		);
	}

	frame++;
}