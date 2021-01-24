const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
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

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      image: "https://source.unsplash.com/collection/483251/640x360",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nemo ratione, alias animi soluta blanditiis fuga exercitationem inventore distinctio, voluptates porro quibusdam nostrum qui iure nobis perspiciatis, perferendis doloremque ullam.",
      location: `${(cities[random1000].city, cities[random1000].state)}`,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
