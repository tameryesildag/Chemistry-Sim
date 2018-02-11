function enti(name,width,height,simage) {
  this.x = random(100, document.body.clientWidth - 50);
  this.y = 10;                    
  this.width = width;
  this.height = height;
  this.name = name;
  this.simage = simage;

  function git(_x,_y){
    this.x = _x;
    this.y = _y;
  }
}