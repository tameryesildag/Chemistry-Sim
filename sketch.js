///<reference path="p5.d.ts"/>
///<reference path="matter.d.ts"/>
var canvas;
let entiler = [];
var hidrojen;
var renderacik = true;
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
var sucikti = 0;
var solduvar;
var sagduvar;
var benimvarim;
var tikmetre;
var tiksayisi = 0;
var boxes = [];
var mesaj = "";
var myVar;
var sonmesaj = "";

var xspacing = 15;     // yatay pozisyonlar arasındaki uzaklık
var w;                // tüm dalganın uzunluğu
var theta = 0.0;      // başlangıç açısı
var amplitude = 5.0; // dalga yüksekliği
var period = 1000.0;   // dalga tekrar etmeden önceki pixeller
var dx;               // x'in artan değeri
var yvalues;          // dalganın yükseklik değerlerinin tutulduğu dizin
var suyuksekligi;

function preload() {
  entiler.push(hidrojen1 = new enti("hidrojen1","hidrojen.png",800,600,0),hidrojen2 = new enti("hidrojen2","hidrojen.png",800,600,0),oksijen = new enti("oksijen1","oksijen.png",800,600,2));
  for (let _enti of entiler){
  img.push(loadImage(_enti.png));
  print(_enti.width + " genişliğinde " + _enti.height + " yüksekliğinde bir obje oluşturuldu." );
  }
}

function setup() {
    myVar = setInterval(olayGunluguEvent, 100);
    canvas = createCanvas(document.body.clientWidth, document.body.clientHeight - 46);
    background(242, 244, 247);
    for (let _enti of entiler){
    image(img[_enti.simage],_enti.x,_enti.y,img[_enti.simage].width / 7,img[_enti.simage].height / 7);
    }
    engine = Engine.create();
    world = engine.world;
    var params = {
        isStatic: true
        
      }
    ground = Bodies.rectangle(document.body.clientWidth / 2, document.body.clientHeight - 30 , document.body.clientWidth, 100, params);
    solduvar = Bodies.rectangle(-100,canvas.height,200,10000,params);
    sagduvar = Bodies.rectangle(canvas.width + 80,canvas.height,200,10000,params);
    World.add(world, ground);
    World.add(world, solduvar);
    World.add(world, sagduvar);

    for (let _enti of entiler){
        boxes.push(Bodies.rectangle(_enti.x,_enti.y,img[_enti.simage].width / 10,img[_enti.simage].height / 7));
    }
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
    olayGunluguEvent();
    world.gravity.y = 1.5;
      
    w = width+16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w/xspacing));
    suyuksekligi = canvas.height / 2 + canvas.height / 3;
}

function draw() {
    background(242, 244, 247);
  //  set(random(0, canvas.width),random(0,canvas.height),color(0));
   // updatePixels();
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
      // _enti.y = _enti.y - _enti.height;
      // _enti.x = _enti.x - _enti.width;
      // boxes[entisirasi].position.x = _enti.x - _enti.width;
      // boxes[entisirasi].position.y = _enti.y - _enti.height; 
       }
       image(img[_enti.simage],_enti.x,_enti.y,img[_enti.simage].width / 7,img[_enti.simage].height / 7);
    }
    }    
}

