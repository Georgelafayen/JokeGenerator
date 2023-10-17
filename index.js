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


app.get("/", (req, res) => {
    res.render("index.ejs", {joke: "", setup: "", delivery: ""});
    console.log("Ciao beccati sta pagina!");
});

app.post("/", async (req, res) => {
  const category = req.body.category;
  const type = req.body.type;

    try {
      const result = await axios.get(`https://v2.jokeapi.dev/joke/${category}?type=${type}`);
      res.render("index.ejs", { 
        joke: result.data.joke, 
        setup : result.data.setup, 
        delivery: result.data.delivery,
      });
      console.log("Ciao beccati sti risultati!");

    } catch (error) {
        console.log(error);
        res.status(500);
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });





  