import Quiz from "../models/Quizzesmodels.js";

const createQuizController = async (req, res) => {
  const { TeacherEmail, TeacherSubject, QuizeNumber, question, TimeRanges } =
    req.body;

  try {
    if (
      !TeacherEmail ||
      !TeacherSubject ||
      !QuizeNumber ||
      !question ||
      !TimeRanges
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (question.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one question is required" });
    }
    if (question.length > 30 && question.length < 1) {
      return res
        .status(400)
        .json({ message: "Maximum 30 questions are allowed and Minimun length 1" });
    }

    const newQuiz = new Quiz({
      TeacherEmail,
      TeacherSubject,
      QuizeNumber,
      question,
      TimeRanges,
    });

    await newQuiz.save();
    return res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { createQuizController };
