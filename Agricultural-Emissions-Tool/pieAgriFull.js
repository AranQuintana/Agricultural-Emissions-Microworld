let colours = ['blue', 'red', 'yellow', 'green', 'orange', 'brown', 'white'];
let names = ['Enteric Fermentation', 'Manure Management', 'Agricultural Soils', 'Liming', 'Urea Application', 'Fuel Combustion'];
let values = [14.58, 2.67, 4.63, 0.62, 0.13, 0.7];
let total = 23.33;

function setup(){
    createCanvas(400,400);
    stroke('white');

}

function draw(){
    background(231,129,53);
    drawChart();
}

function drawChart(){
  noStroke();
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
        let offsetX = -120;
        if (mouseX < 120){
            offsetX = 0
        }
        let offsetY = -40;
        if (mouseY < 40){
            offsetY = 0
        }
        fill(231,129,53);
        stroke('black');
        rect(mouseX + offsetX, mouseY+offsetY, 120, 40);
        fill('black');
        noStroke();
        text(names[i], mouseX + 5 + offsetX, mouseY+offsetY + 15);
        text(nf(values[i],0,2) + ' Mt CO2e', mouseX + 5 +offsetX, mouseY+offsetY + 30);
    }
    lastAngle = angle;
  }
}