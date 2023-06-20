### Network Packet Analyzer (Wireshark/TShark)

A script that analyzes Tshark/Wireshark packets (JSON format). The project started after I realized you could export packet information from WireShark in JSON format. One of my favorite things to do is work with JSON so I wanted to see if I could use the data to gain insights into the network traffic of my home network.

The script is still a work in progress but currently it extracts the following data:

1. Source & Destination IP addresses

2. Source & Destination IP details (city, state, country)

3. Source & Destination MAC addresses

4. TCP & UDP source and destination port numbers

_Initially_, I just planned to just extract various data...but I decided to do a front-end (HTML/CSS) for it as well. This allows you to upload your exported Wireshark JSON where an Express server will parse the data, and respond
via JSON to the client. _In addition to that_, I created a separate Express route that returns the data to the user via an `packet.ejs` file. I still need to make it pretty but the data is there.

**TODO**: Overall, I need to improve the code, make the application more **robust** , implement better error handling (...always trying to improve my error handling) and introduce more data analysis...

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. If you want to use this project as a template for your own project, you can fork it by clicking the Fork button in the upper right corner of this page. I invite more experienced developers to take this simple project and make it better.

To get started, you will need to install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). I use nvm to manage my Node.js versions. You can find more information 
about nvm [here](https://github.com/nvm-sh/nvm). Once you have Node.js and npm installed, you can clone the repo and install the dependencies. In order to run the script, you will need to have a JSON file exported from Wireshark. You can find more information about exporting packets from Wireshark [here](https://www.wireshark.org/docs/wsug_html_chunked/ChIOExportSection.html). Lastly, in order to make the API calls for the ip address details I used [ip2location.io](https://www.ip2location.io). You can find more information about the API [here](https://www.ip2location.io/ip2location-documentation). But you can use whatever API you want.

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
        "udpSource": [
            "5353",
            "58682",
            "53",
            "58689",
            "53987",
            "53985",
            "53961",
            "19305",
            "53962",
            "53984",
            "53986"
        ],
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
