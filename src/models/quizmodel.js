const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
  category: { type: String },
  type: { type: String },
  difficulty: { type: String },
  question: { type: String },
  correct_answer: { type: String },
  incorrect_answers: [],
});

const Quiz = mongoose.model("quiz", QuizSchema);

module.exports = { Quiz };
