window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
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
    if (color == true) {
        cell.forEach(div => div.addEventListener("mousedown", (event) => {
            cell.forEach(div => div.addEventListener("mousemove", setColor));
        }));
        cell.forEach(div => div.addEventListener("mouseup", (event) => {
            cell.forEach(div => div.removeEventListener("mousemove", setColor));
        }));
        cell.forEach(div => div.addEventListener("mousedown", (event) => {
            cell.forEach(div => div.removeEventListener("mousemove", setRainbow));
        }));
        cell.forEach(div => div.addEventListener("mouseup", (event) => {
            cell.forEach(div => div.removeEventListener("mousemove", setRainbow));
        }));
    }
    if (rainbow == true) {
        cell.forEach(div => div.addEventListener("mousedown", (event) => {
            cell.forEach(div => div.addEventListener("mousemove", setRainbow));
        }));
        cell.forEach(div => div.addEventListener("mouseup", (event) => {
            cell.forEach(div => div.removeEventListener("mousemove", setRainbow));
        }));
        cell.forEach(div => div.addEventListener("mousedown", (event) => {
            cell.forEach(div => div.removeEventListener("mousemove", setColor));
        }));
        cell.forEach(div => div.addEventListener("mouseup", (event) => {
            cell.forEach(div => div.removeEventListener("mousemove", setColor));
        }));
    }
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

function makeGrid(x) {
    document.getElementById("container").innerHTML = '';
    
    var gridSize = document.getElementById("sizeSlider").value;
    let cellSize = Math.floor(720 / gridSize);
    const node = document.createElement("div");
    node.setAttribute("class", "cell");
    for (var i = 0; i < (gridSize**2); i++) {
        document.getElementById("container").appendChild(node.cloneNode(true)); 
        document.getElementsByClassName("cell")[i].style.width = cellSize + "px";
        document.getElementsByClassName("cell")[i].style.height = cellSize + "px";
    }
    setMode();
}