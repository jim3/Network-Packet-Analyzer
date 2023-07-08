const fs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

class PacketAnalyzer {
    constructor() {}
    async ipAddresses(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map(function (key) {
            return data[key];
        });

        const ipSet = new Set();
        const fieldsToCheck = ["ip.src", "ip.dst"];

        data.forEach((e) => {
            if (e._source.layers && e._source.layers.ip) {
                const ip = e._source.layers.ip;
                fieldsToCheck.forEach((field) => {
                    if (ip[field]) {
                        ipSet.add(ip[field]);
                    }
                });
            }
        });

        const ipAddr = Array.from(ipSet);
        return ipAddr;
    }

    // ------------------------- DNS ------------------------- //

    async dns(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map(function (key) {
            return data[key];
        });
        const dnsSet = new Set();

        data.forEach((e) => {
            if (e._source.layers.dns) {
                const dns = e._source.layers.dns; // grab the dns object

                const queriesArray = Object.values(dns.Queries);
                if (queriesArray) {
                    queriesArray.forEach((query) => {
                        if (query["dns.qry.name"]) {
                            dnsSet.add(query["dns.qry.name"]);
                        }
                    });
                }
                const answersObj = dns.Answers;
                if (answersObj) {
                    const answersArray = Object.values(answersObj);
                    if (answersArray) {
                        answersArray.forEach((answer) => {
                            if (answer["dns.resp.name"]) {
                                dnsSet.add(answer["dns.resp.name"]);
                            }
                        });
                    }
                }
            }
        });

        const dnsArray = Array.from(dnsSet);
        return dnsArray;
    }

    // ------------------------- HTTP ------------------------- //

    async http(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map(function (key) {
            return data[key];
        });
        const httpSet = new Set();
        const fieldsToCheck = ["http.host", "http.request.full_uri", "http.request.method", "http.user_agent"];

        data.forEach((e) => {
            if (e._source.layers.http) {
                const http = e._source.layers.http; // grab the http object
                fieldsToCheck.forEach((field) => {
                    if (http[field]) {
                        httpSet.add(http[field]);
                    }
                });
            }
        });

        const httpArray = Array.from(httpSet);
        return httpArray;
    }

    // ------------------------- MAC Addresses ------------------------- //

    async macAddresses(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map(function (key) {
            return data[key];
        });

        const macSourceSet = new Set();
        const macDestinationSet = new Set();

        data.forEach((e) => {
            if (e._source.layers && e._source.layers.eth) {
                const macSource = e._source.layers.eth["eth.src"];
                const macDestination = e._source.layers.eth["eth.dst"];
                if (macSource) {
                    macSourceSet.add(macSource);
                }
                if (macDestination) {
                    macDestinationSet.add(macDestination);
                }
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
        data = Object.keys(data).map(function (key) {
            return data[key];
        });

        const udpSourceSet = new Set();
        const udpDestinationSet = new Set();

        if (!data) {
            throw new Error("No data provided");
        }
        data.forEach((e) => {
            if (e._source.layers && e._source.layers.udp) {
                const udpSource = e._source.layers.udp["udp.srcport"];
                const udpDestination = e._source.layers.udp["udp.dstport"];

                if (udpSource) {
                    udpSourceSet.add(udpSource);
                }

                if (udpDestination) {
                    udpDestinationSet.add(udpDestination);
                }
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
        data = Object.keys(data).map(function (key) {
            return data[key];
        });

        const tcpSourceSet = new Set();
        const tcpDestinationSet = new Set();

        data.forEach((e) => {
            if (e._source.layers && e._source.layers.tcp) {
                const tcpSource = e._source.layers.tcp["tcp.srcport"];
                const tcpDestination = e._source.layers.tcp["tcp.dstport"];
                if (tcpSource) {
                    tcpSourceSet.add(tcpSource);
                }
                if (tcpDestination) {
                    tcpDestinationSet.add(tcpDestination);
                }
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

    // ------------------------- IP Details ------------------------- //

    async ipDetails(data) {
        data = await fs.readFile(data, "utf-8");
        data = JSON.parse(data);
        data = Object.keys(data).map(function (key) {
            return data[key];
        });

        const getIPDetails = async (ipAddress) => {
            const baseURL = "https://api.ip2location.io/";
            const apiKey = process.env.API_KEY;
            const format = "json";
            const url = `${baseURL}?key=${apiKey}&ip=${ipAddress}&format=${format}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        // create a set to store unique ip addresses
        let ipDetailsSourceSet = new Set();
        let ipDetailsDestinationSet = new Set();

        data.forEach((e) => {
            if (e._source.layers && e._source.layers.ip) {
                const ipSource = e._source.layers.ip["ip.src"];
                const ipDestination = e._source.layers.ip["ip.dst"];
                if (ipSource) {
                    ipDetailsSourceSet.add(ipSource);
                }
                if (ipDestination) {
                    ipDetailsDestinationSet.add(ipDestination);
                }
            }
        });

        const ipSrcArr = Array.from(ipDetailsSourceSet);
        const ipDstArr = Array.from(ipDetailsDestinationSet);

        const ipDetailsSource = await Promise.all(
            ipSrcArr.map(async (ip) => {
                const ipDetails = await getIPDetails(ip);
                return ipDetails;
            })
        );

        const ipDetailsDestination = await Promise.all(
            ipDstArr.map(async (ip) => {
                const ipDetails = await getIPDetails(ip);
                return ipDetails;
            })
        );

        const ipDetails = {
            ipDetailsSource,
            ipDetailsDestination,
        };

        return ipDetails;
    }

    // ------------------------------------------------------ //

    async analyzePacketFile(filePath) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        try {
            const ipAddr = await this.ipAddresses(filePath);
            const dnsArray = await this.dns(filePath);
            const httpArray = await this.http(filePath);
            const macAddresses = await this.macAddresses(filePath);
            const udpPorts = await this.udpPorts(filePath);
            const tcpPorts = await this.tcpPorts(filePath);
            const ipDetails = await this.ipDetails(filePath);

            const packetData = {
                ipAddr,
                dnsArray,
                httpArray,
                macAddresses,
                udpPorts,
                tcpPorts,
                ipDetails,
            };

            return packetData;
        } catch (error) {
            throw new Error("FAIL!!! Error analyzing packet file");
        }
    }
}

module.exports = PacketAnalyzer;
