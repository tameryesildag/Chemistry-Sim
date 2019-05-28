var world = [];
var bubbles = [];
var terrain = canvas.height;
var mouseX = 0;
var mouseY = 0;
var point = 10000;
//rgb(173,216,230) Lightblue
//Fenolftalein: Asit: rgb(173,216,230) Baz: rgb(199,21,133)(pembe)
//Metil Turuncusu Asit: rgb(220,20,60)(kırmızı) Baz: rgb(255,255,102)(sarı)
//Turnusol Asit: rgb(220,20,60)(kırmızı) Baz: rgb(25,25,112)(mavi)

setInterval(() => {
    CheckGoal();
}, 5000)

var Fluid = {
    color: {
        r: 173,
        g: 216,
        b: 230
    },
    type: "",
    indicated: false,
    height: 0,
    summoned: false,
    Summon: function (type) {
        if (Fluid.type != "" && type != Fluid.type) {
            Fluid.Remove(() => {
                Fluid.type = type;
                if(type == "Su") Goals.water = true;
                Fluid.summoned = true;
                let firstHeight = Fluid.height;
                let rise = setInterval(() => {
                    Fluid.height += 1;
                    if (Fluid.height - firstHeight >= 100) {
                        clearInterval(rise);
                    }
                }, 20)
            })
        } else {
            Fluid.type = type;
            Fluid.summoned = true;
            let firstHeight = Fluid.height;
            let rise = setInterval(() => {
                Fluid.height += 1;
                if (Fluid.height - firstHeight >= 100) {
                    clearInterval(rise);
                }
            }, 20)
        }
    },
    Remove: function (callback) {
        let descent = setInterval(() => {
            Fluid.height -= 1;
            if (Fluid.height <= 0) {
                clearInterval(descent);
                Fluid.color = {
                    r: 173,
                    g: 216,
                    b: 230
                };
                Fluid.type = "";
                Fluid.height = 0;
                Fluid.summoned = false;
                Fluid.indicated = false;
                terrain = canvas.height;
                if (callback) {
                    callback();
                }
            }
        }, 10)
    },
    ChangeColor: function (r, g, b) {
        change = setInterval(() => {
            if (r > Fluid.color.r) {
                Fluid.color.r += 1;
            }
            if (r < Fluid.color.r) {
                Fluid.color.r -= 1;
            }
            if (g > Fluid.color.g) {
                Fluid.color.g += 1;
            }
            if (g < Fluid.color.g) {
                Fluid.color.g -= 1;
            }
            if (b > Fluid.color.b) {
                Fluid.color.b += 1;
            }
            if (b < Fluid.color.b) {
                Fluid.color.b -= 1;
            }
            if (r == Fluid.color.r && g == Fluid.color.g && b == Fluid.color.b) {
                clearInterval(change);
            }
        }, 20)
    }
}

function Start() {

}

