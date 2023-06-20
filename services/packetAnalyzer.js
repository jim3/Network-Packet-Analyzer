const fs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

class PacketAnalyzer {
    constructor() {}

    async readPackets() {
        const data = await this.writeData();
        data = await fs.readFile(data, "utf-8");
        return data;
    }

    async writeData(data) {
        data = await fs.writeFile("./data/packet_data.json", JSON.stringify(data));
        return data;
    }

    // ------------------------- IP Addresses ------------------------- //

    async ipAddresses(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map((key) => data[key]);

        const filteredSets = data.filter(
            (set) =>
                set.hasOwnProperty("_source") && set._source.layers.hasOwnProperty("ip")
        );

        const ipSrcSet = new Set();
        const ipDstSet = new Set();

        filteredSets.forEach((e) => {
            const ip = e._source.layers.ip;
            if (ip["ip.src"]) {
                ipSrcSet.add(ip["ip.src"]);
            }
            if (ip["ip.dst"]) {
                ipDstSet.add(ip["ip.dst"]);
            }
        });

        const ipSrc = Array.from(ipSrcSet);
        const ipDst = Array.from(ipDstSet);

        return { ipSrc, ipDst };
    }

    // ------------------------- IP Details ------------------------- //

    async ipDetails(data) {
        const ipSourceDetails = [];
        const ipDestinationDetails = [];

        const getIPDetails = async (ipAddress) => {
            const baseURL = "https://api.ip2location.io/";
            const apiKey = process.env.API_KEY;
            const format = "json";
            const url = `${baseURL}?key=${apiKey}&ip=${ipAddress}&format=${format}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        const ipSource = data.ipSrc;
        const ipDestination = data.ipDst;

        for (let i = 0; i < ipSource.length; i++) {
            const ipSourceDetail = await getIPDetails(ipSource[i]);
            ipSourceDetails.push(ipSourceDetail);
        }

        for (let i = 0; i < ipDestination.length; i++) {
            const ipDestinationDetail = await getIPDetails(ipDestination[i]);
            ipDestinationDetails.push(ipDestinationDetail);
        }

        return { ipSourceDetails, ipDestinationDetails };
    }

    // ------------------------- MAC Addresses ------------------------- //

    async macAddresses(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map((key) => data[key]);

        const filteredSets = data.filter(
            (set) =>
                set.hasOwnProperty("_source") && set._source.layers.hasOwnProperty("eth")
        );

        const macSourceSet = new Set();
        const macDestinationSet = new Set();

        filteredSets.forEach((set) => {
            const macSource = set._source.layers.eth["eth.src"];
            const macDestination = set._source.layers.eth["eth.dst"];

            if (macSource) {
                macSourceSet.add(macSource);
            }

            if (macDestination) {
                macDestinationSet.add(macDestination);
            }
        });

        const macSourceArray = Array.from(macSourceSet);
        const macDestinationArray = Array.from(macDestinationSet);

        const macAddresses = {
            macSource: macSourceArray,
            macDestination: macDestinationArray,
        };

        return macAddresses;
    }

    // ------------------------- UDP Ports ------------------------- //

    async udpPorts(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map((key) => data[key]);

        const filteredSets = data.filter(
            (set) =>
                set.hasOwnProperty("_source") && set._source.layers.hasOwnProperty("udp")
        );

        const udpSourceSet = new Set();
        const udpDestinationSet = new Set();

        filteredSets.forEach((set) => {
            const udpSource = set._source.layers.udp["udp.srcport"];
            const udpDestination = set._source.layers.udp["udp.dstport"];

            if (udpSource) {
                udpSourceSet.add(udpSource);
            }

            if (udpDestination) {
                udpDestinationSet.add(udpDestination);
            }
        });

        const udpSourceArray = Array.from(udpSourceSet);
        const udpDestinationArray = Array.from(udpDestinationSet);

        const udpPorts = {
            udpSource: udpSourceArray,
            udpDestination: udpDestinationArray,
        };

        return udpPorts;
    }

    // ------------------------- TCP Ports ------------------------- //

    async tcpPorts(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map((key) => data[key]);

        const filteredSets = data.filter(
            (set) =>
                set.hasOwnProperty("_source") && set._source.layers.hasOwnProperty("tcp")
        );

        const tcpSourceSet = new Set();
        const tcpDestinationSet = new Set();

        filteredSets.forEach((set) => {
            const tcpSource = set._source.layers.tcp["tcp.srcport"];
            const tcpDestination = set._source.layers.tcp["tcp.dstport"];

            if (tcpSource) {
                tcpSourceSet.add(tcpSource);
            }

            if (tcpDestination) {
                tcpDestinationSet.add(tcpDestination);
            }
        });

        const tcpSourceArray = Array.from(tcpSourceSet);
        const tcpDestinationArray = Array.from(tcpDestinationSet);

        const tcpPorts = {
            tcpSource: tcpSourceArray,
            tcpDestination: tcpDestinationArray,
        };

        return tcpPorts;
    }

    // ------------------------- Write Data ------------------------- //

    async analyzePacketFile(filePath) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        try {
            const ipAddresses = await this.ipAddresses(filePath);
            const ipDetails = await this.ipDetails(ipAddresses);
            const macAddresses = await this.macAddresses(filePath);
            const udpPorts = await this.udpPorts(filePath);
            const tcpPorts = await this.tcpPorts(filePath);

            const packetData = {
                ipAddresses,
                ipDetails,
                macAddresses,
                udpPorts,
                tcpPorts,
            };

            this.writeData(packetData); // (*) write data to file for later use
            return packetData;
        } catch (error) {
            throw new Error("FAIL!!! Error analyzing packet file");
        }
    }
}

module.exports = PacketAnalyzer;
