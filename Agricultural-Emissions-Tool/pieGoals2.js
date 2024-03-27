
function setup(){
    createCanvas(800,400);
    stroke('white');

}

function draw(){
    background(231,129,53);
    drawChart();
}

function drawChart(){
  noStroke();
  //let emissionsList = [enteric, manure, soils, urea, fuel, liming];
  fill('grey');
  let hover = dist(200, 200, mouseX, mouseY) < 200;
  if (hover){
    let offsetX = -100;
    if (mouseX < 100){
        offsetX = 0
    }
    let offsetY = -40;
    if (mouseY < 40){
        offsetY = 0
    }     
    stroke('black');
    circle(200,200,379);
    fill(231,129,53);
    rect(mouseX + offsetX, mouseY+offsetY, 100, 40);
    fill('black');
    noStroke();
    text('2030 projection', mouseX + 5 + offsetX, mouseY+offsetY + 15);
    text('62.7 Mt CO2e', mouseX + 5 +offsetX, mouseY+offsetY + 30);
  } else {
    noStroke();
    circle(200,200,379);  
    fill('black');
    text('greater than 2022???', 200, 200);
  }

  fill('grey');
  hover = dist(600, 200, mouseX, mouseY) < 165;
  if (hover){
    let offsetX = -100;
    if (mouseX < 100){
        offsetX = 0
    }
    let offsetY = -40;
    if (mouseY < 40){
        offsetY = 0
    }     
    stroke('black');
    circle(600,200,330);
    fill(231,129,53);
    rect(mouseX + offsetX, mouseY+offsetY, 100, 40);
    fill('black');
    noStroke();
    text('2030 goal', mouseX + 5 + offsetX, mouseY+offsetY + 15);
    text('47.4 Mt CO2e', mouseX + 5 +offsetX, mouseY+offsetY + 30);
  } else {
    noStroke();
    circle(600,200,330);
  }
}