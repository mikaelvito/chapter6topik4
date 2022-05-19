const express = require("express");
const PORT = 3000;
const app = express();
const { Catalogues } = require("./models");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/catalogues/create.ejs", (req, res) => {
  res.render("catalogues/create");
});

app.post("/catalogues", (req, res) => {
  Catalogue.create({
    product_name: req.body.product_name,
    description: req.body.description,
  }).then((catalogue) => {
    res.redirect("/catalogues");
  });
});

app.get("/catalogues", (req, res) => {
  Catalogue.findAll().then((catalogues) => {
    res.render("catalogues/index", {
      catalogues: catalogues,
    });
  });
});

app.get("/catalogues/:id", (req, res) => {
  Catalogue.findOne({
    where: { id: req.params.id },
  }).then((catalogue) => {
    res.render("catalogues/show", catalogue.dataValues);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
