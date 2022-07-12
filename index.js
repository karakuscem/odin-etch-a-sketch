//Select elements
const colorMode = document.getElementById("color-mode");
const colorSelector = document.getElementById("change-color");
const rainbowMode = document.getElementById("rainbow-mode");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const sizeText = document.getElementById("size");
const sizeSlider = document.getElementById("size-slider");
const grid = document.getElementById("grid");

//Define some variables needed

let currentSize = 16;
let currentMode = "color-mode";
let currentColor = "#333333";

//Change mode

function changeMode(newMode) {
    currentMode = newMode;
}

colorMode.onclick = () => changeMode("color-mode");
rainbowMode.onclick = () => changeMode("rainbow-mode");
eraser.onclick = () => changeMode("eraser");

//Change color for color mode

function changeColor(newColor) {
    currentColor = newColor;
}

colorSelector.oninput = (e) => changeColor(e.target.value);
//If clear clicked remove all color

function clearGrid (){
    grid.innerHTML = "";
    makeGrid(currentSize);
}

//Reload grid

function reloadGrid() {
    clearGrid();
    makeGrid(currentSize);
}

//Changing size and size text

sizeSlider.onmousemove = (e) => changeSizeText(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function changeSizeText(size) {
    sizeText.textContent = `${size} x ${size}`;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function changeSize(size) {
    setCurrentSize(size);
    changeSizeText(size);
    reloadGrid()
}

//Function to make grid given size

function makeGrid(currentSize) {
    //Make divs look like grid
    grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
    //Loop to create div and adding event listener
    for (let i = 0; i < currentSize * currentSize; i++) {
        //Creating div and giving class
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        // Adding event listener and append 
        gridElement.addEventListener('mouseover', dye);
        gridElement.addEventListener('mousedown', dye);
        grid.appendChild(gridElement);
    }
}
//Some code for click,drag and draw taken from ; https://michalosman.github.io/etch-a-sketch/
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
//Function to change color

function dye(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    else if (currentMode === "color-mode") {
        e.target.style.backgroundColor = currentColor
    }
    else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "rgb(197, 189, 189)"
    }
    else if (currentMode === "rainbow-mode") {
        let randomR = Math.floor(Math.random() * 256)
        let randomG = Math.floor(Math.random() * 256)
        let randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
}

window.onload = () => {
    makeGrid(currentSize)
}