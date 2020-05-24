/************************* Canvas *************************/

// ------------------------------ Aux ------------------------------

// Get event coords relative to doc
function getCoords(e) {
	return [
		e.pageX || (e.touches ? Math.floor(e.changedTouches[0].pageX) : 0),
		e.pageY || (e.touches ? Math.floor(e.changedTouches[0].pageY) : 0),
	];
}

// ------------------------------ Draw ------------------------------

function startStroke(e) {
	// Initialize new stroke
	strokes.push([]);
	[lastX, lastY] = getCoords(e);
}

// Draw vector on canvas
function renderLine(x1, y1, x2, y2, h, l) {
	ctx.strokeStyle = `hsl(${h},100%, 50%)`;
	ctx.lineWidth = l;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawAndSave(e) {
	const [x, y] = getCoords(e);
	const line = [lastX, lastY, x, y, hue, lineWidth];
	renderLine(...line);
	lines.push(line);
	[lastX, lastY] = [x, y];

	hue++;
	if (hue > 360) hue = hue - 360;
}

function endStroke(e) {
	// Push points to current stroke
	if (lines.length > 0) {
		strokes[strokes.length - 1].push(...lines, hue);
		lines = [];
	} else strokes.pop();
}

// ------------------------------ Undo & resize ------------------------------

// Draw lines stored in array `strokes`
function redraw() {
	strokes.forEach((stroke) =>
		stroke.forEach((line) => {
			if (line.length > 1) {
				renderLine(line[0], line[1], line[2], line[3], line[4], line[5]);
			} else hue = line; // restore `hue` to its state at that time
		})
	);
}

function undo() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	strokes.pop();
	redraw();
}

// Discern between touch stroke and tap
function handleTouch(e) {
	e.preventDefault(); // Prevent mouse event from firing
	if (e.type === "touchstart") {
		handleTouch.tap = true;
		startStroke(e);
	} else if (e.type === "touchmove") {
		handleTouch.tap = false;
		drawAndSave(e);
	} else if (e.type === "touchend" || e.type === "touchcancel") {
		endStroke(e);
		if (handleTouch.tap) undo();
	}
}
