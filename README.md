### Packet Analyzer - JavaScript

A script that analyzes Tshark/Wireshark packets (JSON format). The project started after I realized you could export packet information from WireShark in JSON format. One of my favorite things to do is working with JSON so I wanted to see if I could use the data to gain insights into the network traffic of my home network.

The script is still a work in progress but currently it can analyze the following:

1. Source & Destination IP addresses

2. Source & Destination IP details (city, state, country)

3. Source & Destination MAC addresses

4. TCP & UDP source and destination port numbers

_Initially_, I just planned to just extract various data...but I decided to do a front-end (HTML/CSS) for it as well. This allows you to upload your exported Wireshark JSON where an Express server will parse the data, and respond
via JSON to the client. _In addition to that_, I creeated a separate Express route that will returns the data to a `.ejs` file. I still need to make it pretty but the data is there!

**TODO**: Make the application more **robust**, implement better error handling (always trying to get better that), and introduce more data analysis...maybe include other types data. Lately, I've been curious about VOIP technology and telephony development so maybe I'll look into that when I have time...

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. If you want to use this project as a template for your own project, you can fork it by clicking the Fork button in the upper right corner of this page. I invite more experienced developers to take this simple project and make it better.

### Installation

Clone the repo

```bash
git clone https://github.com/jim3/Packet-Analyzer.git
```

Install dependencies

```bash
npm install
```

### Usage

Run the script

```bash
node index.js
```

## Built With

-   [Node.js](https://nodejs.org/en/) - JavaScript runtime
-   [npm](https://www.npmjs.com/) - Package manager
-   [WireShark](https://www.wireshark.org/) - Network protocol analyzer
-   [JSON](https://www.json.org/) - Data format
-   [JavaScript](https://learnjavascript.online/) - Programming language
-   [Visual Studio Code](https://code.visualstudio.com/) - Code editor

## Example JSON Output

```json
{
    "ipAddresses": {
        "ipSource": {
            "192.168.0.142": "ip.src",
            "108.166.149.2": "ip.src",
            "20.221.80.166": "ip.src",
            "192.168.0.205": "ip.src"
        },
        "ipDestination": {
            "108.166.149.2": "ip.dst",
            "192.168.0.142": "ip.dst",
            "20.221.80.166": "ip.dst",
            "192.168.0.255": "ip.dst"
        }
    },
    "ipDetails": {
        "ipSourceDetails": [
            {
                "ip": "192.168.0.142",
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
                "ip": "20.221.80.166",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "Iowa",
                "city_name": "Des Moines",
                "latitude": 41.60045,
                "longitude": -93.609114,
                "zip_code": "50301",
                "time_zone": "-05:00",
                "asn": "8075",
                "as": "Microsoft Corporation",
                "is_proxy": false
            },
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
            }
        ],
        "ipDestinationDetails": [
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
                "ip": "192.168.0.142",
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
                "ip": "20.221.80.166",
                "country_code": "US",
                "country_name": "United States of America",
                "region_name": "Iowa",
                "city_name": "Des Moines",
                "latitude": 41.60045,
                "longitude": -93.609114,
                "zip_code": "50301",
                "time_zone": "-05:00",
                "asn": "8075",
                "as": "Microsoft Corporation",
                "is_proxy": false
            },
            {
                "ip": "192.168.0.255",
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
            }
        ]
    },
    "macAddresses": {
        "macSource": [
            "02:10:18:84:63:f3",
            "8c:dc:d4:38:0e:52",
            "dc:e9:94:02:e7:6d",
            "fc:f1:36:c7:35:80",
            "34:17:eb:dc:d2:f9"
        ],
        "macDestination": [
            "33:33:00:00:00:01",
            "33:33:00:00:00:16",
            "ff:ff:ff:ff:ff:ff",
            "02:10:18:84:63:f3",
            "8c:dc:d4:38:0e:52",
            "33:33:00:00:00:fb"
        ]
    },
    "udpPorts": {
        "udpSource": ["45366", "53", "5353", "51327", "51329"],
        "udpDestination": ["53", "45366", "5353", "59870"]
    },
    "tcpPorts": {
        "tcpSource": ["443", "58312"],
        "tcpDestination": ["58312", "443"]
    }
}
```
