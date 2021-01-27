// Požadované soubory
const express = require("express");
const path = require("path");
const app = express();
const mongodb = require("mongodb");
//Nastavení Mongo API klienta
let mongoClient = mongodb.MongoClient;
let url = "mongodb://localhost:27017/";
// Soubor s uloženými dotazy
const dotazy = require("./dotazy");


// Nastavení výchozího enginu pro stránky
app.set("view engine", "ejs");

//Lokalizace ss souboru
app.use("/css", express.static(path.resolve(__dirname, "css")));


// Router na domovskou stránku, v našem případě index.ejs
app.get("/", (req, res) => {
    res.render("index");
});

// Router na tabulku zákaznící
app.get("/zakaznici", (req, res) => {
    //Připojí se k databázi
        mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
            if (err) throw err;
            let db = client.db("strzelecki_db");
            let data = {};
           db.collection("zakaznici").find({}).toArray((err, result) => {
               data = {data: result};
               res.render("zakaznici", data);
               client.close();
           });
        });
})

app.get("/objednavky", (req, res) => {
    //Připojí se k databázi
        mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
            if (err) throw err;
            let db = client.db("strzelecki_db");
            let data = {};
           db.collection("objednavky").find({}).toArray((err, result) => {
               data = {data: result};
               res.render("objednavky", data);
               client.close();
           });
        });
})

app.get("/produkty", (req, res) => {
    //Připojí se k databázi
        mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
            if (err) throw err;
            let db = client.db("strzelecki_db");
            let data = {};
           db.collection("produkty").find({}).toArray((err, result) => {
               data = {data: result};
               res.render("produkty", data);
               client.close();
           });
        });
})

app.get("/podpora", (req, res) => {
    //Připojí se k databázi
        mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
            if (err) throw err;
            let db = client.db("strzelecki_db");
            let data = {};
           db.collection("podpora").find({}).toArray((err, result) => {
               data = {data: result};
               res.render("podpora", data);
               client.close();
           });
        });
})

app.get("/reklamace", (req, res) => {
    //Připojí se k databázi
        mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
            if (err) throw err;
            let db = client.db("strzelecki_db");
            let data = {};
           db.collection("reklamace").find({}).toArray((err, result) => {
               data = {data: result};
               res.render("reklamace", data);
               client.close();
           });
        });
})

app.get("/zamestnanci", (req, res) => {
    //Připojí se k databázi
        mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
            if (err) throw err;
            let db = client.db("strzelecki_db");
            let data = {};
           db.collection("zamestnanci").find({}).toArray((err, result) => {
               data = {data: result};
               res.render("zamestnanci", data);
               client.close();
           });
        });
})

app.get("/dospeli-zakaznici", (req, res) => {
        mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
            if (err) throw err;
            let db = client.db("strzelecki_db");
            let data = {};
           db.collection("zakaznici").find({vek: {$gte: 18}}).toArray((err, result) => {
               data = {data: result};
               //Není třeba vytvářet nový template, pouze se do původního vloží vybraná data z dotazu, výsledek je stejný
               res.render("zakaznici", data);
               client.close();
           });
        });
})

app.get("/mladi-zakaznici", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("zakaznici").find({vek: {$lt: 18}}).toArray((err, result) => {
           data = {data: result};
           res.render("zakaznici", data);
           client.close();
       });
    });
})

app.get("/dorucene-objednavky", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("objednavky").find({stav_objednavky: "Doručeno"}).toArray((err, result) => {
           data = {data: result};
           res.render("objednavky", data);
           client.close();
       });
    });
})

app.get("/objednavky-k-odeslani", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("objednavky").find({stav_objednavky: "Připravuje se"}).toArray((err, result) => {
           data = {data: result};
           res.render("objednavky", data);
           client.close();
       });
    });
})

app.get("/dochazejici-produkty", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("produkty").find({skladem : {$lt: 5}}).toArray((err, result) => {
           data = {data: result};
           res.render("produkty", data);
           client.close();
       });
    });
})

app.get("/podpora-nezodpovezene", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("podpora").find({$or:[{stav: "Čeká se na odpověď"}, {stav: "Nezodpovězeno"}]}).toArray((err, result) => {
           data = {data: result};
           res.render("podpora", data);
           client.close();
       });
    });
})

app.get("/bezpecne-objednavky", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("objednavky").find({dopravce: {$ne: "Česká pošta"}}).toArray((err, result) => {
           data = {data: result};
           res.render("objednavky", data);
           client.close();
       });
    });
})

app.get("/nejdrazsi-objednavka", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("objednavky").find().sort({cena_celkem:-1}).limit(1).toArray((err, result) => {
           data = {data: result};
           res.render("objednavky", data);
           client.close();
       });
    });
})

app.get("/reklamace-zamitnute", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("reklamace").find({stav_reklamace: "Neschváleno"}).toArray((err, result) => {
           data = {data: result};
           res.render("reklamace", data);
           client.close();
       });
    });
})

app.get("/pocet-zakazniku", (req, res) => {
    mongoClient.connect(url, { useUnifiedTopology:true }, (err, client) => {
        if (err) throw err;
        let db = client.db("strzelecki_db");
        let data = {};
       db.collection("zakaznici").find().count((err, result) => {
        data = {data: result};
        res.render("pocetZakazniku", data);
        client.close();
       });
  

    });
})



// Aplikace bude na sděleném portu
app.listen(3000, () => {
    //Vypíše se do konzole, že je server správně spuštěný
    console.log("Server is running on port 3000...");
})