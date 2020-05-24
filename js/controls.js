/************************* Controls *************************/

function handleMouseDown(e) {
	if (info) info.remove(); // overlay div
	isDrawing = true;
	startStroke(e);
}

function handleMouseMove(e) {
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

function handleKeyDown(e) {
	if ((e.key && e.key == "Backspace") || (e.keyCode && e.keyCode == 8)) undo();
}

function initControls() {
	canvas.addEventListener("mousedown", handleMouseDown);
	canvas.addEventListener("mousemove", handleMouseMove);
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
