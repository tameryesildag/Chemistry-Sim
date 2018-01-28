///<reference path="p5.d.ts"/>
///<reference path="matter.d.ts"/>
var canvas;
let entiler = [];
var hidrojen;
var renderacik = false;
var tiklandi = 0;
var secilenobje;
let img = [];
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies
var Render = Matter.Render;
var engine;
var world;
var ground;
var solduvar;
var sagduvar;
var benimvarim;
var tikmetre;
var tiksayisi = 0;
var boxes = [];
var mesaj = "";
var myVar;
var sonmesaj = "";

var water = {
    tabany:0,
    tabanyukseklik:0,
    cikti: 0,
    suyuksekligi:0,
    xspacing: 15,
    w: 0,
    theta: 0.0,
    amplitude: 5.0,
    period: 1000.0,
    dx:0,
    yvalues:0
};


function preload() {
  engine = Engine.create();
  world = engine.world;
  loadImages();
}

function setup() {
    myVar = setInterval(olayGunluguEvent, 100);
    canvas = createCanvas(document.body.clientWidth, document.body.clientHeight - 46);
    background(242, 244, 247);
    var params = {
        isStatic: true
      }
    ground = Bodies.rectangle(document.body.clientWidth / 2, document.body.clientHeight, document.body.clientWidth, 100, params);
    solduvar = Bodies.rectangle(-92,canvas.height,200,10000,params);
    sagduvar = Bodies.rectangle(canvas.width + 80,canvas.height,200,10000,params);
    World.add(world, ground);
    World.add(world, solduvar);
    World.add(world, sagduvar);
    Engine.run(engine);

    if(renderacik){
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height
        }
    }); 

    Render.run(render); 
} 
    for(let _box of boxes){
        World.add(world, _box);
        Matter.Body.setInertia(_box, Infinity);
    }
    world.gravity.y = 1.5;
    water.w = canvas.width + 16;
    water.dx = (TWO_PI / water.period) * water.xspacing;
    water.yvalues = new Array(floor(water.w/water.xspacing));
    water.suyuksekligi = canvas.height / 2 + canvas.height / 3;
    water.tabanyukseklik = water.suyuksekligi;
    water.tabany = canvas.height - 100;
    olayGunluguEvent();
}

function draw() {
    background(242, 244, 247);
    entirender();
if(entiler != null){
for(let oksijenolmasigereken of entiler){
for(let hidrojenolmasigereken of entiler){
    for(let hidrojenolmasigereken2 of entiler){
      if(oksijenolmasigereken.name.includes("oksijen")){
          if(hidrojenolmasigereken.name.includes("hidrojen")){
              if(hidrojenolmasigereken2.name.includes("hidrojen") && hidrojenolmasigereken2.name != hidrojenolmasigereken.name){
                if(dist(oksijenolmasigereken.x,oksijenolmasigereken.y,hidrojenolmasigereken.x,hidrojenolmasigereken.y) < 50 && dist(oksijenolmasigereken.x,oksijenolmasigereken.y,hidrojenolmasigereken2.x,hidrojenolmasigereken2.y) < 50){
                 if(water.cikti == 0){
                    sucikart();
                 }
                 else{
                    suarttir(200);
                 }
                   Matter.Body.setPosition(ground,{x: ground.position.x, y: water.suyuksekligi - 60});
                   var silinecekler = [];
                   silinecekler.push(entiler.indexOf(oksijenolmasigereken),entiler.indexOf(hidrojenolmasigereken),entiler.indexOf(hidrojenolmasigereken2));
                   silinecekler.sort(function(a, b){return a-b});
                   yoket(silinecekler[2],silinecekler[1],silinecekler[0]);
                  }
              }
          }
       }

     }
   }
 }
}
if(water.cikti == 1){
    calcWave();
    renderWave();
}
}

function yoket(){
if(arguments == null){
entiler = [];
for(let _box of boxes){
    Matter.Composite.remove(world, _box);
}
boxes = [];
tiklandi = 0;
}

else{
    for(let _var of arguments){
      entiler.splice(_var,1);
      Matter.Composite.remove(world, boxes[_var]);
      boxes.splice(_var,1);
      tiklandi = 0;
    }
}

}

