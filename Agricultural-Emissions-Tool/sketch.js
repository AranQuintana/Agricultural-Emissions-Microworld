class Parameter{
  constructor(name, xpos, ypos, eventName, resetName, infoName){
      this.input = createInput();
      this.input.position(xpos, ypos);
      this.input.size(80);
      this.button = createButton('invest');
      this.button.position(xpos + this.input.width + 8, ypos);
      this.button.mousePressed(eventName);
      this.resetter = createButton('reset');
      this.resetter.position(this.button.x + this.button.width, ypos);
      this.resetter.mousePressed(resetName);
      this.info = createButton('🛈');
      this.info.position(this.resetter.x + this.resetter.width, ypos-1);
      this.info.mousePressed(infoName);

      this.name = name;
      this.error = '';
      this.investment = 0;
  }
  drawName(){
    push();
    text(this.name, this.input.x + 5, this.input.y + 35);
    pop();
  }

  //invest(){
  //  val = this.input.value();
  //  this.input.value('');
  //  this.error = '';
  //
  //  val = int(val);
  //  if (isNaN(val)){
  //    this.error = 'error: Not a Number';
  //  } else if (val < 0){
  //    this.error = 'Please invest a positive amount';
  //  } else if (val > budget){
  //    this.error = 'exceeds budget';
  //  }else {
  //    this.investment = this.investment + val;
  //  }
  //}

  drawWords(){
    if (this.error != ''){
      text(this.error, this.input.x, this.input.y - 5);
    }
    if (this.investment > 0){
      text('€' + nfc(this.investment), this.input.x, this.input.y - 20);
    }
  }

  //info2(){
  //  if (sidebar == true && sidebarContents == 1){
  //    sidebar = false;
  //    sidebarContents = 0;
  //  } else {
  //  sidebar = true;
  //  sidebarContents = 1;
  //  }
  //}
}

const width = window.innerWidth;
const height = window.innerHeight;

const goals = [21000, 15000];

let enteric = 14581.46;
let manure = 2672.07;
let soils = 4625.69;
let liming = 623.98;
let urea = 126.82;
let fuel = 707.04;
let emissionNames = ['Enteric Fermentation', 'Manure Mangagement', 'Agricultural Soils', 'Urea Application', 'Fuel Combustion', 'Liming', 'Recuction in Emissions']
let emissionDefinitions = [
  "The breakdown of carbohydrates in animals' food into simple molecules. This process produces methane, which is expelled in burps and farts.",
  'Animal manure is used as fertiliser. The management, storage, and spreading of manure results in the production of methane and nitrous oxide.',
  "Synthetic fertilisers, animal wastes, nitrogen fixation by crops, and soil cultivation contribute to the emission of nitrous oxides.",
  "Applying fertilisers which contain urea to soils results in the emission of carbon dioxide.",
  "Fuel combustion releases carbon dioxide. In the Agricultural Sector, fuel combustion is used for a variety of goals.",
  "Limestone is applied to soil in order to correct its acidity. This results in carbon dioxide emissions.",
  "The reduction in greenhouse gas emissions as a result of your investments."
]

let sidebar = true;
let sidebarContents;

let budget = 100000000;

let soilPh;
let soilInvest;
let soilError;

let sward;
let swardError;
let swardInvest;

let slurry;
let slurryError;
let slurryInvest;

let acid;
let acidError;
let acidInvest;

let cover;
let coverError;
let coverInvest;

let feed;
let feedError;
let feedInvest;

let scenario;


