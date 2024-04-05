const express = require("express");
const getDataFromMongoDB = require("../pages/api/speakers/index");

const app = express();

app.get("/api/speakers", async (req, res) => {
  try {
    await getDataFromMongoDB(res);
        console.log("GET /api/speakers status: 200");
  } catch (error) {
    console.error("Error handling /api/speakers request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(() => {
  console.log(`Server is running on http://localhost:3000/api/speakers`);
});
