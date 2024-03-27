const width = window.innerWidth;
const height = window.innerHeight;

let enteric = 14581.46;
let manure = 2672.07;
let soils = 4625.69;
let liming = 623.98;
let urea = 126.82;
let fuel = 707.04;
let emissionNames = ['enteric', 'manure', 'soils', 'urea', 'fuel', 'liming']

let sidebar = false;

let budget = 100000000;

let hedgerows;
let grassland;
let slurry;



function setup() {
  createCanvas(width, height);
  stroke('white');
  rect(0,height/6,width,height/108);
  rect(1430/1920*width,190/1080*height,10/1920*width,890/1080*height);

  hedgerows = createSlider(0,100000000000, 0, 10000);
  hedgerows.position(width*0.08, height*0.3);
  hedgerows.size(120);

  grassland = createSlider(0,100000000, 0, 10000);
  grassland.position(width*0.08, height*0.5);
  grassland.size(120);

  slurry = createSlider(0,100000000, 0, 10000);
  slurry.position(width*0.08, height*0.7);
  slurry.size(120);
}

function draw() {
  background(231,129,53);
  rect(0,height/6,width,height/108);
  rect(1430/1920*width,190/1080*height,10/1920*width,890/1080*height);

  if (sidebar == false){
    closedSidebar();
  }
 
  if (sidebar == true){
    openSidebar();
  }

  //rect(mouseX, mouseY, 10, 10);
  drawPie();
  drawBudget();
  writeText();
  createParameters();
  drawChecks();
}

function writeText(){
  fill('black');
  text('Hedgerows and Trees', width*0.08, height * 0.35);
  text('€' + nf(hedgerows.value(), [], 2), width*0.08, height * 0.29);
  
  text('Grassland Productivity', width*0.08, height * 0.55);
  text('€' + nf(grassland.value(), [], 2), width*0.08, height * 0.49);

  
  text('Low Emission Slurry', width*0.08, height * 0.75);
  text('€' + nf(slurry.value(), [], 2), width*0.08, height * 0.69);
  fill('white');
}

function closedSidebar(){
  rect(10/1920*width,190/1080*height, 2/1920*width, 400/1080*height);
  rect(17/1920*width,190/1080*height, 2/1920*width, 400/1080*height);
  rect(10/1920*width,680/1080*height, 2/1920*width, 400/1080*height);
  rect(17/1920*width,680/1080*height, 2/1920*width, 400/1080*height);
 
   
  beginShape();
  vertex(10/1920*width, 600/1080*height);
  vertex(45/1920*width, 635/1080*height);
  vertex(10/1920*width, 670/1080*height);
  vertex(12/1920*width, 670/1080*height);
  vertex(47/1920*width, 635/1080*height);
  vertex(12/1920*width, 600/1080*height);
  endShape(CLOSE)
 
  beginShape();
  vertex(17/1920*width, 600/1080*height);
  vertex(52/1920*width, 635/1080*height);
  vertex(17/1920*width, 670/1080*height);
  vertex(19/1920*width, 670/1080*height);
  vertex(54/1920*width, 635/1080*height);
  vertex(19/1920*width, 600/1080*height);
  endShape(CLOSE)

}

function openSidebar(){
  rect(410/1920*width, 190/1080*height, 2/1920*width, 400/1080*height);
  rect(417/1920*width, 190/1080*height, 2/1920*width, 400/1080*height);
  rect(410/1920*width, 680/1080*height, 2/1920*width, 400/1080*height);
  rect(417/1920*width, 680/1080*height, 2/1920*width, 400/1080*height);
 
   
  beginShape();
  vertex(410/1920*width, 600/1080*height);
  vertex(375/1920*width, 635/1080*height);
  vertex(410/1920*width, 670/1080*height);
  vertex(412/1920*width, 670/1080*height);
  vertex(377/1920*width, 635/1080*height);
  vertex(412/1920*width, 600/1080*height);
  endShape(CLOSE)
 
  beginShape();
  vertex(417/1920*width, 600/1080*height);
  vertex(382/1920*width, 635/1080*height);
  vertex(417/1920*width, 670/1080*height);
  vertex(419/1920*width, 670/1080*height);
  vertex(384/1920*width, 635/1080*height);
  vertex(419/1920*width, 600/1080*height);
  endShape(CLOSE)

}

