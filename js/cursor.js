/************************* Cursor *************************/

function updateCursorVar(cssVar, val, suffix) {
	document.documentElement.style.setProperty(cssVar, val + suffix);
}

function resizeCursor(lineWidth) {
	updateCursorVar("--size", lineWidth, "px");
}

function moveCursor(e) {
	updateCursorVar("--left", e.clientX, "px");
	updateCursorVar("--top", e.clientY, "px");
}

function toggleCursor(bool) {
	cursorVisibl = bool;
	updateCursorVar("--visibility", bool ? "visible" : "hidden", "");
}

function setUpCursor(lineWidth) {
	updateCursorVar("--size", lineWidth, "px");
}
