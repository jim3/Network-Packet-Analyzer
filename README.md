
### Network Packet Analyzer (Wireshark/TShark)

An app that analyzes exported Wireshark packets in JSON format [see here](https://www.wireshark.org/docs/wsug_html_chunked/ChIOExportSection.html). The project started after I realized you could export packet information from WireShark in JSON format. One of my favorite things to do lately is work with JSON so I wanted to see if I could use the data to gain insights into the network traffic of my home network.

1. Source & Destination IP details (city, state, country)

2. Source & Destination IP addresses

3. Source & Destination MAC addresses

4. TCP & UDP source and destination port numbers

There is a front-end for the app at the root endpoint `/`. This allows you to upload your exported json file. The server will parse the data, extract various data from the file and respond back to the client via JSON. In addition to that I included a way to save the results to a [MongoDB Atlas](https://www.mongodb.com/atlas) database. I used Mongoose.js as the ODM. Instead of writing to an HTML table I might try using MongoDB charts, I always wanted to see how that was done...

### Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose.js
-   JavaScript
-   EJS

## Getting Started

These instructions will hopefully get you a copy of the project up and running on your local machine. I invite more experienced developers to take this simple project and make it better. Then I can learn from you.

-   To get the IP address location details I used the [ip2location.io](https://www.ip2location.io) API. Place your API key in the `.env` file. `API_KEY=<your-api-key>`
-   To be able to write to the database place your conncection string place the following in your `.env file, substituting your username and password:<br>
    `MONGO_DB_CONNECTION_STRING=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hi0ayas.mongodb.net/?retryWrites=true&w=majority>`
-   Info on how to get your connection string is here: [MongoDB Connection String (https://www.mongodb.com/docs/guides/atlas/connection-string)


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

Open your browser and go to:

`http://localhost:3000` to upload your file and `http://localhost:3000/api/packetdata` to view the data in table format once the data is rendered.

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

