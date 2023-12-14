import express from "express";
import enforce from "express-sslify";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import mongoose from "mongoose";
import cors from "cors";
import uploadsRouter from "./routes/company.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 81;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "default_secret";

app.use(enforce.HTTPS({ trustProtoHeader: true }));

const privateKey = fs.readFileSync("private-key.pem", "utf8");
const certificate = fs.readFileSync("certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const allowedOrigins = ['https://www.horizonhunt.co.ke', 'https://localhost:345', 'http://localhost:345'];

app.use(express.static("public"));
app.use(express.json());

app.use(cors({
  origin: async function (origin, callback) {
    try {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        throw new Error('Not allowed by CORS');
      }
    } catch (error) {
      callback(error);
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


app.options("/api/user/initial/applicantinfo", async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', 'https://localhost:345');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.use((req, res, next) => {
  console.log("Received request:", req.url);
  next();
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.use("/api/company", uploadsRouter);
app.use("/api/user", userRouter);
app.use(errorHandler);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected and ready`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exitCode = 1;
    process.exit();
  }
};

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (error) {
    console.error(`Error closing MongoDB connection: ${error.message}`);
    process.exit(1);
  }
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(HTTPS_PORT, async () => {
//await connectDb();
  console.log(`Server running on port: ${HTTPS_PORT}`);
});
