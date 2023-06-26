const express = require("express");
const router = express.Router();
const PacketAnalyzer = require("../services/packetAnalyzer");
const Packet = require("../models/Packet");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const dotenv = require("dotenv");
dotenv.config();

// Setup Mongoose connection
const mongoose = require("mongoose");
const uri = process.env.MONGO_DB_CONNECTION_STRING;

mongoose
    .connect(uri, {
        dbName: "packet_analyzer", // name of the database
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => console.error("Connection error", err));

// ------------------------- GET ------------------------- //

// Renders the upload page
router.get("/", async (req, res) => {
    res.render("index", { title: "Home" });
});

// Endpoint that shows an html table of the results
router.get("/api/packetdata", async (req, res) => {
    const packet_data = require("../data/packet_data.json"); // grab file & use it for rendering
    res.render("packetdata", {
        packetData: packet_data,
    });
});

// ----------------------------------------------------- //

// Creates a new packet in the database (collection: packets)
const createPacket = async (analysisResult) => {
    const { ipAddresses, ipDetails, macAddresses, udpPorts, tcpPorts } = analysisResult;
    Packet.create({ ipAddresses, ipDetails, macAddresses, udpPorts, tcpPorts }).then((packet) => {
        console.log("Packet created: ", packet);
        return packet;
    });
};

// ----------------------------------------------------- //

// Calls the `packetAnalyzer` function to analyze the uploaded packet file and responds with json data
router.post("/api/packetanalysis", upload.single("packetFile"), async (req, res) => {
    try {
        const packetAnalyzer = new PacketAnalyzer();
        const analysisResult = await packetAnalyzer.analyzePacketFile(req.file.path);
        const savedPacket = await createPacket(analysisResult);
        res.json(analysisResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during analysis" });
    }
});

module.exports = router;
