const express = require("express");

const datas = require("./products.json");
const randomNumber = require("./utils/index.js");

const app = express();
const PORT = 9000;

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
// la méthode urlencoded est le mécanisme pour récupérer les données d'un formulaire
// ces données vont être stockés dans une propriété avec comme "key" -> body dans la requête (req.body)
// à l'intérieur s'y trouvera un objet (ou plus), le nom de la key sera la valeur de l'attribut name de l'input et sa valeur celle de l'input ...
// anciennement il fallait installer un module body-parser
// extended -> true pour la libraire de parsing "qs"
// extended -> false pour la libraire de parsing "querystring"
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const randomDatas = [...datas];
    const datasToDisplay = 3;
    for (let i = 0; i < datas.length - datasToDisplay ; i++) {
        const index = randomNumber(0, randomDatas.length -1);
        randomDatas.splice(index, 1 );
    }
    res.status(200).render("layout", {template: "./home", randomDatas });
});

app.get("/product", (req, res) => {      
    res.status(200).render("layout", {template: "./product/all", datas });
});

app.get("/product/:id", (req, res) => {
    const data = datas.find((data) => data.id === parseInt(req.params.id));
    res.status(200).render("layout", {template: "./product/one", data });
});

app.get("/search", (req, res) => {  
    const search = datas.filter((data) => data.label.toLowerCase().includes(req.query.search.toLowerCase()));
    res.status(200).render("layout", {template: "./search", search});
});

app.post("/search", (req, res) => {    
    res.redirect(`/search?search=${req.body.search}`);
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));