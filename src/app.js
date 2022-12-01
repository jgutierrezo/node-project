/****************************************************************************** ***
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students. *
 * Group member Name: Juan Gutierrez Student IDs: N01469217 Date: 29-Nov-2022
 ****************************************************************************** ***/

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { engine } from "express-handlebars";
import movieRoutes from "./routes/movieRoutes.js";
import connectDb from "./database/MongoDbConfig.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import helpers from "handlebars-helpers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Choosen architekture: 3 layer architecture
//Router -> Controller -> Service Layer -> Data Access Layer

//To load env variables into the process global object
dotenv.config();

//Create server
const app = express();

const PORT = process.env.PORT || 5001;
//To connect to the Db
connectDb()
  .then(app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//Configure server
app.engine(".hbs", engine({ extname: ".hbs", helpers: helpers(["array", "comparison"]) }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/api/Movies", movieRoutes);
