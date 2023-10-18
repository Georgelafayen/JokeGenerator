import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public/styles/"));
app.use(express.static(__dirname + "/public/images/"));
app.use(bodyParser.urlencoded({ extended: true }));

const category = ["Programming", "Misc", "Dark", "Pun"];
const type = ["single", "twopart"];

let rCat = Math.floor(Math.random() * 4);
let rTy = Math.floor(Math.random() * 2);

let cat = category[rCat];
let ty = type[rTy];

app.get("/", (req, res) => {
  res.render("index.ejs", { joke: "", setup: "", delivery: "" });
  console.log("Ciao beccati sta pagina!");
});

app.get("/joke", async (req, res) => {
  try {
    let rCat = Math.floor(Math.random() * 4);
    let rTy = Math.floor(Math.random() * 2);
    let cat = category[rCat];
    let ty = type[rTy];

    const result = await axios.get(
      `https://v2.jokeapi.dev/joke/${cat}?type=${ty}`
    );
    res.render("index.ejs", {
      joke: result.data.joke,
      setup: result.data.setup,
      delivery: result.data.delivery,
    });

    console.log("Ciao beccati sti risultati!");
    console.log(cat, ty);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
