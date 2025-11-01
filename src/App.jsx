import React, { useState, useCallback } from "react";
import set1 from "./set1.json";
import set2 from "./set2.json";
import set3 from "./set3.json";
import set4 from "./set4.json";

// --- DATA STRUCTURE ---
// Each set is an object with multiple categories.
const QUESTION_SETS = {
  "Bộ đề 1": set1,
  "Bộ đề 2": set2,
  "Bộ đề 3": set3,
  "Bộ đề 4": set4,
};

const QUIZ_SIZE = 20;

// --- UTILITY FUNCTIONS ---
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const selectRandomQuestions = (questionPool, size) => {
  const shuffled = shuffleArray([...questionPool]);
  return shuffled.slice(0, size);
};

// --- ICON COMPONENT ---
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

// --- MAIN COMPONENT ---
function App() {
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  // --- HANDLERS ---
  const startQuiz = useCallback(
    (category) => {
      setSelectedCategory(category);
      setQuizFinished(false);
      setCurrentQuestionIndex(0);
      setScore(0);

      const pool = QUESTION_SETS[selectedSet][category] || [];
      const size = Math.min(QUIZ_SIZE, pool.length);
      const newQuestions = selectRandomQuestions(pool, size);

      // 👇 Shuffle options for each question here
      const randomizedQuestions = newQuestions.map((q) => ({
        ...q,
        options: shuffleArray([...q.options]),
      }));

      setQuizQuestions(randomizedQuestions);
    },
    [selectedSet]
  );

  const handleAnswer = useCallback(
    (selectedOption) => {
      if (isLocked) return;

      const updatedQuizQuestions = [...quizQuestions];
      updatedQuizQuestions[currentQuestionIndex] = {
        ...updatedQuizQuestions[currentQuestionIndex],
        selectedAnswer: selectedOption,
      };
      setQuizQuestions(updatedQuizQuestions);

      const currentQuestion = updatedQuizQuestions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.answer;

      setIsLocked(true);

      if (isCorrect) {
        setScore((s) => s + 1);
        setFeedback("correct");
      } else {
        setFeedback("incorrect");
      }
    },
    [quizQuestions, currentQuestionIndex, isLocked]
  );

  const restartSelection = useCallback(({ setName }) => {
    setSelectedSet(setName);
    setSelectedCategory(null);
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setFeedback(null);
    setIsLocked(false);
  }, []);

  // --- UI COMPONENTS ---
  const renderSetSelection = () => (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Chọn bộ đề luyện tập
      </h2>
      <p className="text-gray-600 mb-8">
        Mỗi bộ đề gồm nhiều chủ đề khác nhau.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(QUESTION_SETS).map((setName) => (
          <button
            key={setName}
            onClick={() => setSelectedSet(setName)}
            className="w-full text-left p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-indigo-700">{setName}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {Object.keys(QUESTION_SETS[setName]).length} chủ đề
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCategorySelection = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Chọn một chủ đề
        </h2>
        <button
          onClick={() => setSelectedSet(null)}
          className="text-sm text-indigo-600 underline"
        >
          ← Trở lại bộ đề
        </button>
      </div>

      <p className="text-gray-600 mb-8">
        Mỗi bài gồm {QUIZ_SIZE} câu hỏi ngẫu nhiên.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(QUESTION_SETS[selectedSet]).map((category) => (
          <button
            key={category}
            onClick={() => startQuiz(category)}
            className="w-full text-left p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-indigo-700">
              {category}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {QUESTION_SETS[selectedSet][category].length} câu hỏi
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const totalQuestions = quizQuestions.length;

    const getOptionClass = (option) => {
      let base =
        "w-full p-4 text-left border rounded-lg shadow-md transition duration-200 transform active:scale-[0.98]";
      if (isLocked) {
        const isCorrectAnswer = option === currentQuestion.answer;
        const isSelectedAnswer = option === currentQuestion.selectedAnswer;
        if (isCorrectAnswer)
          return `${base} bg-green-100 border-green-500 text-green-800 ring-4 ring-green-300 pointer-events-none`;
        if (isSelectedAnswer)
          return `${base} bg-red-100 border-red-500 text-red-800 ring-4 ring-red-300 pointer-events-none`;
        return `${base} bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed`;
      }
      return `${base} bg-white hover:bg-indigo-50 border-gray-300 text-gray-700 hover:border-indigo-400`;
    };

    const handleNextQuestion = () => {
      setFeedback(null);
      setIsLocked(false);

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setQuizFinished(true);
      }
    };

    return (
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center text-sm font-medium text-indigo-700 bg-indigo-50 p-3 rounded-xl shadow-inner">
          <p>
            {selectedSet} → {selectedCategory}
          </p>
          <p>
            Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm text-indigo-600 underline"
          >
            ← Trở lại chủ đề
          </button>
        </div>
        {feedback && (
          <div
            className={`mt-4 text-center py-3 px-4 rounded-xl font-bold shadow-lg ${
              feedback === "correct" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {feedback === "correct"
              ? "✅ Đúng rồi. Tuyệt vời!"
              : "❌ Sai rồi, cố lên nhé!"}
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-6">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isLocked}
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

        {isLocked && (
          <div className="mt-6 text-center">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Câu hỏi tiếp theo
            </button>
          </div>
        )}
      </div>
    );
  };

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
            Hoàn tất! 🎉
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Bạn đã hoàn thành <strong>{selectedCategory}</strong> trong{" "}
            <strong>{selectedSet}</strong>.
          </p>

          <div className={`text-6xl font-bold mb-4 ${resultColor}`}>
            {percentage}%
          </div>
          <p className="text-2xl font-semibold text-gray-700 mb-10">
            Điểm: {score} / {totalQuestions}
          </p>

          <button
            onClick={() => restartSelection({ setName: selectedSet })}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Quay lại để chọn chủ đề khác
          </button>
        </div>
      </div>
    );
  };

  // --- MAIN RENDER LOGIC ---
  let content;
  if (!selectedSet) content = renderSetSelection();
  else if (!selectedCategory) content = renderCategorySelection();
  else if (quizFinished) content = renderResults();
  else content = renderQuiz();

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden">
        <main>{content}</main>
      </div>
    </div>
  );
}

export default App;
