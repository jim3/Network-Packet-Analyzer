const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/indexRoute"));

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
