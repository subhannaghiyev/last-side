const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const DB = process.env.DB_URL;

mongoose.connect(DB);

const { Schema } = mongoose;

const Coacher = new Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Coach = mongoose.model("coach", Coacher);

app.get("/coach", async (req, res) => {
  try {
    const coach = await Coach.find({});
    res.send(coach);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.post("/coach", async (req, res) => {
  try {
    const coach = req.body;
    const saveCoach = new Coach(coach)
    saveCoach.save();
    res.send(saveCoach);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.get("/coach/:id", async (req, res) => {
  try {
    const coachId = req.params.id;
    const coach = await Coach.findById(coachId);
    res.send(coach);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.delete("/coach/:id", async (req, res) => {
  try {
    const coachId = req.params.id;
    const coach = await Coach.findByIdAndDelete(coachId)
    res.send(coach);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


PORT = process.env.PORT

app.listen(PORT , ()=>{
    console.log(`Server is up on PORT : ${PORT}`);
})
