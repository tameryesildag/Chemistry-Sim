var canvas = document.getElementById("mycanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var Textures = {
    hydrogen: "Textures/hydrogen.png",
    hydrogenbubble: "Textures/hydrogenbubble.png",
    hydrochloricacid: "Textures/hydrochloricacid.png",
    calciumcarbonate: "Textures/calciumcarbonate.png",
    calciumchloride: "Textures/calciumchloride.png",
    calciumoxide: "Textures/calciumoxide.png",
    carbondioxidebubble: "Textures/carbondioxidebubble.png",
    carbonicacid: "Textures/carbonicacid.png",
    lithiumhydroxide: "Textures/lithiumhydroxide.png",
    lithiumchloride: "Textures/lithiumchloride.png",
    lithiumnitrate: "Textures/lithiumnitrate.png",
    lithiumsulfate: "Textures/lithiumsulfate.png",
    magnesium: "Textures/magnesium.png",
    magnesiumchloride: "Textures/magnesiumchloride.png",
    magnesiumsulfate: "Textures/magnesiumsulfate.png",
    nitricacid: "Textures/nitricacid.png",
    oxygen: "Textures/oxygen.png",
    potassiumcarbonate: "Textures/potassiumcarbonate.png",
    potassiumchloride: "Textures/potassiumchloride.png",
    potassiumhydroxide: "Textures/potassiumhydroxide.png",
    potassiumnitrate: "Textures/potassiumnitrate.png",
    potassiumsulfate: "Textures/potassiumsulfate.png",
    sodium: "Textures/sodium.png",
    sodiumcarbonate: "Textures/sodiumcarbonate.png",
    sodiumchloride: "Textures/sodiumchloride.png",
    sodiumhydroxide: "Textures/sodiumhydroxide.png",
    sodiumnitrate: "Textures/sodiumnitrate.png",
    sodiumsulfate: "Textures/sodiumsulfate.png",
    sulfuricacid: "Textures/sulfuricacid.png"
}

for(var name in Textures){
    let img = new Image();
    img.src = Textures[name];
    Textures[name] = img;
}

let Box = {
    Show: function(matter){
        document.getElementById("elementimg").src = matter.body.texture.src;
        document.getElementById("name").innerHTML = matter.name;
        document.getElementById("type").innerHTML = matter.type;
        if(matter.number){
            document.getElementById("number").style.visibility = "visible";
            document.getElementById("number").innerHTML = "(" + matter.number + ")";
        } else {
            document.getElementById("number").style.visibility = "hidden";
        }
        document.getElementById("mybox").style.visibility = "visible";
    },
    Hide: function(){
        document.getElementById("mybox").style.visibility = "hidden";
        document.getElementById("number").style.visibility = "hidden";
    }
}

window.onload = () => {
    Start();
    setInterval(Update, 10);
    document.onmousedown = OnMouseDown;
    document.onmousemove = OnMouseMove;
    document.onkeydown = OnKeyDown;
}

function Random(min, max){
    let number = Math.floor(Math.random() * max + min);
    return(number);
} 