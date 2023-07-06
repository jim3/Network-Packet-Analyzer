const express = require("express");
const router = express.Router();
const Packet = require("../models/Packet");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PacketAnalyzer = require("../services/packetAnalyzer");
const dotenv = require("dotenv");
dotenv.config();

// sets up a mongoose db connection
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

// ----------------------------------------------------- //

// renders the upload page
router.get("/", async (req, res) => {
    res.render("index", { title: "Home" });
});

// get last document
router.get("/api/packet/data", async (req, res) => {
    try {
        const packetData = await Packet.find().sort({ _id: -1 }).limit(1);
        res.render("packetdata", {
            packetData: packetData[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving packet data" });
    }
});

// return the total of ip addresses
router.get("/api/packet/ipaddress", async (req, res) => {
    if (!req.query.ip) {
        res.status(400).json({ error: "Missing required query parameter: ip" });
    }
    const ipAddress = req.query.ip;
    try {
        const jsonObjects = [];
        const packetData = await Packet.find({ "ipDetails.ipSourceDetails.ip": ipAddress });
        packetData.forEach((e) => {
            const ipObj = e.ipDetails.ipSourceDetails.find(function (e) {
                return e.ip === ipAddress;
            });

            if (ipObj) {
                jsonObjects.push(ipObj);
            }
        });
        res.json(jsonObjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving packet data" });
    }
});

// creates a new document in the database
const createPacket = async (analysisResult) => {
    const { ipAddr, ipDetails, macAddresses, udpPorts, tcpPorts } = analysisResult;
    Packet.create({ ipAddr, ipDetails, macAddresses, udpPorts, tcpPorts }).then((packet) => {
        console.log("Packet created: ", packet); // `[]` empty
        return packet;
    });
};

// analyzes the uploaded packet file and returns the result
router.post("/api/packet/analyze", upload.single("packetFile"), async (req, res) => {
    try {
        const packetAnalyzer = new PacketAnalyzer();
        const analysisResult = await packetAnalyzer.analyzePacketFile(req.file.path); // path to the uploaded file
        await createPacket(analysisResult);
        res.json(analysisResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during analysis" });
    }
});

module.exports = router;