if(entiler != null){
for(let oksijenolmasigereken of entiler){
for(let hidrojenolmasigereken of entiler){
    for(let hidrojenolmasigereken2 of entiler){
      if(oksijenolmasigereken.name.includes("oksijen")){
          if(hidrojenolmasigereken.name.includes("hidrojen")){
              if(hidrojenolmasigereken2.name.includes("hidrojen") && hidrojenolmasigereken2.name != hidrojenolmasigereken.name){
                if(dist(oksijenolmasigereken.x,oksijenolmasigereken.y,hidrojenolmasigereken.x,hidrojenolmasigereken.y) < 50 && dist(oksijenolmasigereken.x,oksijenolmasigereken.y,hidrojenolmasigereken2.x,hidrojenolmasigereken2.y) < 50){
                 if(sucikti == 0){
                   sucikart();
                 }
                 else{
                     suarttir(200);
                    // suyuksekligi -= 200;
                 }
                   Matter.Body.setPosition(ground,{x: ground.position.x, y: suyuksekligi - 60});
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
//fill(0,0,0);
//rect(0,canvas.height - 50,canvas.width,suyuksekligi);

if(entiler != null){
for (let _enti of entiler) {
    if(entiler.indexOf(_enti) != secilenobje){
    _enti.x = boxes[entiler.indexOf(_enti)].position.x;
 //   if(sucikti == 0){
    if(_enti.y <= 675){
    _enti.y = boxes[entiler.indexOf(_enti)].position.y;
    }
//}
    else{
        if(_enti.y <= suyuksekligi - 60){
            _enti.y = boxes[entiler.indexOf(_enti)].position.y;
        }
    }
    image(img[_enti.simage],_enti.x,_enti.y,img[_enti.simage].width / 7,img[_enti.simage].height / 7);
    }
    }
}

if(sucikti == 1){
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
  //  for(let _box of boxes){
   //     Matter.Body.applyForce(_box,{x: 0, y: 0}, {x: 0, y: -0.01});
 //   }
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
    mesaj += ("\nentiler[" + entiler.indexOf(_enti) + "].name: " + _enti.name + " x: " + _enti.x + " y: " + _enti.y + " width: " + img[_enti.simage].width + " height: " + img[_enti.simage].height);
 }
}
if(boxes != null){
for (let _box of boxes) {
    mesaj += ("\nboxes[" + boxes.indexOf(_box) + "]" + " x: " + _box.position.x + " y: " + _box.position.y)
 }
}
mesaj += ("\nground position: " + ground.position.y);
mesaj += ("\nimg length: " + img.length);
mesaj += ("\nsu yüksekliği: " + suyuksekligi);
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
    theta += 0.10;
  
    //Her bir x için sin() fonksiyonu kullanarak bir y hesaplama
    var x = theta;
    for (var i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x)*amplitude;
      x+=dx;
    }
  }
  
  function renderWave() {
    noStroke();
    fill(66, 134, 244);
    // Her bir noktaya elips çizerek dalgayı oluştur
    for (var x = 0; x < yvalues.length; x++) {
      ellipse(x*xspacing, suyuksekligi+yvalues[x], 5, 5);
      for(y = suyuksekligi+yvalues[x];y < canvas.height ;y+= 100){
        ellipse(x*xspacing,y,130,130);
      }
    }
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
    var yenienti = new enti(olacakisim,"yok",img[imagebul(isim)].width,img[imagebul(isim)].height,imagebul(isim))
    entiler.push(yenienti);
    boxes.push(Bodies.rectangle(yenienti.x,yenienti.y,img[yenienti.simage].width / 10,img[yenienti.simage].height / 7));
    Matter.Body.setInertia(boxes[boxes.length - 1], Infinity);
    World.add(world, boxes[boxes.length - 1]);
    print(olacakisim + " başarıyla oluşturuldu.");
  }
  function imagebul(isim){
   switch(isim){
   case "hidrojen":
   return 0;
   case "oksijen":
   return 2;
   }
  }

  function sucikart(){
      if(sucikti == 0){
      sucikti = 1;
      for(let _box of boxes)
      Matter.Body.applyForce(_box,{x: 0, y: 0}, {x: 0, y: -0.1});
      }
      sleep(1500);
      Matter.Body.setPosition(ground,{x: ground.position.x, y: suyuksekligi - 60});
  }

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
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
       suyuksekligi -= tikmetre;
       Matter.Body.setPosition(ground,{x: ground.position.x, y: ground.position.y - tikmetre});
       tiksayisi += 1;
  }

  