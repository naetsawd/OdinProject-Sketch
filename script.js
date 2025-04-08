window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    const sizeSlider = document.getElementById("sizeSlider");
    sizeSlider.value = 16;
    
    makeGrid();
});

var color = true;
var rainbow = false;

const sizeValue = document.getElementById('sizeValue')
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
  }

function chooseColor() {
    color = true;
    rainbow = false;
    setMode();
}

function chooseRainbow() {
    color = false;
    rainbow = true;
    setMode();
}

function setColor() {
    var chosen = document.getElementById("colorPicker").value;
    this.style.backgroundColor = chosen;
}

function setRainbow() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const newColor = "#" + randomColor;
    this.style.backgroundColor = newColor;

}

function setMode() {
    const cell = document.querySelectorAll("#container div");
    var setThis = setColor;
    var removeThis = setRainbow;

    if (rainbow == true) {
        setThis = setRainbow;
        removeThis = setColor;
    }
    cell.forEach(div => div.addEventListener("mousedown", (event) => {
        cell.forEach(div => div.addEventListener("mousemove", setThis));
    }));
    cell.forEach(div => div.addEventListener("mouseup", (event) => {
        cell.forEach(div => div.removeEventListener("mousemove", setThis));
    }));
    cell.forEach(div => div.addEventListener("mousedown", (event) => {
        cell.forEach(div => div.removeEventListener("mousemove", removeThis));
    }));
    cell.forEach(div => div.addEventListener("mouseup", (event) => {
        cell.forEach(div => div.removeEventListener("mousemove", setThis));
    }));
}

function eraser() {
    const cell = document.querySelectorAll("#container div");
    cell.forEach(div => div.addEventListener("mousedown", (event) => {
        cell.forEach(div => div.addEventListener("mousemove", erase));
        console.log("eraser down")
    }));
    cell.forEach(div => div.addEventListener("mouseup", (event) => {
        cell.forEach(div => div.removeEventListener("mousemove", erase));
        console.log("eraser up")
    }));
}

function erase() {
    this.style.backgroundColor = "#7fffd4";
}

function stopEraser() {
    const cell = document.querySelectorAll("#container div");
    cell.forEach(div => div.addEventListener("mousedown", (event) => {
        cell.forEach(div => div.removeEventListener("mousemove", erase));
    }));
    cell.forEach(div => div.addEventListener("mouseup", (event) => {
        cell.forEach(div => div.removeEventListener("mousemove", erase));
    }));
    console.log("eraser stopped")
}

function makeGrid() {
    const container = document.getElementById("container");
    container.innerHTML = '';

    const gridSize = document.getElementById("sizeSlider").value;

    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        container.appendChild(cell);
    }

    setMode();
}