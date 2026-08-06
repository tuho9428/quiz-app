import { useEffect, useRef, useState } from "react";
import fallbackImage from "./assets/no-projects.png";
import {
  PEONY_CARDS,
  PEONY_CARDS_PER_DAY,
  PEONY_INSTRUCTION_PRACTICE,
  PEONY_STORAGE_KEY,
  PEONY_TOTAL_CARDS,
  PEONY_TOTAL_DAYS,
} from "./peonyVocabularyData";

const EMPTY_PROGRESS = {
  currentDay: 1,
  cards: {},
  sessions: 0,
  lastStudied: null,
};

const shuffle = (items) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

const readProgress = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(PEONY_STORAGE_KEY));
    if (!saved || typeof saved !== "object") return EMPTY_PROGRESS;

    return {
      ...EMPTY_PROGRESS,
      ...saved,
      currentDay: Math.min(
        PEONY_TOTAL_DAYS,
        Math.max(1, Number(saved.currentDay) || 1)
      ),
      cards: saved.cards && typeof saved.cards === "object" ? saved.cards : {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
};

const buildVocabularyQuestion = (card) => {
  const distractors = shuffle(
    PEONY_CARDS.filter((item) => item.id !== card.id).map((item) => item.vietnamese)
  ).filter((answer, index, answers) => answers.indexOf(answer) === index);

  return {
    id: card.id,
    prompt: card.english,
    answer: card.vietnamese,
    options: shuffle([card.vietnamese, ...distractors.slice(0, 3)]),
    cardIds: [card.id],
  };
};

const buildInstructionQuestion = (instruction) => {
  const distractors = shuffle(
    PEONY_INSTRUCTION_PRACTICE.filter((item) => item.id !== instruction.id).map(
      (item) => item.vietnamese
    )
  ).filter((answer, index, answers) => answers.indexOf(answer) === index);

  const cardIds = instruction.cardIds
    .map((suffix) => PEONY_CARDS.find((card) => card.id.endsWith(`-${suffix}`))?.id)
    .filter(Boolean);

  return {
    id: `instruction-${instruction.id}`,
    prompt: instruction.english,
    answer: instruction.vietnamese,
    options: shuffle([instruction.vietnamese, ...distractors.slice(0, 3)]),
    cardIds,
  };
};

function CardImage({ card }) {
  const [source, setSource] = useState(card.imagePath);

  useEffect(() => {
    setSource(card.imagePath);
  }, [card.imagePath]);

  return (
    <div className="peony-card-image-wrap">
      <img
        src={source}
        alt={source === fallbackImage ? `Hình minh họa cho ${card.vietnamese}` : card.imageAlt}
        className="peony-card-image"
        onError={() => setSource(fallbackImage)}
      />
      {source === fallbackImage && (
        <span className="peony-image-note">Hình minh họa: {card.vietnamese}</span>
      )}
    </div>
  );
}

function PeonyVocabularyApp({ onBack }) {
  const [progress, setProgress] = useState(readProgress);
  const [screen, setScreen] = useState("home");
  const [selectedDay, setSelectedDay] = useState(() => readProgress().currentDay);
  const [studyQueue, setStudyQueue] = useState([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [studyLabel, setStudyLabel] = useState("");
  const [advanceAfterStudy, setAdvanceAfterStudy] = useState(false);
  const [quizItems, setQuizItems] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizLabel, setQuizLabel] = useState("");
  const [completedSummary, setCompletedSummary] = useState(null);
  const quizFeedbackRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(PEONY_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Study still works when storage is unavailable or full.
    }
  }, [progress]);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    if (quizAnswer) {
      quizFeedbackRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [quizAnswer]);

  const dayCards = PEONY_CARDS.filter((card) => card.day === selectedDay);
  const learnedCards = PEONY_CARDS.filter(
    (card) => progress.cards[card.id]?.reviews > 0
  );
  const missedCards = PEONY_CARDS.filter(
    (card) => progress.cards[card.id]?.lastResult === "incorrect"
  );

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const recordResult = (cardIds, isCorrect) => {
    if (!cardIds.length) return;

    setProgress((current) => {
      const nextCards = { ...current.cards };
      cardIds.forEach((cardId) => {
        const cardProgress = nextCards[cardId] || {
          reviews: 0,
          correct: 0,
          incorrect: 0,
          lastResult: null,
        };
        nextCards[cardId] = {
          ...cardProgress,
          reviews: cardProgress.reviews + 1,
          correct: cardProgress.correct + (isCorrect ? 1 : 0),
          incorrect: cardProgress.incorrect + (isCorrect ? 0 : 1),
          lastResult: isCorrect ? "correct" : "incorrect",
          lastReviewed: new Date().toISOString(),
        };
      });

      return {
        ...current,
        cards: nextCards,
        lastStudied: new Date().toISOString(),
      };
    });
  };

  const finishSession = (summary) => {
    setProgress((current) => ({
      ...current,
      sessions: current.sessions + 1,
      lastStudied: new Date().toISOString(),
    }));
    setCompletedSummary(summary);
    setScreen("complete");
  };

  const startFlashcards = (cards, label, shouldAdvance = false) => {
    if (!cards.length) return;
    window.speechSynthesis?.cancel();
    setStudyQueue(cards.map((card) => card.id));
    setStudyIndex(0);
    setStudyLabel(label);
    setAdvanceAfterStudy(shouldAdvance);
    setScreen("flashcards");
  };

  const nextFlashcard = () => {
    const cardId = studyQueue[studyIndex];
    recordResult([cardId], true);

    if (studyIndex + 1 >= studyQueue.length) {
      setProgress((current) => ({
        ...current,
        currentDay: advanceAfterStudy
          ? Math.min(
              PEONY_TOTAL_DAYS,
              Math.max(current.currentDay, selectedDay + 1)
            )
          : current.currentDay,
        sessions: current.sessions + 1,
        lastStudied: new Date().toISOString(),
      }));
      if (advanceAfterStudy) {
        setSelectedDay((day) => Math.min(PEONY_TOTAL_DAYS, day + 1));
      }
      setScreen("home");
      return;
    }

    setStudyIndex((index) => index + 1);
  };

  const startQuiz = (cards, label, testEveryCard = false) => {
    if (!cards.length) return;
    const shuffledCards = shuffle(cards);
    const selectedCards = testEveryCard
      ? shuffledCards
      : shuffledCards.slice(0, 10);
    const questions = selectedCards.map(buildVocabularyQuestion);
    setQuizItems(questions);
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizLabel(label);
    setScreen("quiz");
  };

  const startInstructionQuiz = () => {
    setQuizItems(shuffle(PEONY_INSTRUCTION_PRACTICE).map(buildInstructionQuestion));
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizLabel("Luyện đọc phiếu bếp");
    setScreen("quiz");
  };

  const answerQuiz = (answer) => {
    if (quizAnswer) return;
    const currentQuestion = quizItems[quizIndex];
    const isCorrect = answer === currentQuestion.answer;
    setQuizAnswer(answer);
    recordResult(currentQuestion.cardIds, isCorrect);

    if (isCorrect) {
      setQuizScore((score) => score + 1);
      return;
    }

    const appearances = quizItems.filter((item) => item.id === currentQuestion.id).length;
    if (appearances < 3) {
      setQuizItems((items) => {
        const nextItems = [...items];
        const repeated = currentQuestion.id.startsWith("instruction-")
          ? buildInstructionQuestion(
              PEONY_INSTRUCTION_PRACTICE.find(
                (item) => `instruction-${item.id}` === currentQuestion.id
              )
            )
          : buildVocabularyQuestion(
              PEONY_CARDS.find((card) => card.id === currentQuestion.id)
            );
        nextItems.splice(Math.min(quizIndex + 3, nextItems.length), 0, repeated);
        return nextItems;
      });
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex + 1 >= quizItems.length) {
      finishSession({
        title: "Đã làm xong",
        detail: `Bạn trả lời đúng ${quizScore} câu ngay lần đầu. Câu sai đã được hỏi lại.`,
      });
      return;
    }
    setQuizIndex((index) => index + 1);
    setQuizAnswer(null);
  };

  const resetProgress = () => {
    if (!window.confirm("Xóa toàn bộ kết quả học trên máy này?")) return;
    setProgress(EMPTY_PROGRESS);
    setSelectedDay(1);
  };

  const goHome = () => {
    window.speechSynthesis?.cancel();
    setScreen("home");
    setCompletedSummary(null);
  };

  const renderHome = () => (
    <>
      <section className="peony-hero">
        <div>
          <p className="peony-kicker">Mỗi ngày học tối đa {PEONY_CARDS_PER_DAY} từ</p>
          <h1>Tiếng Anh chuẩn bị bếp</h1>
          <p className="peony-subtitle">
            Học chậm, nghe rõ, và ôn lại những từ chưa nhớ.
          </p>
        </div>
        <div className="peony-progress-summary" aria-label="Tiến độ học">
          <strong>{learnedCards.length}<span>/{PEONY_TOTAL_CARDS}</span></strong>
          <p>từ đã học</p>
          <div className="peony-progress-track" aria-hidden="true">
            <span
              style={{
                width: `${(learnedCards.length / PEONY_TOTAL_CARDS) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="peony-day-panel" aria-labelledby="day-heading">
        <div className="peony-day-controls" aria-label="Chọn ngày học">
          <button
            type="button"
            disabled={selectedDay === 1}
            onClick={() => setSelectedDay((day) => Math.max(1, day - 1))}
          >
            Ngày trước
          </button>
          <strong>Ngày {selectedDay} / {PEONY_TOTAL_DAYS}</strong>
          <button
            type="button"
            disabled={selectedDay === PEONY_TOTAL_DAYS}
            onClick={() =>
              setSelectedDay((day) => Math.min(PEONY_TOTAL_DAYS, day + 1))
            }
          >
            Ngày sau
          </button>
        </div>
        <div className="peony-section-heading">
          <h2 id="day-heading">Từ của ngày này</h2>
          <span>
            {dayCards.filter((card) => progress.cards[card.id]?.reviews).length} / {dayCards.length} đã học
          </span>
        </div>

        <div className="peony-today-list">
          {dayCards.map((card) => {
            const state = progress.cards[card.id]?.lastResult;
            return (
              <button
                type="button"
                key={card.id}
                onClick={() => startFlashcards([card], card.english)}
              >
                <span className={`peony-status ${state ? `is-${state}` : ""}`} aria-hidden="true" />
                <span><strong>{card.english}</strong><small>{card.vietnamese}</small></span>
                <span className="peony-row-action">Học</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="peony-primary-action"
          onClick={() => startFlashcards(dayCards, `Ngày ${selectedDay}`, true)}
        >
          Bắt đầu học {dayCards.length} từ
        </button>
      </section>

      <section className="peony-practice-grid" aria-labelledby="practice-heading">
        <div className="peony-section-heading">
          <h2 id="practice-heading">Luyện tập</h2>
        </div>
        <button
          type="button"
          className="peony-practice-card"
          onClick={() => startQuiz(dayCards, `Kiểm tra ngày ${selectedDay}`)}
        >
          <strong>Kiểm tra 4 đáp án</strong>
          <small>Kiểm tra ba từ của ngày {selectedDay}</small>
        </button>
        <button type="button" className="peony-practice-card" onClick={startInstructionQuiz}>
          <strong>Luyện đọc phiếu bếp</strong>
          <small>Ví dụ: (M) chicken, Last: green onion</small>
        </button>
        <button
          type="button"
          className="peony-practice-card"
          onClick={() =>
            startFlashcards(shuffle(learnedCards), "Ôn các từ đã học")
          }
          disabled={!learnedCards.length}
        >
          <strong>Ôn các từ đã học</strong>
          <small>
            {learnedCards.length
              ? `${learnedCards.length} từ đã học`
              : "Học một bài trước để mở phần này"}
          </small>
        </button>
        <button
          type="button"
          className="peony-practice-card"
          onClick={() => startFlashcards(PEONY_CARDS, "Học tất cả từ")}
        >
          <strong>Học tất cả từ</strong>
          <small>{PEONY_TOTAL_CARDS} từ trong bộ này</small>
        </button>
        <button
          type="button"
          className="peony-practice-card"
          onClick={() =>
            startQuiz(
              learnedCards,
              "Kiểm tra các từ đã học",
              true
            )
          }
          disabled={!learnedCards.length}
        >
          <strong>Kiểm tra các từ đã học</strong>
          <small>
            {learnedCards.length
              ? `${learnedCards.length} câu hỏi`
              : "Học một bài trước để mở phần này"}
          </small>
        </button>
        <button
          type="button"
          className="peony-practice-card"
          onClick={() =>
            startQuiz(PEONY_CARDS, "Kiểm tra tất cả từ", true)
          }
        >
          <strong>Kiểm tra tất cả từ</strong>
          <small>{PEONY_TOTAL_CARDS} câu hỏi</small>
        </button>
        <button
          type="button"
          className="peony-practice-card"
          onClick={() => startFlashcards(missedCards, "Ôn từ chưa nhớ")}
          disabled={!missedCards.length}
        >
          <strong>Ôn từ chưa nhớ</strong>
          <small>{missedCards.length ? `Có ${missedCards.length} từ cần ôn lại` : "Hiện không có từ nào cần ôn"}</small>
        </button>
      </section>

      <footer className="peony-footer">
        <p>Đã hoàn thành {progress.sessions} lần học.</p>
        <button type="button" onClick={resetProgress}>Xóa kết quả học</button>
      </footer>
    </>
  );

  const renderFlashcards = () => {
    const card = PEONY_CARDS.find((item) => item.id === studyQueue[studyIndex]);
    if (!card) return null;

    return (
      <section className="peony-session">
        <div className="peony-session-bar">
          <button type="button" onClick={goHome}>Thoát</button>
          <p>{studyLabel}</p>
          <span>Từ {studyIndex + 1} / {studyQueue.length}</span>
        </div>
        <div className="peony-flashcard">
          <CardImage card={card} />
          <div className="peony-flashcard-copy">
            <p className="peony-label">Từ tiếng Anh</p>
            <h2>{card.english}</h2>
            <div className="peony-answer-reveal">
              <p className="peony-label">Tiếng Việt</p>
              <strong>{card.vietnamese}</strong>
              <small>{card.exampleEnglish}</small>
            </div>
            <button type="button" className="peony-audio-button" onClick={() => speak(card.audioText)}>
              Nghe cách đọc
            </button>
          </div>
        </div>
        <button type="button" className="peony-primary-action" onClick={nextFlashcard}>
          {studyIndex + 1 >= studyQueue.length ? "Xong" : "Tiếp theo"}
        </button>
      </section>
    );
  };

  const renderQuiz = () => {
    const question = quizItems[quizIndex];
    if (!question) return null;
    const wasCorrect = quizAnswer === question.answer;

    return (
      <section className="peony-session">
        <div className="peony-session-bar">
          <button type="button" onClick={goHome}>Thoát</button>
          <p>{quizLabel}</p>
          <span>Câu {quizIndex + 1} / {quizItems.length}</span>
        </div>
        <div className="peony-quiz-question">
          <p className="peony-label">Chọn nghĩa tiếng Việt đúng</p>
          <h2>{question.prompt}</h2>
          <button type="button" className="peony-audio-button" onClick={() => speak(question.prompt)}>
            Nghe cách đọc
          </button>
        </div>
        {quizAnswer && (
          <div
            ref={quizFeedbackRef}
            className={`peony-feedback ${wasCorrect ? "is-correct" : "is-incorrect"}`}
            role="status"
          >
            <div>
              <strong>{wasCorrect ? "Đúng rồi" : "Chưa đúng, câu này sẽ hỏi lại"}</strong>
              {!wasCorrect && <small>Đáp án đúng: {question.answer}</small>}
            </div>
            <button type="button" onClick={nextQuizQuestion}>
              {quizIndex + 1 >= quizItems.length ? "Xem kết quả" : "Câu tiếp theo"}
            </button>
          </div>
        )}
        <div className="peony-options">
          {question.options.map((option, index) => {
            const isAnswer = option === question.answer;
            const isSelected = option === quizAnswer;
            let stateClass = "";
            if (quizAnswer && isAnswer) stateClass = "is-correct";
            else if (quizAnswer && isSelected) stateClass = "is-incorrect";

            return (
              <button
                type="button"
                key={option}
                className={stateClass}
                onClick={() => answerQuiz(option)}
                disabled={Boolean(quizAnswer)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            );
          })}
        </div>
      </section>
    );
  };

  const renderComplete = () => (
    <section className="peony-complete">
      <p className="peony-label">Đã lưu kết quả</p>
      <h2>{completedSummary?.title}</h2>
      <p>{completedSummary?.detail}</p>
      <button type="button" className="peony-primary-action" onClick={goHome}>Về trang học</button>
    </section>
  );

  return (
    <div className="peony-app">
      <header className="peony-topbar">
        <button type="button" onClick={screen === "home" ? onBack : goHome}>
          {screen === "home" ? "Quay lại" : "Về trang học"}
        </button>
        <div>
          <strong>Tiếng Anh nhà bếp</strong>
        </div>
        <span className="peony-day-badge">Ngày {progress.currentDay}</span>
      </header>
      <main>
        {screen === "home" && renderHome()}
        {screen === "flashcards" && renderFlashcards()}
        {screen === "quiz" && renderQuiz()}
        {screen === "complete" && renderComplete()}
      </main>
    </div>
  );
}

export default PeonyVocabularyApp;
