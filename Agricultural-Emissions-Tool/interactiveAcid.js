let colours = ['blue', 'red', 'yellow', 'green', 'orange', 'brown', 'white'];
let names = ['Enteric Fermentation', 'Manure Management', 'Agricultural Soils', 'Liming', 'Urea Application', 'Fuel Combustion', 'Reduction in emissions'];
let values = [14.58, 2.67, 4.63, 0.62, 0.13, 0.7, 0];
let total = 23.33;
let invest = 0;

function setup(){
    createCanvas(700,400);
    stroke('white');

    investor = createSlider(0, 100000000, 0);
    investor.position(windowWidth * 0.7, windowHeight * 0.8);
    investor.size(300);
}

function draw(){
    background(231,129,53);
    invest = investor.value();
    drawChart();
    push();
    fill('black');
    textSize(15);
    text('Manure Acidification', 500 ,200);
    text('€' + investor.value(), 500 ,270);
    pop();
}

function drawChart(){
  calculate();
  noStroke();
  values[6] = total - values[0] - values[1] - values[2] - values[3] - values[4] - values[5];
  //let emissionsList = [enteric, manure, soils, urea, fuel, liming];
  let lastAngle = 0;
  for (let i = 0; i < values.length; i++){
    let mouseAngle = atan2(mouseY-200, mouseX-200);
    if (mouseAngle < 0) {
        mouseAngle += radians(360);
      }
    angle = values[i]/total * TWO_PI + lastAngle;
    let hover = dist(200, 200, mouseX, mouseY) < 200 && mouseAngle >= lastAngle && mouseAngle < angle;
    if (hover){
        stroke('black');
      } else {
        noStroke();
      }
    fill (colours[i]);
    arc(
      200,
      200,
      400,
      400,
      lastAngle,
      angle,
      PIE
    );
    lastAngle = angle;
    noStroke();
  }
  lastAngle = 0;
  for(let i = 0; i < values.length; i++){
    let mouseAngle = atan2(mouseY-200, mouseX-200);
    if (mouseAngle < 0) {
        mouseAngle += radians(360);
      } 
    angle = values[i]/total * TWO_PI + lastAngle;
    let hover = dist(200, 200, mouseX, mouseY) < 200 && mouseAngle >= lastAngle && mouseAngle < angle;
    if(hover){
        let offsetX = -130;
        if (mouseX < 130){
            offsetX = 0
        }
        let offsetY = -40;
        if (mouseY < 40){
            offsetY = 0
        }
        fill(231,129,53);
        stroke('black');
        rect(mouseX + offsetX, mouseY+offsetY, 130, 40);
        fill('black');
        noStroke();
        text(names[i], mouseX + 5 + offsetX, mouseY+offsetY + 15);
        text(nf(values[i],0,2) + ' Mt CO2e', mouseX + 5 +offsetX, mouseY+offsetY + 30);
    }
    lastAngle = angle;
  }
  fill('white');
}

function calculate(){
  values[1] = 2.67 / (1 + 1.63 * invest / 1000000000);
}