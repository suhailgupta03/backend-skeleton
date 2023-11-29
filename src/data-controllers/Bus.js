class Bus {

    constructor(client) {
        this.colllectionName = "bus";
        this.database = client.db(this.colllectionName);
        this.collection = this.database.collection(this.colllectionName);
    }

    async createBus(bus) {
       return this.collection.insertOne(bus);
    }

    async getBus(busId) {
        return this.collection.findOne({busId});
    }
}

module.exports = Bus;