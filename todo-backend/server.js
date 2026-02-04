const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(cors());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed");
    process.exit(1);
  }
};

connectDB();


const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);




app.get("/api/tasks", async (req, res) => {
  try {
    const taskList = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(taskList);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch tasks" });
  }
});


app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: "Task creation failed" });
  }
});


app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: "Task update failed" });
  }
});


app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Task deletion failed" });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
