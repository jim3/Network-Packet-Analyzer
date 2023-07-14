const fs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

class PacketAnalyzer {
    constructor() {}
    async ipAddresses(data) {
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    async dns(data) {
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    async http(data) {
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    async macAddresses(data) {
        try {
            data = await fs.readFile(data, "utf-8");
            data = JSON.parse(data);
            data = Object.keys(data).map(function (key) {
                return data[key];
            });

            const macSet = new Set();
            const fieldsToCheck = ["eth.src", "eth.dst"];

            data.forEach((e) => {
                if (e._source.layers.eth) {
                    const mac = e._source.layers.eth;
                    fieldsToCheck.forEach((field) => {
                        if (mac[field]) {
                            macSet.add(mac[field]);
                        }
                    });
                }
            });

            const macArray = Array.from(macSet);
            return macArray;
        } catch (error) {
            console.log(error);
        }
    }

    async udpPorts(data) {
        try {
            data = await fs.readFile(data, "utf-8");
            data = JSON.parse(data);
            data = Object.keys(data).map(function (key) {
                return data[key];
            });

            const udpSet = new Set();
            const fieldsToCheck = ["udp.port"];

            data.forEach((e) => {
                if (e._source.layers.udp) {
                    const udp = e._source.layers.udp;
                    fieldsToCheck.forEach((field) => {
                        if (udp[field]) {
                            udpSet.add(udp[field]);
                        }
                    });
                }
            });

            const udpArray = Array.from(udpSet);
            return udpArray;
        } catch (error) {
            console.log(error);
        }
    }

    async tcpPorts(data) {
        try {
            data = await fs.readFile(data, "utf-8");
            data = JSON.parse(data);
            data = Object.keys(data).map(function (key) {
                return data[key];
            });

            const tcpSet = new Set();
            const fieldsToCheck = ["tcp.port"];

            data.forEach((e) => {
                if (e._source.layers.tcp) {
                    const tcp = e._source.layers.tcp;
                    fieldsToCheck.forEach((field) => {
                        if (tcp[field]) {
                            tcpSet.add(tcp[field]);
                        }
                    });
                }
            });

            const tcpArray = Array.from(tcpSet);
            return tcpArray;
        } catch (error) {
            console.log(error);
        }
    }

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

    async analyzePacketFile(filePath) {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        try {
            const ipAddr = await this.ipAddresses(filePath);
            const dnsArray = await this.dns(filePath);
            const httpArray = await this.http(filePath);
            const macArray = await this.macAddresses(filePath);
            const udpArray = await this.udpPorts(filePath);
            const tcpArray = await this.tcpPorts(filePath);
            const ipDetails = await this.ipDetails(filePath);

            const packetData = {
                ipAddr,
                dnsArray,
                httpArray,
                macArray,
                udpArray,
                tcpArray,
                ipDetails,
            };

            return packetData;
        } catch (error) {
            throw new Error("FAIL!!! Error analyzing packet file");
        }
    }
}

module.exports = PacketAnalyzer;
