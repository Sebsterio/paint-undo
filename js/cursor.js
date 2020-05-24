/************************* Cursor *************************/

function updatePointerVar(cssVar, val, suffix) {
	document.documentElement.style.setProperty(cssVar, val + suffix);
}

function resizeCursor(lineWidth) {
	updatePointerVar("--size", lineWidth, "px");
}

function moveCursor(e) {
	updatePointerVar("--left", e.clientX, "px");
	updatePointerVar("--top", e.clientY, "px");
}

function setUpPointer(lineWidth) {
	updatePointerVar("--size", lineWidth, "px");
}
