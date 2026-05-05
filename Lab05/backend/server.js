import express from "express";
import movies from "./api/movies.route.js";

const app = express();

// Manual CORS middleware (Express 5 compatible)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.use("/api/v1/movies", movies);

app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
