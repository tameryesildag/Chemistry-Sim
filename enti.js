function enti(name,width,height,simage) {
    this.x = random(100, document.body.clientWidth - 50);
    this.y = 10;                    //random(100, 500)
    this.width = width / 7;
    this.height = height / 7;
    this.name = name;
    this.simage = simage;
  }