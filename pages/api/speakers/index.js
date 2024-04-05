const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://reyhana:reyhana@speakers.zkwm8m5.mongodb.net/";
const dbName = "Speakers";

async function getDataFromMongoDB(req, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("Speakers");

    const readSpeakerData = await collection.find().toArray();
    const speakers = readSpeakerData;

    if (speakers.length > 0) {
      res.status(200).send( speakers );
      console.log("GET /api/speakers status: 200");
    } else {
      console.log("/api/speakers error: No data found");
      res.status(404).send("No data found");
    }
  } catch (error) {
    console.log("/api/speakers error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
}

module.exports = getDataFromMongoDB;
