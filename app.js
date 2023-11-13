import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import uploadsRouter from "./routes/company.js"
import { errorHandler } from "./middleware/errorHandler.js";
import applicantRouter from "./routes/applicantRoutes.js";

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.static("public"))
app.use(express.json()) //for passing incoming data fromthe client
app.use('/api/uploads', uploadsRouter);
app.use('/api/applicants', applicantRouter);

app.use(errorHandler)


const connectDb = async () => {
    try {
            mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected and ready`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Terminate the application if the database connection fails
    }
};


app.listen(PORT, () => {
  connectDb()
  console.log(`Server running on port: ${PORT}`);
});
