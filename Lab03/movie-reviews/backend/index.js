import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import app from "./server.js";

dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MOVIEREVIEWS_DB_URI;

if (!mongoUri) {
  console.error("Missing MOVIEREVIEWS_DB_URI in .env");
  process.exit(1);
}

const client = new MongoClient(mongoUri);

async function startServer() {
  try {
    await client.connect();
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
