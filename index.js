const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// set the view engine to ejs
app.set("view engine", "ejs");

app.use("/public", express.static(process.cwd() + "/public"));

// Set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/indexRoute"));

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
