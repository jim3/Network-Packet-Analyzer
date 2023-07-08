// Mongoose Schema for the 'packets` collection

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema for the database collection
const PacketSchema = new Schema({
    ipAddr: { type: [String], required: true },
    dnsArray: { type: [String], required: false },
    httpArray: { type: [String], required: false },
    macArray: { type: [String], required: false },
    udpArray: { type: [String], required: false },
    tcpArray: { type: [String], required: false },

    ipDetails: {
        ipDetailsSource: [
            {
                ip: { type: String, required: true },
                country_code: { type: String, required: true },
                country_name: { type: String, required: true },
                region_name: { type: String, required: true },
                city_name: { type: String, required: true },
                latitude: { type: Number, default: null },
                longitude: { type: Number, default: null },
                zip_code: { type: String, required: true },
                time_zone: { type: String, required: true },
                asn: { type: String, required: true },
                as: { type: String, required: true },
                is_proxy: { type: Boolean, required: true },
            },
        ],
        ipDetailsDestination: [
            {
                ip: { type: String, required: true },
                country_code: { type: String, required: true },
                country_name: { type: String, required: true },
                region_name: { type: String, required: true },
                city_name: { type: String, required: true },
                latitude: { type: Number, default: null },
                longitude: { type: Number, default: null },
                zip_code: { type: String, required: true },
                time_zone: { type: String, required: true },
                asn: { type: String, required: true },
                as: { type: String, required: true },
                is_proxy: { type: Boolean, required: true },
            },
        ],
    },
});

// "Packet" is the name of the model, "PacketSchema" is the schema, "packets" is the collection
const Packet = mongoose.model("Packet", PacketSchema, "packets");

// Export model
module.exports = Packet;