function mousePressed() {
    if(mobilkontrol() == true){   //MOBIL
        for (let _enti of entiler) {
            if(tiklandi == 0){
            if(mouseX < _enti.x + _enti.width && mouseX > _enti.x && mouseY < _enti.y + _enti.height && mouseY > _enti.y){
                tiklandi = 1;
                secilenobje = entiler.indexOf(_enti);
                break;
            } 
        }
        else{
            if(_enti.name == entiler[secilenobje].name){
            _enti.x = mouseX;
            boxes[entiler.indexOf(_enti)].position.x = mouseX;
            _enti.y = mouseY;
            boxes[entiler.indexOf(_enti)].position.y = mouseY;
            }
            tiklandi = 0;
            secilenobje = -1;
            return;
        }
        }
    }

    else{    //PC
    if(mouseButton == LEFT){
        if(tiklandi == 1){
            tiklandi = 0;
            boxes[secilenobje].timeScale = 1;
            boxes[secilenobje].position.x = entiler[secilenobje].x;
            boxes[secilenobje].position.y = entiler[secilenobje].y;
            secilenobje = -1;
            return;
        }
    if(entiler != null){    
    for (let _enti of entiler) {
    if(mouseX < _enti.x + _enti.width && mouseX > _enti.x && mouseY < _enti.y + _enti.height && mouseY > _enti.y){
        tiklandi = 1;
        secilenobje = entiler.indexOf(_enti);
        boxes[secilenobje].timeScale = 0;
     } 
    }
   }
  }
 }
}


function olayGunluguEvent(){
mesaj = "";
mesaj += ("\ncanvas width: " + canvas.width + " canvas height: " + canvas.height); 
mesaj += ("\ntiklandi: " + tiklandi);
try{   
mesaj += ("\nseçilen obje: " + secilenobje + " isim: " + entiler[secilenobje].name);
}
catch(error){
    mesaj += ("\nnull");
}
mesaj += ("\nmouseX: " + mouseX + " mouseY: " + mouseY);
if(entiler != null){
for (let _enti of entiler) {
    mesaj += ("\nentiler[" + entiler.indexOf(_enti) + "].name: " + _enti.name + " x: " + _enti.x + " y: " + _enti.y + " width: " + _enti.width + " height: " + _enti.height);
 }
}
if(boxes != null){
for (let _box of boxes) {
    mesaj += ("\nboxes[" + boxes.indexOf(_box) + "]" + " x: " + _box.position.x + " y: " + _box.position.y)
 }
}
mesaj += ("\nground position: " + ground.position.y);
mesaj += ("\nimg length: " + img.length);
mesaj += ("\nsu yüksekliği: " + water.suyuksekligi);
mesaj += ("\nimg[0].height " + img[0].height);
if(mesaj == sonmesaj){
    return;
}
else{
    print(mesaj);
    sonmesaj = mesaj;
}
}


function mobilkontrol() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