function Update() {
    point -= 0.1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(b => {
        b.body.pos.y -= 1;
        ctx.drawImage(b.body.texture, b.body.pos.x, b.body.pos.y);
        if(b.body.pos.y + b.body.texture.height <= 0){
            RemoveBubble(b);
        }
    })
    world.forEach(m => {
        if (m.body) {
            if (Fluid.summoned && !Fluid.indicated && m.type == "Asit" && m.body.pos.y > terrain) {
                if (Fluid.type == "Fenolftalein") {
                    Fluid.ChangeColor(173, 216, 230);
                }
                if (Fluid.type == "Metil Turuncusu") {
                    Fluid.ChangeColor(220, 20, 60);
                    Goals.red = true;
                }
                if (Fluid.type == "Turnusol") {
                    Fluid.ChangeColor(220, 20, 60);
                    Goals.red = true;
                }
                Fluid.indicated = true;
                Remove([m]);
            }
            if (Fluid.summoned && !Fluid.indicated && m.type == "Baz" && m.body.pos.y > terrain) {
                if (Fluid.type == "Fenolftalein") {
                    Fluid.ChangeColor(199, 21, 133);
                    Goals.pink = true;
                }
                if (Fluid.type == "Metil Turuncusu") {
                    Fluid.ChangeColor(255, 255, 102);
                    Goals.yellow = true;
                }
                if (Fluid.type == "Turnusol") {
                    Fluid.ChangeColor(25, 25, 112);
                    Goals.blue = true;
                }
                Fluid.indicated = true;
                Remove([m]);
            }
            if (m.grabbed) {
                info(m);
                m.body.pos.x = mouseX;
                m.body.pos.y = mouseY;
                m.body.vel.x = 0;
                m.body.vel.y = 0;
                m.body.acc.x = 0;
                m.body.acc.y = 0;
            } else {
                if (m.body.pos.y + m.body.height <= terrain) {
                    m.body.acc.y += 0.01;
                    m.body.vel.y += m.body.acc.y;
                    m.body.pos.y += m.body.vel.y;
                    m.body.grounded = false;
                } else {
                    if (m.name != "Karbondioksit Gazı" && m.name != "Hidrojen Gazı") {
                        m.body.pos.y = terrain - m.body.texture.height
                        m.body.vel.y = 0;
                        m.body.acc.y = 0;
                        m.body.grounded = true;
                    }
                }

            }
            ctx.drawImage(m.body.texture, m.body.pos.x, m.body.pos.y);
        }
    })
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            for (c = 0; c < world.length; c++) {
                if (world[a].name == "Hidrojen" && world[b].name == "Hidrojen" && world[c].name == "Oksijen" && world[a].id != world[b].id) {
                    if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50 && distance(world[a].body.pos.x, world[a].body.pos.y, world[c].body.pos.x, world[c].body.pos.y) < 50) {
                        Remove([world[a], world[b], world[c]]);
                        Fluid.Summon("Su");
                        Goals.water = true;
                    }
                }
            }
        }
    }

    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "" && world[b].name == "") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon();
                }
            }
        }
    }

    //CAO + H2CO3 --> CACO3 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Kalsiyum Oksit" && world[b].name == "Karbonik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Calciumcarbonate);
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //CACO3 + HCL --> CACL + H2O + CO2
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Kalsiyum Karbonat" && world[b].name == "Hidroklorik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Calciumchloride);
                    Fluid.Summon("Su");
                    Goals.calciumchloride = true;
                    SummonBubble("Carbondioxide");
                }
            }
        }
    }

    //H2CO3 + KOH --> K2CO3 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Karbonik Asit" && world[b].name == "Potasyum Hidroksit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Potassiumcarbonate);
                    Goals.potassiumcarbonate = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //H2CO3 + NAOH --> Na2CO3 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Karbonik Asit" && world[b].name == "Sodyum Hidroksit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Sodiumcarbonate);
                    Goals.sodiumcarbonate = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //H2SO4 + NAOH --> NA2SO4 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Sülfürik Asit" && world[b].name == "Sodyum Hidroksit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Sodiumsulfate);
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //HCL + KOH --> KCL + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Hidroklorik Asit" && world[b].name == "Potasyum Hidroksit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Potassiumchloride);
                    Goals.potassiumchloride = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //HCL + NAOH --> NACL + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Hidroklorik Asit" && world[b].name == "Sodyum Hidroksit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Sodiumchloride);
                    Goals.sodiumchloride = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //HNO3 + KOH --> KNO3 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Nitrik Asit" && world[b].name == "Potasyum Hidroksit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Potassiumnitrate);
                    Goals.potassiumnitrate = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //HNO3 + NAOH --> NANO3 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Nitrik Asit" && world[b].name == "Sodyum Hidroksit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Sodiumnitrate);
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //KOH + H2SO4 --> K2SO4 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Potasyum Hidroksit" && world[b].name == "Sülfurik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Potassiumsulfate);
                    Goals.potassiumsulfate = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //LİOH + H2SO4 --> Lİ2SO4 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Lityum Hidroksit" && world[b].name == "Sülfirik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Lithiumsulfate);
                    Goals.lithiumsulfate = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //LİOH + HCL --> LİCL + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Lityum Hidroksit" && world[b].name == "Hidroklorik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Lithiumchloride);
                    Goals.lithiumchloride = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    //KOH + H2So4 --> K2So4 + 2 H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Potasyum Hidroksit" && world[b].name == "Sülfirik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Potassiumsulfate);
                    Goals.potassiumsulfate = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }


    //LİOH + HNO3 --> LİNO3 + H2O
    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Lityum Hidroksit" && world[b].name == "Nitrik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Lithiumnitrate);
                    Goals.lithiumnitrate = true;
                    Fluid.Summon("Su");
                }
            }
        }
    }

    for (a = 0; a < world.length; a++) {
        for (b = 0; b < world.length; b++) {
            if (world[a].name == "Magnezyum" && world[b].name == "Hidroklorik Asit") {
                if (distance(world[a].body.pos.x, world[a].body.pos.y, world[b].body.pos.x, world[b].body.pos.y) < 50) {
                    Remove([world[a], world[b]]);
                    Summon(Matters.Magnesiumchloride);
                    Goals.magnesiumchloride = true;
                    SummonBubble("Hydrogen");
                }
            }
        }
    }

    if (Fluid.summoned) {
        ctx.fillStyle = rgb(Fluid.color.r, Fluid.color.g, Fluid.color.b);
        terrain = canvas.height - Fluid.height;
        ctx.fillRect(0, canvas.height - Fluid.height, canvas.width, canvas.height * 10);
        ctx.fillStyle = "Black";
        ctx.font = "30px Arial";
        ctx.fillText(Fluid.type, 10, canvas.height - 10);
    }
    ctx.fillStyle = "Black";
    ctx.font = "30px Arial";
    ctx.fillText(Math.floor(point), canvas.width - 120, 100);
}

