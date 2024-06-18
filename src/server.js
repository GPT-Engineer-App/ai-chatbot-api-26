const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ideas = [
  { name: "Idea 1", typeOfBusiness: "SaaS", monetization: "Subscription", domain: "idea1.com" },
  { name: "Idea 2", typeOfBusiness: "E-commerce", monetization: "Sales", domain: "idea2.com" },
  { name: "Idea 3", typeOfBusiness: "Marketplace", monetization: "Commission", domain: "idea3.com" },
];

app.get("/api/ideas", (req, res) => {
  res.json(ideas);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});