function mouseClicked(){
  if (mouseX < 53/1920*width && mouseY > 600/1080*height && mouseY < 670/1080*height){
    if (sidebar == false){
      sidebar = true;
    }
  }
 
  if (mouseX > 382/1920*width && mouseX < 419/1920*width && mouseY > 600/1080*height && mouseY < 670/1080*height){
    if (sidebar == true){
      sidebar = false;
    }
  }
}

function mouseReleased(){
  if (budget > 0){

  }
}

function drawPie() {
  noStroke();
  let total = enteric + manure + soils + urea + fuel + liming;
  let arcs = [enteric*360/total, manure*360/total, soils*360/total, urea*360/total, fuel*360/total, liming*360/total, ]
  let lastAngle = 0;
  let centreX = width*0.87;
  let centreY = height*0.75;
  for (let i = 0; i < arcs.length; i++){
    let colours = ['blue', 'red', 'yellow', 'green', 'orange', 'brown'];
    let mouseAngle = atan2(mouseY-centreY, mouseX-centreX);
    let nextAngle = lastAngle + radians(arcs[i]);
    if (mouseAngle < 0) {
      mouseAngle += radians(360);
    }
    let hover = dist(centreX, centreY, mouseX, mouseY) < width*0.05 && mouseAngle >= lastAngle && mouseAngle < nextAngle;
    if (hover){
      stroke('black');
    } else {
      noStroke();
    }
    fill (colours[i]);
    arc(
      centreX,
      centreY,
      width * 0.1,
      width * 0.1,
      lastAngle,
      nextAngle
    );
    lastAngle = nextAngle;
    noStroke();
  }
  lastAngle = 0;
  for (let i = 0; i < arcs.length; i++){
    let mouseAngle = atan2(mouseY-centreY, mouseX-centreX);
    let nextAngle = lastAngle + radians(arcs[i]);
    if (mouseAngle < 0) {
      mouseAngle += radians(360);
    }    let hover = dist(centreX, centreY, mouseX, mouseY) < width*0.05 && mouseAngle >= lastAngle && mouseAngle < nextAngle; 
    if (hover){
      fill(231,129,53);
      stroke('black');
      rect(mouseX - 90, mouseY-30, 90, 30);
      fill('black');
      noStroke();
      text(emissionNames[i], mouseX-80, mouseY-10);
    } 
    lastAngle = nextAngle;
  }
  fill('black');
  text('Total Emissions:', centreX-width*0.05, centreY +width*0.07);
  text(nf(total, [], 2) + ' kt CO2eq', centreX-width*0.05, centreY +width*0.08);
  fill('white');
  noStroke();
}

function drawBudget(){
  textSize(150);
  fill('black');
  text('€', width*0.82, height * 0.43);
  textSize(12);
  text('Budget: ', width*0.82, height * 0.48);
  text('€' + nf(budget, [], 2), width*0.82, height * 0.5);

  fill('white');
}

function createParameters(){
  urea = 126.82 * 10000000/(slurry.value() + 10000000);
  budget = 100000000 - hedgerows.value();
  budget = budget - grassland.value();
  budget = budget - slurry.value();
}

function drawChecks(){
  stroke('grey');
  strokeWeight(10);
  rect(width*0.7, height*0.04, 60, 60);
  strokeWeight(1);
  noStroke();
  if(budget < 90000000){
    fill(24,235,74);
    beginShape();
    vertex(width*0.71, height*0.1);
    vertex(width*0.723, height*0.12);
    vertex(width*0.74, height*0.06);
    vertex(width*0.74, height*0.05);
    vertex(width*0.723, height*0.11);
    vertex(width*0.71, height*0.09);
    endShape(CLOSE)
  }

  fill('white');
}