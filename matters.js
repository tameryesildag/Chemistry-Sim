var Matters = {
    Hydrogen: function (x, y) {
        this.body = new Body(x, y, Textures.hydrogen);
        this.name = "Hidrojen";
        this.number = 1;
        this.type = "Element";
        this.id = Random(0, 10000);
    },
    Oxygen: function (x, y) {
        this.body = new Body(x, y, Textures.oxygen);
        this.name = "Oksijen";
        this.number = 8;
        this.type = "Element";
        this.id = Random(0, 10000);
    },
    Magnesium: function (x, y) {
        this.body = new Body(x, y, Textures.magnesium);
        this.name = "Magnezyum";
        this.number = 12;
        this.type = "Element";
        this.id = Random(0, 10000);
    },
    Sodium: function (x, y) {
        this.body = new Body(x, y, Textures.sodium);
        this.name = "Sodyum";
        this.number = 11;
        this.type = "Nötr";
        this.id = Random(0, 10000);
    },
    Calciumcarbonate: function (x, y) {
        this.body = new Body(x, y, Textures.calciumcarbonate);
        this.name = "Kalsiyum Karbonat";
        this.type = "Bazik Tuz";
        this.id = Random(0, 10000);
    },
    Calciumchloride: function (x, y) {
        this.body = new Body(x, y, Textures.calciumchloride);
        this.name = "Kalsiyum Klorür";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Calciumoxide: function (x, y) {
        this.body = new Body(x, y, Textures.calciumoxide);
        this.name = "Kalsiyum Oksit";
        this.type = "Metal Oksit";
        this.id = Random(0, 10000);
    },
    Carbonicacid: function (x, y) {
        this.body = new Body(x, y, Textures.carbonicacid);
        this.name = "Karbonik Asit";
        this.type = "Asit";
        this.id = Random(0, 10000);
    },
    Hydrochloricacid: function (x, y) {
        this.body = new Body(x, y, Textures.hydrochloricacid);
        this.name = "Hidroklorik Asit";
        this.type = "Asit";
        this.id = Random(0, 10000);
    },
    Lithiumchloride: function (x, y) {
        this.body = new Body(x, y, Textures.lithiumchloride);
        this.name = "Lityum Klorür";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Lithiumhydroxide: function (x, y) {
        this.body = new Body(x, y, Textures.lithiumhydroxide);
        this.name = "Lityum Hidroksit";
        this.type = "Baz";
        this.id = Random(0, 10000);
    },
    Lithiumnitrate: function (x, y) {
        this.body = new Body(x, y, Textures.lithiumnitrate);
        this.name = "Lityum Nitrat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Lithiumsulfate: function (x, y) {
        this.body = new Body(x, y, Textures.lithiumsulfate);
        this.name = "Lityum Sülfat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Magnesiumchloride: function (x, y) {
        this.body = new Body(x, y, Textures.magnesiumchloride);
        this.name = "Magnezyum Klorür";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Magnesiumsulfate: function (x, y) {
        this.body = new Body(x, y, Textures.magnesiumsulfate);
        this.name = "Magnezyum Sülfat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Nitricacid: function (x, y) {
        this.body = new Body(x, y, Textures.nitricacid);
        this.name = "Nitrik Asit";
        this.type = "Asit";
        this.id = Random(0, 10000);
    },
    Potassiumcarbonate: function (x, y) {
        this.body = new Body(x, y, Textures.potassiumcarbonate);
        this.name = "Potasyum Karbonat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Potassiumchloride: function (x, y) {
        this.body = new Body(x, y, Textures.potassiumchloride);
        this.name = "Potasyum Klorür";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Potassiumhydroxide: function (x, y) {
        this.body = new Body(x, y, Textures.potassiumhydroxide);
        this.name = "Potasyum Hidroksit";
        this.type = "Baz";
        this.id = Random(0, 10000);
    },
    Potassiumnitrate: function (x, y) {
        this.body = new Body(x, y, Textures.potassiumnitrate);
        this.name = "Potasyum Nitrat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Potassiumsulfate: function (x, y) {
        this.body = new Body(x, y, Textures.potassiumsulfate);
        this.name = "Potasyum Sülfat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Sodiumcarbonate: function (x, y) {
        this.body = new Body(x, y, Textures.sodiumcarbonate);
        this.name = "Sodyum Karbonat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Sodiumchloride: function (x, y) {
        this.body = new Body(x, y, Textures.sodiumchloride);
        this.name = "Sodyum Klorür";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Sodiumhydroxide: function (x, y) {
        this.body = new Body(x, y, Textures.sodiumhydroxide);
        this.name = "Sodyum Hidroksit";
        this.type = "Baz";
        this.id = Random(0, 10000);
    },
    Sodiumnitrate: function (x, y) {
        this.body = new Body(x, y, Textures.sodiumnitrate);
        this.name = "Sodyum Nitrat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Sodiumsulfate: function (x, y) {
        this.body = new Body(x, y, Textures.sodiumsulfate);
        this.name = "Sodyum Sülfat";
        this.type = "Tuz";
        this.id = Random(0, 10000);
    },
    Sulfuricacid: function (x, y) {
        this.body = new Body(x, y, Textures.sulfuricacid);
        this.name = "Sülfirik Asit";
        this.type = "Asit";
        this.id = Random(0, 10000);
    },
    Hydrogenbubble: function (x, y) {
        this.body = new Body(x, y, Textures.hydrogenbubble);
        this.name = "Hidrojen Gazı";
        this.type = "Molekül";
        this.id = Random(0, 10000);
    },
    Carbondioxidebubble: function (x, y) {
        this.body = new Body(x, y, Textures.carbondioxidebubble);
        this.name = "Karbondioksit Gazı";
        this.type = "Molekül";
        this.id = Random(0, 10000);
    }


}

function Body(x, y, texture) {
    if (!x) x = Random(0, canvas.width);
    if (!y) y = 0;
    this.pos = {
            x: x,
            y: y
        },
        this.vel = {
            x: 0,
            y: 0
        },
        this.acc = {
            x: 0,
            y: 0
        },
        this.width = texture.width;
    this.height = texture.height;
    this.texture = texture;
    this.grabbed = false;
    this.grounded = false;
}

function Summon(matter) {
    if (typeof matter == "string") {
        let newMatter = new Matters[matter]
        world.push(newMatter);
    } else {
        let newMatter = new matter;
        world.push(newMatter);
    }
}