const express = require("express");
const cors = require("cors");
const app = express();

// Use CORS Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your actual frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// OR Allow All Origins (Temporary Fix)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