function setup() {
  createCanvas(width, height);
  stroke('white');
  rect(0,height/6,width,height/108);
  rect(1430/1920*width,190/1080*height,10/1920*width,890/1080*height);

  scenario = 1;

  //soilPh = createInput();
  //soilPh.position(width*0.08, height*0.3);
  //soilPh.size(80);
  //soilButton = createButton('invest');
  //soilButton.position(soilPh.x + soilPh.width + 8, soilPh.y);
  //soilButton.mousePressed(soilEntry);
  //soilResetter = createButton('reset');
  //soilResetter.position(soilButton.x + soilButton.width, soilPh.y);
  //soilResetter.mousePressed(soilReset);
  //soilInfo = createButton('🛈');
  //soilInfo.position(soilResetter.x + soilResetter.width, soilPh.y-1);
  //soilInfo.mousePressed(infoSoil);

  soilPh = new Parameter('Optimizing soil pH', width*0.08, height*0.3, soilEntry, soilReset, infoSoil);
  

  soilInvest = 0;
  soilError = '';

  sward = new Parameter('Sward Diversification', width * 0.08, height * 0.5, swardEntry, swardReset, infoSward);

  //sward = createInput();
  //sward.position(width*0.08, height*0.5);
  //sward.size(80);
  //swardButton = createButton('invest');
  //swardButton.position(sward.x + sward.width + 8, sward.y);
  //swardButton.mousePressed(swardEntry);
  //swardResetter = createButton('reset');
  //swardResetter.position(swardButton.x + swardButton.width, sward.y);
  //swardResetter.mousePressed(swardReset);  
  //swardInfo = createButton('🛈');
  //swardInfo.position(swardResetter.x + swardResetter.width, sward.y-1);
  //swardInfo.mousePressed(infoSward);


  swardInvest = 0;
  swardError = '';

  //slurry = createInput();
  //slurry.position(width*0.08, height*0.7);
  //slurry.size(80);
  //slurryButton = createButton('invest');
  //slurryButton.position(slurry.x + slurry.width + 8, slurry.y);
  //slurryButton.mousePressed(slurryEntry);
  //slurryResetter = createButton('reset');
  //slurryResetter.position(slurryButton.x + slurryButton.width, slurry.y);
  //slurryResetter.mousePressed(slurryReset);  
  //slurryInfo = createButton('🛈');
  //slurryInfo.position(slurryResetter.x + slurryResetter.width, slurry.y-1);
  //slurryInfo.mousePressed(infoSlurry);

  slurry = new Parameter('Low Emission Slurry Spreading', width * 0.08, height * 0.7, slurryEntry, slurryReset, infoSlurry);

  slurryInvest = 0;
  slurryError = '';

  acid = createInput();
  acid.position(width*0.32, height*0.3);
  acid.size(80);
  acidButton = createButton('invest');
  acidButton.position(acid.x + acid.width + 8, acid.y);
  acidButton.mousePressed(acidEntry);
  acidResetter = createButton('reset');
  acidResetter.position(acidButton.x + acidButton.width, acid.y);
  acidResetter.mousePressed(acidReset);  
  acidInfo = createButton('🛈');
  acidInfo.position(acidResetter.x + acidResetter.width, acid.y-1);
  acidInfo.mousePressed(infoAcid);

  acidInvest = 0;
  acidError = '';
  acidInvest = 0;


  cover = createInput();
  cover.position(width*0.32, height*0.5);
  cover.size(80);
  coverButton = createButton('invest');
  coverButton.position(cover.x + cover.width + 8, cover.y);
  coverButton.mousePressed(coverEntry);
  coverResetter = createButton('reset');
  coverResetter.position(coverButton.x + coverButton.width, cover.y);
  coverResetter.mousePressed(coverReset);  
  coverInfo = createButton('🛈');
  coverInfo.position(coverResetter.x + coverResetter.width, cover.y-1);
  coverInfo.mousePressed(infoCovers);
  
  coverInvest = 0;
  coverError = '';
  coverInvest = 0;

  feed = createInput();
  feed.position(width*0.32, height*0.7);
  feed.size(80);
  feedButton = createButton('invest');
  feedButton.position(feed.x + feed.width + 8, feed.y);
  feedButton.mousePressed(feedEntry);
  feedResetter = createButton('reset');
  feedResetter.position(feedButton.x + feedButton.width, feed.y);
  feedResetter.mousePressed(feedReset);  
  feedInfo = createButton('🛈');
  feedInfo.position(feedResetter.x + feedResetter.width, feed.y-1);
  feedInfo.mousePressed(infoFeed);
  
  feedInvest = 0;
  feedError = '';
  feedInvest = 0;

  submitButton = createButton('submit');
  submitButton.position(width * 0.54, height * 0.82);
  submitButton.size(160);
  submitButton.mousePressed(createParameters);

  resetButton = createButton('reset all');
  resetButton.position(width * 0.54, height * 0.86);
  resetButton.size(160);
  resetButton.mousePressed(resetAll);

  nextButton = createButton('Next Scenario');
  nextButton.position(width * 0.8, height * 0.1);
  nextButton.mousePressed(advanceScenario);

  sidebar = true;
  sidebarContents = 0;

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

  budget = 100000000 - soilInvest - swardInvest - slurryInvest - acidInvest - coverInvest - feedInvest;
  writeText();
  drawChecks();
  //rect(mouseX, mouseY, 10, 10);
  if (sidebar == false){
    drawBudget();
    drawPie();
  }

}

