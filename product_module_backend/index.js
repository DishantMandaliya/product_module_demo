
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { executeQuery } = require("./Configuration/dbConfig"); 

const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));


// --- GLOBAL MIDDLEWARE (Non-Body Parsing) ---
const corsOptions = {
  origin: "*", // Your frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


[
  "product",
  "dashboard",
].forEach((ctrl) => {
  try {
    const controller = require(`./Controller/${ctrl}`);
    app.use(`/${ctrl}`, controller);
    console.log(`${ctrl} controller loaded successfully`);
  } catch (err) {
    console.error(`Error loading ${ctrl} controller:`, err.message);
  }
});


//Default Path to Display API is Running or not.
app.get("/", async (req, res) => {
    res.send("Backend is Running");
});

// function to check DB connection before starting the server
async function checkDBConnection() {
  try {
    const result = await executeQuery("SELECT 1");
    if (result) {
      console.log(" MySQL Database Connected Successfully");
      return true;
    }
  } catch (err) {
    console.error(" Database Connection Failed:", err.message);
    return false;
  }
}

// Start the server only after confirming DB connection
async function startServer() {
  const dbConnected = await checkDBConnection();

  if (!dbConnected) {
    console.log(" Server not started because DB connection failed");
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(` Express server started at port ${port}`);
  });
}

startServer();



