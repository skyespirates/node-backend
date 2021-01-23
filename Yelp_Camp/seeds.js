const mongoose = require("mongoose");
const Campground = require("./models/campground");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

Campground.insertMany([
  {
    title: "Pantai Sikabu",
    price: 150,
    description: "Sebuah pantai yang indah di panyinggahan",
    location: "Panyinggahan, Kubu Baru",
  },
  {
    title: "Jembatan Batang Tumayo",
    price: 130,
    description: "Jembatan tua penghubung Maninjau-Sungai Batang",
    location: "Sungai Batang",
  },
  {
    title: "Pantai Tiku",
    price: 150,
    description: "Pantai yang tidak ramah pengunjung, dan agak kumuh",
    location: "Tiku",
  },
  {
    title: "Puncak Lawang",
    price: 220,
    description: "Tempat yang tepat untuk melakukan paralayang",
    location: "Agam",
  },
  {
    title: "Lawang Park",
    price: 200,
    description:
      "Titik tertinggi untuk melihat danau maninjau secara keseluruhan",
    location: "Agam",
  },
  {
    title: "Jembatan Maransi",
    price: 10,
    description: "Jembatan penghubung Bayua-Maninjau",
    location: "Bayua",
  },
  {
    title: "Sarasah",
    price: 15,
    description: "Tempat yang tepat untuk refreshing dan mandi-mandi",
    location: "Gasang, Maninjau",
  },
]);
