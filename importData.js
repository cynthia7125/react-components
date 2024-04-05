const mongodb = require("mongodb");
const data = require("./db.json");
const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://reyhana:reyhana@speakers.zkwm8m5.mongodb.net/"; // MongoDB connection URL
const dbName = "Speakers";
const collectionName = "Speakers";

async function importData() {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertMany(data);

    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    await client.close();
  }
}

importData();