function calcWave() {
    // Theta'nın artışı (açısal momentum için farklı değerler dene)
    water.theta += 0.10;
  
    //Her bir x için sin() fonksiyonu kullanarak bir y hesaplama
    var x = water.theta;
    for (var i = 0; i < water.yvalues.length; i++) {
      water.yvalues[i] = sin(x)*water.amplitude;
      x+=water.dx;
    }
  }
  

  function renderWave() {
    noStroke();
    fill(66, 134, 244);
    // Her bir noktaya elips çizerek dalgayı oluştur
    for (var x = 0; x < water.yvalues.length; x++) {
      ellipse(x*water.xspacing, water.suyuksekligi+water.yvalues[x], 100, 100);
      for(y = water.suyuksekligi+water.yvalues[x];y < canvas.height ;y+= 100){
      }
    }
     rect(0,water.tabany,canvas.width,water.tabanyukseklik);
  }


  function entiekle(isim){
    var numara = 1;
    var olacakisim = isim + random(1,9999);
    if(entiler != null && boxes != null){
    }
    else{
        entiler = [];
        boxes = [];
    }
    print(img[imagebul(isim)]);
    var yenienti = new enti(olacakisim,img[imagebul(isim)].width,img[imagebul(isim)].height,imagebul(isim))
    print(yenienti);
    entiler.push(yenienti);
    boxes.push(Bodies.rectangle(yenienti.x,yenienti.y,img[yenienti.simage].width,img[yenienti.simage].height));
    Matter.Body.setInertia(boxes[boxes.length - 1], Infinity);
    World.add(world, boxes[boxes.length - 1]);
    print(olacakisim + " başarıyla oluşturuldu.");
  }
  function imagebul(isim){
   switch(isim){
   case "hidrojen":
   return 0;
   case "oksijen":
   return 1;
   case "sulfirik":
   return 2;
   case "sülfirik":
   return 2;
   }
  }


  function sucikart(){
      if(water.cikti == 0){
      water.cikti = 1;
      for(let _box of boxes)
      Matter.Body.applyForce(_box,{x: 0, y: 0}, {x: 0, y: -0.1});
      }
      else{
          if(tiksayisi == 0){
          suarttir(200);
          }
          return;
      }
      Matter.Body.setPosition(ground,{x: ground.position.x, y: water.suyuksekligi - 60});
      for(let _box of boxes){
         entiler[boxes.indexOf(_box)].y = 10;
         Matter.Body.setPosition(_box,{x: _box.position.x, y: 10})
      }
  }

  function entirender(){
    if(tiklandi == 1){
        if(entiler != null){
        for (let _enti of entiler) {
        var entisirasi = entiler.indexOf(_enti);
        if(mouseX > 0 && mouseX < canvas.width){
             if(_enti.name == entiler[secilenobje].name){
                 _enti.x = mouseX;
                 boxes[entisirasi].position.x = mouseX;
             }
         }
         if(mouseY > 0 && mouseY < canvas.height){
          if(_enti.name == entiler[secilenobje].name){
              _enti.y = mouseY;
              boxes[entisirasi].position.y = mouseY;
          }
         }
         if(_enti.name == entiler[secilenobje].name){
  
         }
         image(img[_enti.simage],_enti.x,_enti.y,img[_enti.simage].width,img[_enti.simage].height);
      }
      }    
  }


  if(entiler != null){
    for (let _enti of entiler) {
        if(entiler.indexOf(_enti) != secilenobje){
        _enti.x = boxes[entiler.indexOf(_enti)].position.x;
        if(_enti.y < canvas.height - _enti.height){
        _enti.y = boxes[entiler.indexOf(_enti)].position.y;
        }
        else{
            _enti.y = canvas.height - _enti.height;
        }
        image(img[_enti.simage],_enti.x,_enti.y,_enti.width,_enti.height);
        }
        }
    }
  }

  function suarttir(toplamartisyukseklik){
   print("SU ARTTIRMA FONKSIYONU TETIKLENDI");
   tikmetre = 1.5;
   benimvarim = setInterval(suarttirmaislem, 100);
  }
  function suarttirmaislem(){
      print("TIKSAYISI: " + tiksayisi)
      if(tiksayisi == 30){
          clearInterval(benimvarim);
          tiksayisi = 0;
          return;
      }
       water.suyuksekligi -= tikmetre;
       water.tabanyukseklik += tikmetre + 0.2;
       water.tabany -= tikmetre + 0.2;
       Matter.Body.setPosition(ground,{x: ground.position.x, y: ground.position.y - tikmetre});
       tiksayisi += 1;
  }
  function sukaldir(){ 
      water.cikti = 0;
      water.suyuksekligi = canvas.height / 2 + canvas.height / 3;
      water.tabany = canvas.height - 100;
      water.tabanyukseklik = water.suyuksekligi;
      Matter.Body.setPosition(ground,{x: document.body.clientWidth / 2, y: document.body.clientHeight - 30});
      tiksayisi == 29;
      clearInterval(benimvarim);
      clearInterval(suarttirmaislem);
  }

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  function loadImages(){
      img.push(loadImage("Images/hidrojen.png"));
      img.push(loadImage("Images/oksijen.png"));
      img.push(loadImage("Images/sulfirik.png"));
      var foto;
      foto = new Image();
      foto.onload = function(){
       img[img.length - 1].width = foto.width;
       img[img.length - 1].height = foto.height;

       foto = new Image();
       foto.onload = function(){
         img[img.length - 1].width = foto.width;
         img[img.length - 1].height = foto.height;
         foto = new Image();
         foto.onload = function(){
          img[img.length - 1].width = foto.width;
          img[img.length - 1].height = foto.height;   
          uyu();
          sahneAyarla();
         }
         foto.src = "Images/sulfirik.png";
        }
       foto.src = "Images/oksijen.png";

      }
      foto.src = "Images/hidrojen.png";



      print("img[0].width: " + img[0].width);
      print("Images has been loaded.")
  }

  function sahneAyarla(){
      entiekle("hidrojen");
      entiekle("sulfirik");
      entiekle("oksijen");
  }

  function uyu(){
    document.title = "Loading..."
    sleep(5000);
    document.title = "Chemistry Simulator";
  }