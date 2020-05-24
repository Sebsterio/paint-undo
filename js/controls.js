/************************* Controls *************************/

function handleMouseDown(e) {
	if (info) info.remove(); // overlay div
	isDrawing = true;
	startStroke(e);
}

function handleMouseMove(e) {
	if (!cursorVisible) toggleCursor(true);
	moveCursor(e);
	if (isDrawing) drawAndSave(e);
}

function handleMouseUp(e) {
	if (isDrawing) {
		endStroke(e);
		isDrawing = false;
	}
}

function handleWheel(e) {
	lineWidth = changeLineWidth(e, lineWidth);
	ctx.lineWidth = lineWidth;
	resizeCursor(lineWidth);
}

// Discern between touch stroke and tap
function handleTouch(e) {
	e.preventDefault(); // Prevent mouse event from firing
	if (info) info.remove(); // overlay div

	if (e.type === "touchstart") {
		handleTouch.tap = true;
		startStroke(e);
	} else if (e.type === "touchmove") {
		handleTouch.tap = false;
		toggleCursor(false);
		drawAndSave(e);
	} else if (e.type === "touchend" || e.type === "touchcancel") {
		endStroke(e);
		if (handleTouch.tap) undo();
	}
}

function handleKeyDown(e) {
	if ((e.key && e.key == "Backspace") || (e.keyCode && e.keyCode == 8)) undo();
}

function initControls() {
	document.addEventListener("mousedown", handleMouseDown);
	document.addEventListener("mousemove", handleMouseMove);
	canvas.addEventListener("mouseup", handleMouseUp);
	canvas.addEventListener("mouseout", handleMouseUp);

	canvas.addEventListener("touchstart", handleTouch);
	canvas.addEventListener("touchmove", handleTouch);
	canvas.addEventListener("touchend", handleTouch);
	canvas.addEventListener("touchcancel", handleTouch);

	document.addEventListener("wheel", handleWheel);

	document.addEventListener("keydown", handleKeyDown);

	window.addEventListener("resize", () => {
		resetCanvas(); // (Canvas props get reset)
		redraw();
	});
}