function writeText(){

  let scenStr;
  textSize(50);
  switch(scenario){
    case 1:
      scenStr = 'Scenario 1';
      break;
    case 2:
      scenStr = 'Scenario 2';
      break;
    default:
  }
  text(scenStr, width * 0.08, height * 0.1);
  textSize(15);

  fill('black');
  soilPh.drawName();
  //soilPh.drawWords();

  sward.drawName();
  slurry.drawName();
  
  //text('Low Emission Slurry Spreading', slurry.x + 5, slurry.y + 35);

  text('Manure Acidification', acid.x + 5, acid.y + 35);

  text('Manure storage covers', cover.x + 5, cover.y + 35);

  if (typeof feed != "undefined"){
    text('Feed additives', feed.x + 5, feed.y + 35);
  }
  
  if (soilError != ''){
    text(soilError, soilPh.input.x, soilPh.input.y - 5);
  }
  if (soilInvest > 0){
    text('€' + nfc(soilInvest), soilPh.input.x, soilPh.input.y - 20);
  }

  if (swardError != ''){
    text(swardError, sward.input.x, sward.input.y - 5);
  }
  if (swardInvest > 0){
    text('€' + nfc(swardInvest), sward.input.x, sward.input.y - 20);
  }

  if (slurryError != ''){
    text(slurryError, slurry.input.x, slurry.input.y - 5);
  }
  if (slurryInvest > 0){
    text('€' + nfc(slurryInvest), slurry.input.x, slurry.input.y - 20);
  }

  if (acidError != ''){
    text(acidError, acid.x, acid.y - 5);
  }
  if (acidInvest > 0){
    text('€' + nfc(acidInvest), acid.x, acid.y - 20);
  }

  if (coverError != ''){
    text(coverError, cover.x, cover.y - 5);
  }
  if (coverInvest > 0){
    text('€' + nfc(coverInvest), cover.x, cover.y - 20);
  }

  if (feedError != ''){
    text(feedError, feed.x, feed.y - 5);
  }
  if (feedInvest > 0){
    text('€' + nfc(feedInvest), feed.x, feed.y - 20);
  }


  fill('white');
}

function closedSidebar(){
  rect(1910/1920*width,190/1080*height, 2/1920*width, 400/1080*height);
  rect(1903/1920*width,190/1080*height, 2/1920*width, 400/1080*height);
  rect(1910/1920*width,680/1080*height, 2/1920*width, 400/1080*height);
  rect(1903/1920*width,680/1080*height, 2/1920*width, 400/1080*height);
 
   
  beginShape();
  vertex(1910/1920*width, 600/1080*height);
  vertex(1875/1920*width, 635/1080*height);
  vertex(1910/1920*width, 670/1080*height);
  vertex(1908/1920*width, 670/1080*height);
  vertex(1873/1920*width, 635/1080*height);
  vertex(1908/1920*width, 600/1080*height);
  endShape(CLOSE)
 
  beginShape();
  vertex(1903/1920*width, 600/1080*height);
  vertex(1868/1920*width, 635/1080*height);
  vertex(1903/1920*width, 670/1080*height);
  vertex(1901/1920*width, 670/1080*height);
  vertex(1866/1920*width, 635/1080*height);
  vertex(1901/1920*width, 600/1080*height);
  endShape(CLOSE)

}

