/************************* Setup *************************/

const info = document.getElementById("info");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Save ctx props outside of ctx as they get reset on resize
let lineCap = "round";
let lineJoin = "round";
let lineWidth = 10;

// Changes over time during a stroke
let hue = 0;

// Vars related to "undo"
let isDrawing = false;
let lastX, lastY, curX, curY;
const strokes = []; // arr of lines
let lines = []; // arr of coord pairs

// Cursor
cursorVisible = false;

// ------------------------------ Setup ------------------------------

// Declare / restore props as they got reset by resize
function resetCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.lineCap = lineCap;
	ctx.lineJoin = lineJoin;
	ctx.lineWidth = lineWidth;
}

function changeLineWidth(e, lineWidth) {
	const step = e.altKey ? 20 : e.shiftKey ? 1 : 5;
	lineWidth = e.wheelDeltaY > 0 ? lineWidth + step : lineWidth - step;
	return lineWidth > 0 ? lineWidth : 1;
}
