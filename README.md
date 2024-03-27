### Network Packet Analyzer (Wireshark)

The application analyzes exported Wireshark packets in JSON format. [see here](https://www.wireshark.org/docs/wsug_html_chunked/ChIOExportSection.html) Currently, it displays the following:

1. IP location details (city, state, country, etc...)
2. List of unique IP addresses
3. List of unique MAC addresses
4. List of unique TCP & UDP port numbers
5. DNS queries / answers
6. HTTP request methods, user agent, etc..

There is an HTML front-end for the app at the root endpoint `/`. This allows you upload your exported json file for parsing. The server code extracts the data and responds back to the client with JSON. I created an endpoint located at `/api/packet/data` that displays the results in HTML/EJS table format, `http://127.0.0.1/api/packet/data`. If you need customized output all you have to do is edit the functions inside `packetAnalyzer.js` file.

I included [MongoDB Atlas](https://www.mongodb.com/atlas) into the full-stack app. It reads from the last packet in the collection and Express renders it to the `/api/packet/data` endpoint. See examples of it at the bottom of the README.md

## Getting Started

Ideally, it should be as easy as issuing `npm install`, filling in your `.env` file and `nodemon index.js` It's been tested on Linux (Debian based) and Windows 10.

-   To get the IP address location details I used the [ip2location.io](https://www.ip2location.io) API.
-   For MongoDB Atlas, Place your connection string info inside the `.env` file. There is an `env.example`.

### Installation

Clone the repo

```bash
git clone https://github.com/jim3/Network-Packet-Analyzer.git
```

Install dependencies

```bash
npm install
```

### Usage

Capture some Wireshark packets, use a capture filter for better results:

- Wireshark `host <YourIP> and not broadcast and not multicast and ip` then `File > Export Packet Dissections > As JSON`

- TShark: `./tshark -i <interface> -T json -c 100 > <path to json file>`


Run the script

```bash
nodemon index.js
```

Open your browser and go to:

1. `http://localhost:3000/` and upload your exported wireshark file, the server will respond with the details in JSON.

Vist `http://localhost:3000/api/packet/data` to view the results of the last file written to your MongoDB Atlas database/collection.

## Technology Used

-   [Node.js](https://nodejs.org/en/) - JavaScript runtime
-   [npm](https://www.npmjs.com/) - Package manager
-   [MongoDB Atlas](https://www.mongodb.com/atlas)
-   [Mongoose](https://mongoosejs.com)
-   [WireShark](https://www.wireshark.org/) - Network protocol analyzer
-   [JSON](https://www.json.org/) - Data format
-   [JavaScript](https://learnjavascript.online/) - Programming language
-   [Visual Studio Code](https://code.visualstudio.com/) - Code editor

---

### HTML Table Output Example

![01-table](https://github.com/jim3/Network-Packet-Analyzer/assets/11630112/2261c091-bb09-4692-823d-9a366483d168)




### JSON Output Example

```json
{
  "ipAddr": [
    "192.168.0.205",
    "108.166.149.2",
    "209.197.3.8",
    "17.253.7.203",
    "54.174.225.91",
    "185.199.111.153",
    "52.39.121.148",
    "172.253.124.188"
  ],
  "dnsArray": [
    "ctldl.windowsupdate.com",
    "wu-bg-shim.trafficmanager.net",
    "cds.d2s7q6s2.hwcdn.net",
    "crl.apple.com",
    "crl-lb.apple.com.akadns.net",
    "crl.g.aaplimg.com"
  ],
  "httpArray": [
    "ctldl.windowsupdate.com",
    "http://ctldl.windowsupdate.com/msdownload/update/v3/static/trustedr/en/authrootstl.cab",
    "Microsoft-CryptoAPI/10.0",
    "crl.apple.com",
    "http://crl.apple.com/appleserverauthca1.crl",
    "http://crl.apple.com/root.crl"
  ],
  "macArray": [
    "02:10:18:84:63:f3",
    "34:17:eb:dc:d2:f9"
  ],
  "udpArray": [
    "53",
    "49788",
    "61820"
  ],
  "tcpArray": [
    "80",
    "25633",
    "25634",
    "443",
    "25539",
    "25567",
    "25283",
    "5228",
    "25272"
  ],
  "ipDetails": {
    "ipDetailsSource": [
      {
        "ip": "192.168.0.205",
        "country_code": "-",
        "country_name": "-",
        "region_name": "-",
        "city_name": "-",
        "latitude": null,
        "longitude": null,
        "zip_code": "-",
        "time_zone": "-",
        "asn": "-",
        "as": "-",
        "is_proxy": false
      },
      {
        "ip": "108.166.149.2",
        "country_code": "US",
        "country_name": "United States of America",
        "region_name": "New York",
        "city_name": "New York City",
        "latitude": 41.353013,
        "longitude": -74.2637,
        "zip_code": "10918",
        "time_zone": "-04:00",
        "asn": "30036",
        "as": "Mediacom Communications Corp",
        "is_proxy": false
      },

```