function openSidebar(){
  rect(1450/1920*width, 190/1080*height, 2/1920*width, 400/1080*height);
  rect(1457/1920*width, 190/1080*height, 2/1920*width, 400/1080*height);
  rect(1450/1920*width, 680/1080*height, 2/1920*width, 400/1080*height);
  rect(1457/1920*width, 680/1080*height, 2/1920*width, 400/1080*height);
 
   
  beginShape();
  vertex(1450/1920*width, 600/1080*height);
  vertex(1485/1920*width, 635/1080*height);
  vertex(1450/1920*width, 670/1080*height);
  vertex(1452/1920*width, 670/1080*height);
  vertex(1487/1920*width, 635/1080*height);
  vertex(1452/1920*width, 600/1080*height);
  endShape(CLOSE)
 
  beginShape();
  vertex(1457/1920*width, 600/1080*height);
  vertex(1492/1920*width, 635/1080*height);
  vertex(1457/1920*width, 670/1080*height);
  vertex(1459/1920*width, 670/1080*height);
  vertex(1494/1920*width, 635/1080*height);
  vertex(1459/1920*width, 600/1080*height);
  endShape(CLOSE)


  switch (sidebarContents){
    case 1:
      textSize(40);
      textAlign(CENTER);
      text('Optimizing soil pH', width * 0.78, height * 0.23, 320);
      textAlign(LEFT);
      textSize(15);
      text("The optimal pH for soil depends on the crop being grown, but is generally around 6.5. Keeping the acidity of soil at this level increases efficiency and lowers emissions.\n\nSoil pH can be managed by applying agricultural limestone to raise the pH, or elemental sulfur to lower the pH.",
        width * 0.79, height * 0.35, 300
      );
      break;
    case 2:
      textSize(40);
      textAlign(CENTER);
      text('Sward diversification', width * 0.78, height * 0.23, 320);
      textAlign(LEFT);
      textSize(15);
      text("A sward is the area of land covered by grass.\n\nThere are many benefits of multi-species swards outperforms monoculture swards, such as drought resistance and supporting insect diversity.\n\nDiverse swards can lower greenhouse emissions by reducing fertiliser needs and by promoting nitrogen-fixing species.",
        width * 0.79, height * 0.4, 300
      );
      break;
    case 3:
      textSize(40);
      textAlign(CENTER);
      text('Low Emission Slurry Spreading', width * 0.78, height * 0.23, 320);
      textAlign(LEFT);
      textSize(15);
      text("Slurry is used as a natural fertiliser. The spreading of slurry emits methane and nitrous oxide.\n\nTraditionally, slurry is spread across fields with the use of a splash plate. \n\nLESS methods such as a Dribble Bar or Trailing Shoe can achieve the same fertilising effect as a splash plate, but with less slurry. This leads to reduced greenhouse gas emissions.",
        width * 0.79, height * 0.4, 300
      );
      break;
    case 4:
      textSize(40);
      textAlign(CENTER);
      text('Manure Acidification', width * 0.78, height * 0.23, 320);
      textAlign(LEFT);
      textSize(15);
      text("Stored manure emits gases such as methane and ammonia.\n\nAcidifying manure down to a pH of 6.0 by adding sulfuric acid reduces these emissions.\n\nExcessive acidification, down to a pH of 5.0, can have the opposite effect and increase emissions.",
        width * 0.79, height * 0.4, 300
      );
      break;
    case 5:
      textSize(40);
      textAlign(CENTER);
      text('Manure Storage Covers', width * 0.78, height * 0.23, 320);
      textAlign(LEFT);
      textSize(15);
      text("Stored manure emits gases such as methane and ammonia.\n\nCovering manure stores makes it possible to trap these emissions, so that they may be treated before being released into the atmosphere. Captured methane can be burned to produce electricity.\n\nAnother effect of covering manure storage is that the increased concentration of gas in the air results in more molecules staying in the manure instead of being emitted.",
        width * 0.79, height * 0.4, 300
      );
      break;
    case 6:
      textSize(40);
      textAlign(CENTER);
      text('Feed Additives', width * 0.78, height * 0.23, 320);
      textAlign(LEFT);
      textSize(15);
      text("Animals produce methane during the digestion of carbohydrates in their foods. The methane emitted in cows' burps and farts is the greatest souce of agricultural emissions.\n\nWhat cows are fed can have an effect these emissions. \n\nSupplementing a cow's diet with seaweed or red algae is expensive but results in a large reduction in emissions.\n\nOther feed additives are more affordable but result in a smaller reduction in emissions.",
        width * 0.79, height * 0.4, 300
      );
      break;
    case 0:
      textSize(40);
      textAlign(CENTER);
      let titleStr;
      let bodyStr;
      switch (scenario){
        case 1:
          titleStr = 'SCENARIO 1';
          bodyStr = "You now have 100 million euro to invest as you please.\n\n Your goal is to reduce emissions below 21000 kt CO2e.";
          break;
        case 2:
          titleStr = 'SCENARIO 2';
          bodyStr = "Detailed information about scenario 2";
          break;
        default:
      }
      text(titleStr, width * 0.78, height * 0.23, 320);
      textAlign(LEFT);
      textSize(15);
      text(bodyStr, width * 0.79, height * 0.4, 300);
      break;
    default:
  }

}

