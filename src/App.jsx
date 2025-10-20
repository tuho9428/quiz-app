import React, { useState, useCallback, useEffect } from "react";
import questionsData from "./question.json";

// --- DATA STRUCTURE FOR 300+ QUESTIONS ---
// The data is structured by category for focused practice.
const ALL_QUESTIONS_STRUCTURED = questionsData;

// --- CONFIGURATION ---
// Set the maximum number of questions per quiz session.
const QUIZ_SIZE = 20;

// --- UTILITY FUNCTIONS ---

/**
 * Shuffles an array in place and returns the shuffled array.
 * @param {Array} array
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Selects a random subset of questions from a given array.
 * @param {Array} questionPool The full array of questions for a category.
 * @param {number} size The desired number of questions.
 * @returns {Array} The subset of questions.
 */
const selectRandomQuestions = (questionPool, size) => {
  // 1. Shuffle the entire pool
  const shuffled = shuffleArray([...questionPool]);
  // 2. Select the first 'size' questions
  return shuffled.slice(0, size);
};

// --- COMPONENTS ---

// Helper component for displaying an icon
const CheckIcon = ({ color }) => (
  <svg
    className={`w-6 h-6 inline-block ${color}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {color.includes("green") ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    )}
  </svg>
);

// --- MAIN APPLICATION COMPONENT ---

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null
  const [isLocked, setIsLocked] = useState(false); // Prevents multiple answers

  // Initialize the quiz when a category is selected
  const startQuiz = useCallback((category) => {
    setSelectedCategory(category);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    const pool = ALL_QUESTIONS_STRUCTURED[category] || [];
    // Ensure we don't request more questions than are available
    const size = Math.min(QUIZ_SIZE, pool.length);
    const newQuestions = selectRandomQuestions(pool, size);
    setQuizQuestions(newQuestions);
  }, []);

  // Handler for option selection
  const handleAnswer = useCallback(
    (selectedOption) => {
      if (isLocked) return;

      // Create a mutable copy of the quizQuestions array to store the selected answer
      const updatedQuizQuestions = [...quizQuestions];
      updatedQuizQuestions[currentQuestionIndex] = {
        ...updatedQuizQuestions[currentQuestionIndex],
        selectedAnswer: selectedOption, // Store the selected option
      };
      setQuizQuestions(updatedQuizQuestions); // Update state with the selected answer

      const currentQuestion = updatedQuizQuestions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.answer;

      setIsLocked(true); // Lock selections

      if (isCorrect) {
        setScore((s) => s + 1);
        setFeedback("correct");
      } else {
        setFeedback("incorrect");
      }

      // Move to the next question after a brief delay
      setTimeout(() => {
        setFeedback(null);
        setIsLocked(false);

        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setQuizFinished(true);
        }
      }, 2000); // 1 second delay for feedback
    },
    [quizQuestions, currentQuestionIndex, isLocked]
  );

  // Handler to restart the selection process
  const restartSelection = useCallback(() => {
    setSelectedCategory(null);
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setFeedback(null);
    setIsLocked(false);
  }, []);

  // --- RENDERING LOGIC ---

  // Component to render the category selection screen
  const renderCategorySelection = () => (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Chọn một chủ đề
      </h2>
      <p className="text-gray-600 mb-8">
        Chọn một bài học có **{QUIZ_SIZE}** câu hỏi để bắt đầu luyện tập.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(ALL_QUESTIONS_STRUCTURED).map((category) => (
          <button
            key={category}
            onClick={() => startQuiz(category)}
            className="w-full text-left p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <h3 className="text-xl font-semibold text-indigo-700">
              {category}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {ALL_QUESTIONS_STRUCTURED[category].length} câu hỏi sẵn có
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  // Component to render the main quiz screen
  const renderQuiz = () => {
    if (!quizQuestions.length) return null; // Should not happen after startQuiz

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const totalQuestions = quizQuestions.length;

    // Determine the color for the answer button based on feedback
    const getOptionClass = (option) => {
      let base =
        "w-full p-4 text-left border rounded-lg shadow-md transition duration-200 transform active:scale-[0.98]";

      if (isLocked) {
        // Check if this option is the correct answer
        const isCorrectAnswer = option === currentQuestion.answer;
        // Check if this option was the one the user selected
        const isSelectedAnswer = option === currentQuestion.selectedAnswer;

        if (isCorrectAnswer) {
          // Correct answer glows green when revealed
          return `${base} bg-green-100 border-green-500 text-green-800 ring-4 ring-green-300 pointer-events-none`;
        } else if (isSelectedAnswer) {
          // User's incorrect choice glows red
          return `${base} bg-red-100 border-red-500 text-red-800 ring-4 ring-red-300 pointer-events-none`;
        }
        // All other options are dimmed when locked
        return `${base} bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed`;
      }

      // Default state
      return `${base} bg-white hover:bg-indigo-50 border-gray-300 text-gray-700 hover:border-indigo-400`;
    };

    return (
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center text-sm font-medium text-indigo-700 bg-indigo-50 p-3 rounded-xl shadow-inner">
          <p>Đề tài: {selectedCategory}</p>
          <p>
            Câu hỏi {currentQuestionIndex + 1} của {totalQuestions}
          </p>
        </div>

        {/* Real-time Feedback Message */}
        {false ? (
          <div
            className={`mt-6 text-center py-3 px-4 rounded-xl font-bold transition duration-300 ease-in-out transform shadow-lg
                ${
                  feedback === "correct"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
          >
            {feedback === "correct"
              ? "✅ Đúng rồi! Tiếp nào..."
              : "❌ Sai. Cố lên nhé."}
          </div>
        ) : (
          <div
            className={`mt-6 text-center py-3 px-4 rounded-xl font-bold transition duration-300 ease-in-out transform shadow-lg}`}
          ></div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {[...currentQuestion.options].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isLocked}
                // Store a temporary key on the object to ensure the order is stable during the answer reveal
                data-option-key={option}
                className={getOptionClass(option)}
              >
                <span className="font-mono text-xs mr-3 text-indigo-500">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="font-medium">{option}</span>
                {isLocked && option === currentQuestion.answer && (
                  <CheckIcon color="text-green-500" />
                )}
                {isLocked &&
                  feedback === "incorrect" &&
                  option === currentQuestion.selectedAnswer && (
                    <CheckIcon color="text-red-500" />
                  )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Component to render the final results screen
  const renderResults = () => {
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const resultColor =
      percentage >= 70
        ? "text-green-600"
        : percentage >= 40
        ? "text-yellow-600"
        : "text-red-600";

    return (
      <div className="p-6 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Kiểm tra hoàn tất! 🎉
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Bản đã hoàn thành **{selectedCategory}**.
          </p>

          <div className={`text-6xl font-bold mb-4 ${resultColor}`}>
            {percentage}%
          </div>
          <p className="text-2xl font-semibold text-gray-700 mb-10">
            Điểm: {score} trên {totalQuestions}
          </p>

          <button
            onClick={restartSelection}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Bắt đầu lại
          </button>
        </div>
      </div>
    );
  };

  // --- Main Render Logic ---

  let content;
  if (!selectedCategory) {
    content = renderCategorySelection();
  } else if (quizFinished) {
    content = renderResults();
  } else {
    content = renderQuiz();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden">
        <main>{content}</main>
      </div>
    </div>
  );
}

export default App;
