### JSON Packet Analyzer (Wireshark)

The application analyzes exported Wireshark packets in JSON format. [see here](https://www.wireshark.org/docs/wsug_html_chunked/ChIOExportSection.html) Currently, it extracts the following:

1. Source & Destination IP details (city, state, country)
2. Source & Destination IP addresses
3. Source & Destination MAC addresses
4. TCP & UDP source and destination port numbers

There is an HTML front-end (form) for the app at the root endpoint `/`. This allows you upload your exported json file. The server extracts the data and responds back to the client with JSON. I created another endpoint located at `/api/packetdata` that displays the results in HTML table format. 

[MongoDB Atlas](https://www.mongodb.com/atlas) is how the table gets populated. It reads from the last packet in the collection and Express renders it to the `/api/packetdata` endpoint. See examples of it at the bottom of the README.md

From here on out, I mainly want to improve the code and focus on database portion of the project. This project is a work-in-progress so it's not stable...and honestly, this is more of a learning exercise than anything. 

## Getting Started

These instructions will *hopefully* get you a copy of the project up and running on your local machine:

Ideally, it should be as easy as issuing `npm install`, filling in your `.env` file and `nodemon index.js` It's been tested on Linux (Debian based) and Windows 10.

-   To get the IP address location details I used the [ip2location.io](https://www.ip2location.io) API.
-   For MongoDB, Place your connection string inside the `.env` file as well. There is an `env.example` file as well.

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

`http://localhost:3000/` and upload your json file, the server will respond with ip and mac address details along with tcp/udp port numbers. Edit the functions in `packetAnalyzer.js` to get your own customize output.

Vist `http://localhost:3000/api/packetdata` for the results of the last file uploaded in HTML tabl format

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
![01-table](https://github.com/jim3/Network-Packet-Analyzer/assets/11630112/175c0de5-823e-498d-a615-bf627d8bfd7b)

![02-table](https://github.com/jim3/Network-Packet-Analyzer/assets/11630112/4316b5a3-dae5-4909-99bb-7937b3d2c1db)



### JSON Output Example

```json
{
    "ipAddresses": {
        "ipSrc": [
            "192.168.0.208",
            "108.166.149.2",
            "34.251.254.157",
            "173.194.219.127",
            "108.177.122.127",
            "3.214.247.192",
            "108.166.149.3",
            "64.233.186.127"
        ],
        "ipDst": [
            "192.168.0.114",
            "224.0.0.251",
            "108.166.149.2",
            "192.168.0.208",
            "192.168.0.3",
            "192.168.0.65",
            "192.168.0.71",
            "34.251.254.157",
            "108.166.149.3",
            "173.194.219.127",
            "108.177.122.127",
            "64.233.186.127",
            "142.250.15.127"
        ]
    },
    "ipDetails": {
        "ipSourceDetails": [
            {
                "ip": "192.168.0.208",
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
            {
                "ip": "34.251.254.157",
                "country_code": "IE",
                "country_name": "Ireland",
                "region_name": "Dublin",
                "city_name": "Dublin",
                "latitude": 53.344149,
                "longitude": -6.267249,
                "zip_code": "D8",
                "time_zone": "+01:00",
                "asn": "16509",
                "as": "Amazon.com Inc.",
                "is_proxy": false
            },
            {
                "ip": "173.194.219.127",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "California",
                "city_name": "Mountain View",
                "latitude": 37.405992,
                "longitude": -122.078515,
                "zip_code": "94043",
                "time_zone": "-07:00",
                "asn": "15169",
                "as": "Google LLC",
                "is_proxy": false
            },
            {
                "ip": "108.177.122.127",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "California",
                "city_name": "Mountain View",
                "latitude": 37.405992,
                "longitude": -122.078515,
                "zip_code": "94043",
                "time_zone": "-07:00",
                "asn": "15169",
                "as": "Google LLC",
                "is_proxy": false
            },
            {
                "ip": "3.214.247.192",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "Virginia",
                "city_name": "Ashburn",
                "latitude": 39.039474,
                "longitude": -77.491809,
                "zip_code": "20146",
                "time_zone": "-04:00",
                "asn": "14618",
                "as": "Amazon.com Inc.",
                "is_proxy": false
            },
            {
                "ip": "108.166.149.3",
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
            {
                "ip": "64.233.186.127",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "California",
                "city_name": "Mountain View",
                "latitude": 37.405992,
                "longitude": -122.078515,
                "zip_code": "94043",
                "time_zone": "-07:00",
                "asn": "15169",
                "as": "Google LLC",
                "is_proxy": false
            }
        ],
        "ipDestinationDetails": [
            {
                "ip": "192.168.0.114",
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
                "ip": "224.0.0.251",
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
            {
                "ip": "192.168.0.208",
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
                "ip": "192.168.0.3",
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
                "ip": "192.168.0.65",
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
                "ip": "192.168.0.71",
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
                "ip": "34.251.254.157",
                "country_code": "IE",
                "country_name": "Ireland",
                "region_name": "Dublin",
                "city_name": "Dublin",
                "latitude": 53.344149,
                "longitude": -6.267249,
                "zip_code": "D8",
                "time_zone": "+01:00",
                "asn": "16509",
                "as": "Amazon.com Inc.",
                "is_proxy": false
            },
            {
                "ip": "108.166.149.3",
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
            {
                "ip": "173.194.219.127",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "California",
                "city_name": "Mountain View",
                "latitude": 37.405992,
                "longitude": -122.078515,
                "zip_code": "94043",
                "time_zone": "-07:00",
                "asn": "15169",
                "as": "Google LLC",
                "is_proxy": false
            },
            {
                "ip": "108.177.122.127",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "California",
                "city_name": "Mountain View",
                "latitude": 37.405992,
                "longitude": -122.078515,
                "zip_code": "94043",
                "time_zone": "-07:00",
                "asn": "15169",
                "as": "Google LLC",
                "is_proxy": false
            },
            {
                "ip": "64.233.186.127",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "California",
                "city_name": "Mountain View",
                "latitude": 37.405992,
                "longitude": -122.078515,
                "zip_code": "94043",
                "time_zone": "-07:00",
                "asn": "15169",
                "as": "Google LLC",
                "is_proxy": false
            },
            {
                "ip": "142.250.15.127",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "California",
                "city_name": "Mountain View",
                "latitude": 37.405992,
                "longitude": -122.078515,
                "zip_code": "94043",
                "time_zone": "-07:00",
                "asn": "15169",
                "as": "Google LLC",
                "is_proxy": false
            }
        ]
    },
    "macAddresses": {
        "macSource": [
            "00:1e:a6:00:0e:f9",
            "02:10:18:84:63:f3",
            "8c:dc:d4:38:0e:52",
            "28:c8:7a:dc:06:11",
            "20:f1:9e:2c:10:fa",
            "cc:6d:a0:2e:d7:59"
        ],
        "macDestination": [
            "80:f5:03:71:f1:b9",
            "01:00:5e:00:00:fb",
            "02:10:18:84:63:f3",
            "00:1e:a6:00:0e:f9",
            "28:c8:7a:dc:06:11",
            "33:33:00:00:00:01",
            "33:33:00:00:00:16",
            "20:f1:9e:2c:10:fa",
            "cc:6d:a0:2e:d7:59"
        ]
    },
    "udpPorts": {
        "udpSource": ["5353", "58682", "53", "58689", "53987", "53985", "53961", "19305", "53962", "53984", "53986"],
        "udpDestination": [
            "5353",
            "53",
            "58682",
            "19305",
            "53987",
            "53985",
            "53961",
            "53962",
            "53984",
            "53986",
            "58689"
        ]
    },
    "tcpPorts": {
        "tcpSource": ["1071", "1067", "443", "1068", "1069", "5916"],
        "tcpDestination": ["8009", "7527", "443", "5916", "5395"]
    }
}
```

