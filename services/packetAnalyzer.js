const fs = require("fs/promises");
const dotenv = require("dotenv");

dotenv.config(); // load environment variables from .env file

class PacketAnalyzer {
    constructor() {}

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
            (e) => e.hasOwnProperty("_source") && e._source.layers.hasOwnProperty("ip")
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
            (e) => e.hasOwnProperty("_source") && e._source.layers.hasOwnProperty("eth")
        );

        const macSourceSet = new Set();
        const macDestinationSet = new Set();

        filteredSets.forEach((e) => {
            const macSource = e._source.layers.eth["eth.src"];
            const macDestination = e._source.layers.eth["eth.dst"];

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
            (e) => e.hasOwnProperty("_source") && e._source.layers.hasOwnProperty("udp")
        );

        const udpSourceSet = new Set();
        const udpDestinationSet = new Set();

        filteredSets.forEach((e) => {
            const udpSource = e._source.layers.udp["udp.srcport"];
            const udpDestination = e._source.layers.udp["udp.dstport"];

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

        // filter out packets that do not have tcp layer
        const filteredSets = data.filter(
            (e) => e.hasOwnProperty("_source") && e._source.layers.hasOwnProperty("tcp")
        );

        // create sets to remove the duplicates from the arrays
        const tcpSourceSet = new Set();
        const tcpDestinationSet = new Set();

        // add tcp ports to sets
        filteredSets.forEach((e) => {
            const tcpSource = e._source.layers.tcp["tcp.srcport"];
            const tcpDestination = e._source.layers.tcp["tcp.dstport"];

            if (tcpSource) {
                tcpSourceSet.add(tcpSource);
            }

            if (tcpDestination) {
                tcpDestinationSet.add(tcpDestination);
            }
        });

        // convert sets to arrays so you can iterate over them (who wants to iterate over a set?)
        const tcpSourceArray = Array.from(tcpSourceSet);
        const tcpDestinationArray = Array.from(tcpDestinationSet);

        const tcpPorts = {
            tcpSource: tcpSourceArray,
            tcpDestination: tcpDestinationArray,
        };

        return tcpPorts;
    }

    // ------------------------- Insert into Database ------------------------- //

    async analyzePacketFile(filePath) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        try {
            const ipAddresses = await this.ipAddresses(filePath);
            const macAddresses = await this.macAddresses(filePath);
            const udpPorts = await this.udpPorts(filePath);
            const tcpPorts = await this.tcpPorts(filePath);
            const ipDetails = await this.ipDetails(ipAddresses);

            const packetData = {
                ipAddresses,
                ipDetails,
                macAddresses,
                udpPorts,
                tcpPorts,
            };
            
            this.writeData(packetData); // write results to a file for the table
            return packetData;
        } catch (error) {
            throw new Error("FAIL!!! Error analyzing packet file");
        }
    }
}

module.exports = PacketAnalyzer;
