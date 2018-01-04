function enti(name,png,width,height,simage) {
    this.x = random(100, 1200);
    this.y = 10;                    //random(100, 500)
    this.width = width / 10;
    this.height = height / 10;
    this.name = name;
    this.png = png;
    this.simage = simage;
  }