function mouseClicked(){
  if (mouseX > 1866/1920*width && mouseY > 600/1080*height && mouseY < 670/1080*height){
    if (sidebar == false){
      sidebar = true;
    }
  }
 
  if (mouseX > 1450/1920*width && mouseX < 1495/1920*width && mouseY > 600/1080*height && mouseY < 670/1080*height){
    if (sidebar == true){
      sidebar = false;
      sidebarContents = 0;
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
  let max = 23337.07;
  let saved = 23338.07-total;
  let emissionsList = [enteric, manure, soils, urea, fuel, liming];
  let arcs = [enteric*360/max, manure*360/max, soils*360/max, urea*360/max, fuel*360/max, liming*360/max, saved * 360 / max];
  let lastAngle = 0;
  let centreX = width*0.87;
  let centreY = height*0.75;
  let colours = ['blue', 'red', 'yellow', 'green', 'orange', 'brown', 'white'];
  for (let i = 0; i < arcs.length; i++){
    let mouseAngle = atan2(mouseY-centreY, mouseX-centreX);
    if (arcs[i] != 0){
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
  }
  lastAngle = 0;
  for (let i = 0; i < arcs.length; i++){
    let mouseAngle = atan2(mouseY-centreY, mouseX-centreX);
    let nextAngle = lastAngle + radians(arcs[i]);
    if (mouseAngle < 0) {
      mouseAngle += radians(360);
    }    
    let hover = dist(centreX, centreY, mouseX, mouseY) < width*0.05 && mouseAngle >= lastAngle && mouseAngle < nextAngle; 
    if (hover){
      if (i == 6){
        fill(231,129,53);
        stroke('black');
        rect(mouseX - 170, mouseY-300, 170, 300);
        fill('black');
        noStroke();
        text(emissionNames[i], mouseX-160, mouseY-280);
        text(emissionDefinitions[i], mouseX-160, mouseY-260, 155);
        text("You have reduced the Agricultural Sector's greenhouse emissions by " + int(saved) + ' kt CO2eq.', mouseX-160, mouseY-100, 155);
      }
      else {
        fill(231,129,53);
        stroke('black');
        rect(mouseX - 170, mouseY-300, 170, 300);
        fill('black');
        noStroke();
        text(emissionNames[i], mouseX-160, mouseY-280);
        text(emissionDefinitions[i], mouseX-160, mouseY-260, 155);
        text(emissionNames[i] + ' currently accounts for ' + emissionsList[i] + ' kt CO2eq (' + int(emissionsList[i]/total*100) + '\%) of your emissions.', mouseX-160, mouseY-100, 155);
      } 
    }
    lastAngle = nextAngle;
  }
  fill('black');
  text('Total Emissions:', centreX-width*0.05, height * 0.9);
  text(nfc(total, 0) + ' kt CO2eq', centreX-width*0.05, height * 0.93);
  fill('white');
  noStroke();
}

function drawBudget(){
  textSize(150);
  fill('black');
  text('€', width*0.82, height * 0.43);
  textSize(15);
  text('Budget: ', width*0.82, height * 0.47);
  text('€' + nfc(budget), width*0.82, height * 0.5);

  fill('white');
}

function createParameters(){
  if (soilInvest == 0){
    soils = 4625.69;
  } else if (soilInvest > 60000000){
    soils = 4625.69 / 1.64;
  } else {
    soils = 4625.69 / (1 + 0.64*(soilInvest/60000000));
  }

  soils = soils / (1 + 0.7 * swardInvest / 150000000);

  liming = 623.98 * (1 + 1.25 * soilInvest/100000000);

  manure = 2672.07 / (1 + 1.63 * acidInvest / 1000000000);

  manure = manure / (1 + 0.6 * coverInvest/100000000);

  if (coverInvest > 30000000){
    manure = manure * (1 + 0.9 * (coverInvest-30000000)/200000000);
  } 

  if (feedInvest == 0){
    enteric = 14581.46;
  } else if (feedInvest < 70000000){
    enteric = 14581.46 / (1 + 0.2 * feedInvest / 70000000);
  } else {
    enteric = (14581.46/1.2) / (1 + 7*(feedInvest-70000000)/4300000000);
  }


  urea = 126.82 / (1 + (5 * slurryInvest/10000000));
  
}

function drawChecks(){
  stroke('grey');
  strokeWeight(10);
  rect(width*0.7, height*0.04, 60, 60);
  strokeWeight(1);
  noStroke();
  if((enteric + manure + soils + urea + fuel + liming) < goals[scenario-1]){
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

function soilEntry(){
  val = soilPh.input.value();
  soilPh.input.value('');
  soilError = '';

  val = int(val);
  if (isNaN(val)){
    soilError = 'error: Not a Number';
  } else if (val < 0){
    soilError = 'Please invest a positive amount';
  } else if (val > budget){
    soilError = 'exceeds budget';
  }else {
    soilInvest = soilInvest + val;
  }
}

function soilReset(){
  soilPh.input.value('');
  soilError = '';
  soilInvest = 0;
}


function swardEntry(){
  val = sward.input.value();
  sward.input.value('');
  swardError = '';

  val = int(val);
  if (isNaN(val)){
    swardError = 'error: Not a Number';
  } else if (val < 0){
    swardError = 'Please invest a positive amount';
  } else if (val > budget){
    swardError = 'exceeds budget';
  } else {
    swardInvest = swardInvest + val;
  }
}

function swardReset(){
  sward.input.value('');
  swardError = '';
  swardInvest = 0;
}


function slurryEntry(){
  val = slurry.input.value();
  slurry.input.value('');
  slurryError = '';

  val = int(val);
  if (isNaN(val)){
    slurryError = 'error: Not a Number';
  } else if (val < 0){
    slurryError = 'Please invest a positive amount';
  } else if (val > budget){
    slurryError = 'exceeds budget';
  } else {
    slurryInvest = slurryInvest + val;
  }
}

function slurryReset(){
  slurry.input.value('');
  slurryError = '';
  slurryInvest = 0;
}

function acidEntry(){
  val = acid.value();
  acid.value('');
  acidError = '';

  val = int(val);
  if (isNaN(val)){
    acidError = 'error: Not a Number';
  } else if (val < 0){
    acidError = 'Please invest a positive amount';
  } else if (val > budget){
    acidError = 'exceeds budget';
  } else {
    acidInvest = acidInvest + val;
  }
}

function acidReset(){
  acid.value('');
  acidError = '';
  acidInvest = 0;
}


function coverEntry(){
  val = cover.value();
  cover.value('');
  coverError = '';

  val = int(val);
  if (isNaN(val)){
    coverError = 'error: Not a Number';
  } else if (val < 0){
    coverError = 'Please invest a positive amount';
  } else if (val > budget){
    coverError = 'exceeds budget';
  } else {
    coverInvest = coverInvest + val;
  }
}

function coverReset(){
  cover.value('');
  coverError = '';
  coverInvest = 0;
}


function feedEntry(){
  val = feed.value();
  feed.value('');
  feedError = '';

  val = int(val);
  if (isNaN(val)){
    feedError = 'error: Not a Number';
  } else if (val < 0){
    feedError = 'Please invest a positive amount';
  } else if (val > budget){
    feedError = 'exceeds budget';
  } else {
    feedInvest = feedInvest + val;
  }
}

function feedReset(){
  feed.value('');
  feedError = '';
  feedInvest = 0;
}

function resetAll(){
  acidInvest = 0;
  feedInvest = 0;
  swardInvest = 0;
  soilInvest = 0;
  coverInvest = 0;
  slurryInvest = 0;
  createParameters();
}

function infoSoil(){
  if (sidebar == true && sidebarContents == 1){
    sidebar = false;
    sidebarContents = 0;
  } else {
  sidebar = true;
  sidebarContents = 1;
  }
}

function infoSward(){
  if (sidebar == true && sidebarContents == 20){
    sidebar = false;
    sidebarContents = 0;
  } else {
  sidebar = true;
  sidebarContents = 2;
  }
}

function infoSlurry(){
  if (sidebar == true && sidebarContents == 3){
    sidebar = false;
    sidebarContents = 0;
  } else {
  sidebar = true;
  sidebarContents = 3;
  }
}

function infoAcid(){
  if (sidebar == true && sidebarContents == 4){
    sidebar = false;
    sidebarContents = 0;
  } else {
  sidebar = true;
  sidebarContents = 4;
  }
}

function infoCovers(){
  if (sidebar == true && sidebarContents == 5){
    sidebar = false;
    sidebarContents = 0;
  } else {
  sidebar = true;
  sidebarContents = 5;
  }
}

function infoFeed(){
  if (sidebar == true && sidebarContents == 6){
    sidebar = false;
    sidebarContents = 0;
  } else {
  sidebar = true;
  sidebarContents = 6;
  }
}

function advanceScenario(){
  if ((enteric + manure + soils + urea + fuel + liming) < goals[scenario-1]){
    scenario = scenario + 1;
    resetAll();
  }
}