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
  }

}
export default Parameter;