const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PacketAnalyzer = require("../services/packetAnalyzer");
const cors = require("cors");
router.use(cors());

// ------------------------- GET ------------------------- //

router.get("/", async (req, res) => {
    res.render("index", { title: "Home" });
});

router.get("/api/packetdata", async (req, res) => {
    const packet_data = require("../data/packet_data.json"); // grab file & use it for rendering
    res.render("packetdata", {
        packetData: packet_data,
    });
});

// ------------------------- POST ------------------------- //

router.post("/api/packetanalysis", upload.single("packetFile"), async (req, res) => {
    try {
        const packetAnalyzer = new PacketAnalyzer();
        const analysisResult = await packetAnalyzer.analyzePacketFile(req.file.path);
        res.json(analysisResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during analysis" });
    }
});

module.exports = router;

// ------------------------- NOTES ------------------------- //

// /api/packetdata [GET]
// /api/packetanalysis [POST]
