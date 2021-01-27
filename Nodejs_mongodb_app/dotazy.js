const dotazy = {
    zakaznici: "SELECT * FROM zakaznici",
    objednavky: "SELECT * FROM objednavky",
    produkty: "SELECT * FROM produkty",
    dopravci: "SELECT * FROM dopravci",
    objednane_zbozi: "SELECT * FROM objednane_zbozi",
    statusy_objedavek: "SELECT * FROM statusy_objednavek",
    pohledy: {
        dochazejici_produkty: "SELECT id_produktu, jmeno, skladem FROM produkty WHERE skladem < 5 ORDER BY skladem",
        dospeli_zakaznici: "SELECT * FROM dospeli_zakaznici",
        mladi_zakaznici: "SELECT * FROM mladi_zakaznici",
        nejdrazsi_objednavka: "SELECT * FROM nejdrazsi_objednavka",
        nejlevnejsi_objednavka: "SELECT * FROM nejlevnejsi_objednavka",
        objednavky_k_odeslani: "SELECT * FROM objednavky_k_odeslani",
        odeslane_objednavky: "SELECT * FROM odeslane_objednavky",
        posledni_objednavka: "SELECT * FROM posledni_objednavka",
        trzby: "SELECT * FROM trzby",
        zakaznici_a_zbozi: "SELECT * FROM zakaznici_a_zbozi"
    }
};

module.exports = dotazy;