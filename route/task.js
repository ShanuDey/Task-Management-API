const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");

router.get("/", auth, async (req, res) => {
  try {
    // get the authenticated user email from the request
    const { email } = req.user;

    // fetch the user from the database
    const user = await User.findOne({ email });

    // respond with the available tasks
    res.status(200).json(user.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong !!" });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    // get the task string from the request
    const { date, task, status } = req.body;
    const { email } = req.user;

    // find the user from the database
    const user = await User.findOne({ email });
    // push the new task object to the tasks array
    await user.tasks.push({ date, task, status });
    // save the changed to the user document
    const updatedUser = await user.save();

    // respond with the user with the all tasks
    res.status(200).json(updatedUser.tasks);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).json({
        error: "Invalid Request !! " + error.message.split(":").pop(),
      });
    } else {
      res.status(500).json({ error: "Something went wrong !!" });
    }
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    // get the inputs from the request
    const task_id = req.params.id;
    const { email } = req.user;
    const { date, task, status } = req.body;

    // check if the task_id is present
    if (!task_id) {
      res.status(400).json({ error: "Task id is not present in the request" });
      return;
    }

    // find the user from the database
    const user = await User.findOne({ email });
    // update the requested fields
    if (date) user.tasks.id(task_id).date = new Date(date);
    if (task) user.tasks.id(task_id).task = task;
    if (status) user.tasks.id(task_id).status = status;
    // save the changed to the user document
    const updatedUser = await user.save();

    // respond with the user with the all tasks
    res.status(200).json(updatedUser.tasks);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).json({
        error: "Invalid Request !! " + error.message.split(":").pop(),
      });
    } else {
      res.status(500).json({ error: "Something went wrong !!" });
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task_id = req.params.id;
    const { email } = req.user;

    // First, find the user and check if task exists
    const user = await User.findOne({ email });
    const taskExists = user.tasks.id(task_id);
    
    if (!taskExists) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Log the tasks array before deletion
    console.log('Before deletion:', user.tasks);

    // Remove the task using filter and save
    user.tasks = user.tasks.filter(task => 
      task._id.toString() !== task_id
    );
    
    await user.save();

    // Log the tasks array after deletion
    console.log('After deletion:', user.tasks);

    res.status(200).json(user.tasks);
  } catch (error) {
    console.error('Delete operation error:', error);
    res.status(500).json({ error: "Something went wrong !!" });
  }
});

module.exports = router;
