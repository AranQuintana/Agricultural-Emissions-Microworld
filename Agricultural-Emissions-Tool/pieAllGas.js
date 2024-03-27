let colours = ['pink', 'blue', 'green', 'grey'];
let names = ['Florinate gases', 'Nitrous oxides', 'Methane', 'Carbon dioxide'];
let values = [0.75, 6.0119, 17.2675, 36.73];
let total = 60.76;

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
        let offsetX = -100;
        if (mouseX < 100){
            offsetX = 0
        }
        let offsetY = -40;
        if (mouseY < 40){
            offsetY = 0
        }
        fill(231,129,53);
        stroke('black');
        rect(mouseX + offsetX, mouseY+offsetY, 100, 40);
        fill('black');
        noStroke();
        text(names[i], mouseX + 5 + offsetX, mouseY+offsetY + 15);
        text(nf(values[i],0,2) + ' Mt CO2e', mouseX + 5 +offsetX, mouseY+offsetY + 30);
    }
    lastAngle = angle;
  }
}