function OnMouseDown(e) {
    console.log("mouseX: " + mouseX + " mouseY: " + mouseY);
    for (i = 0; i < world.length; i++) {
        if (mouseX > world[i].body.pos.x && mouseX < world[i].body.pos.x + world[i].body.width && mouseY > world[i].body.pos.y && mouseY < world[i].body.pos.y + world[i].body.height) {
            world[i].grabbed = true;
            Box.Show(world[i]);
            break;
        }
        if (world[i].grabbed = true) {
            Box.Hide();
            world[i].grabbed = false;
        }
    }
}

function OnMouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}

function OnKeyDown(e) {
    if (e.key = "Delete") {
        for (i = 0; i < world.length; i++) {
            if (world[i].grabbed) {
                Remove([world[i]]);
                Box.Hide();
            }
        }
    }
}

function distance(x1, y1, x2, y2) {
    let dist = Math.sqrt(Math.floor((x1 - x2) ** 2 + (y1 - y2) ** 2));
    return (dist);
}

function info(matter) {
    document.getElementById("elementimg").src = matter.body.texture.src;
    document.getElementById("name").innerHTML = matter.name;
    document.getElementById("number").innerHTML = "(" + matter.number + ")";
}

function rgb(r, g, b) {
    return ("rgb(" + r + ", " + g + ", " + b + ")");
}

function Remove(matters) {
    for (x = 0; x < matters.length; x++) {
        for (i = 0; i < world.length; i++) {
            if (matters[x].id == world[i].id) {
                world.splice(i, 1);
            }
        }
    }
}

function RemoveBubble(bubble){
    for(i = 0; i < bubbles.length; i++){
        if(bubbles[i].id == bubble.id){
            bubbles.splice(i, 1);
        }
    }
}

function Reset() {
    world = [];
    Box.Hide();
    Fluid.Remove();
}

function CheckGoal(){
    if(Goals.blue && Goals.red && Goals.yellow && Goals.pink && Goals.calciumchloride && Goals.potassiumcarbonate && Goals.potassiumchloride && Goals.potassiumnitrate && Goals.potassiumsulfate && Goals.sodiumcarbonate && Goals.sodiumchloride && Goals.magnesiumchloride && Goals.lithiumchloride && Goals.lithiumnitrate && Goals.lithiumsulfate && Goals.water){
        alert("Her şeyi keşfettin! Puanın: " + Math.floor(point));
    }
}

function SummonBubble(matter) {
    if (matter == "Hydrogen") {
        for (i = 0; i < 8; i++) {
            let bubble = new Matters.Hydrogenbubble(undefined, canvas.height);
            bubbles.push(bubble);
        }
    }
    if (matter == "Carbondioxide") {
        for (i = 0; i < 8; i++) {
            let bubble = new Matters.Carbondioxidebubble(undefined, canvas.height);
            bubbles.push(bubble);
        }
    }
}