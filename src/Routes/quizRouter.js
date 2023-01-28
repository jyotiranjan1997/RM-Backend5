const express = require("express");
const { Quiz } = require("../models/quizmodel");
const quizRouter = express.Router();

quizRouter.get("/", async (req, res) => {
  const { category, difficulty, limit } = req.query;

  try {
    let quizs = await Quiz.find({ category, difficulty }).limit(limit);
    res.send({ msg: " quizes are added", quizs });
  } catch (err) {
    res.status(500).send({ msg: "failed to get quizs" });
  }
});

module.exports = { quizRouter };
