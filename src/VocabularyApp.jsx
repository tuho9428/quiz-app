import { useEffect, useState } from "react";
import { VOCABULARY_SETS } from "./data/civicsVocabulary";
import { CIVICS_2025_SOURCE } from "./data/civics2025Examples";

const STORAGE_KEY = "civics-vocabulary-progress-v1";
const LAST_SET_KEY = "civics-vocabulary-last-set-v1";
const ALL_WORDS = VOCABULARY_SETS.flatMap((set) => set.words);

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
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return Object.fromEntries(
      Object.entries(saved).filter(([, status]) => status === "known" || status === "review")
    );
  } catch {
    return {};
  }
};

const readLastSet = () => {
  try {
    const saved = window.localStorage.getItem(LAST_SET_KEY);
    return VOCABULARY_SETS.some((set) => set.id === saved) ? saved : null;
  } catch {
    return null;
  }
};

const buildPractice = (words) =>
  shuffle(words).map((word) => {
    const alternatives = [...words, ...ALL_WORDS]
      .filter((item) => item.id !== word.id && item.vietnamese !== word.vietnamese)
      .map((item) => item.vietnamese);
    const distinctAlternatives = [...new Set(shuffle(alternatives))].slice(0, 3);
    return { word, options: shuffle([word.vietnamese, ...distinctAlternatives]) };
  });

function VocabularyHome({ progress, lastSetId, onSelect }) {
  const known = ALL_WORDS.filter((word) => progress[word.id] === "known").length;
  const resumeSet = VOCABULARY_SETS.find((set) => set.id === lastSetId) || VOCABULARY_SETS[0];

  return (
    <>
      <section className="peony-hero">
        <div>
          <p className="peony-kicker">USCIS 2025</p>
          <h1>Học từ vựng</h1>
          <p className="peony-subtitle">Chọn một bộ từ. Học chậm, nghe lại và ôn những từ chưa nhớ.</p>
        </div>
        <div className="peony-progress-summary" aria-label="Tiến độ học từ vựng">
          <strong>{known}<span>/{ALL_WORDS.length}</span></strong>
          <p>từ đã nhớ</p>
          <div className="peony-progress-track" aria-hidden="true">
            <span style={{ width: `${(known / ALL_WORDS.length) * 100}%` }} />
          </div>
        </div>
      </section>

      <button type="button" className="peony-primary-action vocab-resume-action" onClick={() => onSelect(resumeSet.id)}>
        {lastSetId ? `Tiếp tục: ${resumeSet.vietnameseName}` : `Bắt đầu: ${resumeSet.vietnameseName}`}
      </button>

      <section className="peony-day-panel" aria-labelledby="vocab-sets-heading">
        <div className="peony-section-heading">
          <h2 id="vocab-sets-heading">Chọn bộ từ</h2>
          <span>{VOCABULARY_SETS.length} bộ</span>
        </div>
        <div className="peony-today-list vocab-set-list">
          {VOCABULARY_SETS.map((set, index) => {
            const setKnown = set.words.filter((word) => progress[word.id] === "known").length;
            return (
              <button type="button" key={set.id} onClick={() => onSelect(set.id)}>
                <span className="vocab-set-number" aria-hidden="true">{index + 1}</span>
                <span>
                  <strong>{set.vietnameseName}</strong>
                  <small>{set.name}</small>
                  <small>{set.words.length} từ, đã nhớ {setKnown}</small>
                </span>
                <span className="peony-row-action">Mở bộ</span>
              </button>
            );
          })}
        </div>
      </section>

      <p className="vocab-source-note">
        Câu hỏi tiếng Anh lấy từ USCIS 2025. Bản dịch tiếng Việt chỉ để học từ. {" "}
        <a href={CIVICS_2025_SOURCE} target="_blank" rel="noopener noreferrer">Xem bản gốc USCIS</a>
      </p>
    </>
  );
}

function SetOverview({ set, setNumber, direction, progress, onAdjacent, onDirectionChange, onStudy, onPractice, onReview }) {
  const known = set.words.filter((word) => progress[word.id] === "known").length;
  const reviewCount = set.words.filter((word) => progress[word.id] === "review").length;

  return (
    <section className="peony-day-panel vocab-set-panel">
      <div className="peony-day-controls" aria-label="Chọn bộ từ">
        <button type="button" disabled={setNumber === 1} onClick={() => onAdjacent(-1)}>Bộ trước</button>
        <strong>Bộ {setNumber} / {VOCABULARY_SETS.length}</strong>
        <button type="button" disabled={setNumber === VOCABULARY_SETS.length} onClick={() => onAdjacent(1)}>Bộ sau</button>
      </div>

      <h1>{set.vietnameseName}</h1>
      <p className="vocab-set-english">{set.name}</p>
      <p className="vocab-set-progress">{set.words.length} từ, đã nhớ {known}</p>

      <h2 className="vocab-choice-heading">Chọn cách học</h2>
      <div className="vocab-direction-choices" aria-label="Chọn chiều học">
        <button type="button" className={`peony-practice-card ${direction === "en-vi" ? "is-selected" : ""}`} aria-pressed={direction === "en-vi"} onClick={() => onDirectionChange("en-vi")}>
          <strong>Anh sang Việt</strong>
          <small>Xem từ tiếng Anh, đoán nghĩa tiếng Việt</small>
        </button>
        <button type="button" className={`peony-practice-card ${direction === "vi-en" ? "is-selected" : ""}`} aria-pressed={direction === "vi-en"} onClick={() => onDirectionChange("vi-en")}>
          <strong>Việt sang Anh</strong>
          <small>Xem nghĩa tiếng Việt, nhớ từ tiếng Anh</small>
        </button>
      </div>

      <button type="button" className="peony-primary-action" onClick={() => onStudy(false)}>
        Bắt đầu học {set.words.length} từ
      </button>

      <div className="vocab-other-actions">
        <button type="button" className="peony-secondary-action" onClick={onPractice}>Luyện chọn 4 đáp án</button>
        {reviewCount > 0 && (
          <button type="button" className="peony-secondary-action" onClick={() => onReview()}>
            Ôn {reviewCount} từ cần học lại
          </button>
        )}
      </div>
    </section>
  );
}

function Flashcard({ word, direction, flipped, status, canSpeak, onReveal, onSpeak }) {
  const front = direction === "en-vi" ? word.english : word.vietnamese;
  const answer = direction === "en-vi" ? word.vietnamese : word.english;

  return (
    <article className="vocab-flashcard" aria-live="polite">
      <p className="peony-label">{direction === "en-vi" ? "Từ tiếng Anh" : "Nghĩa tiếng Việt"}</p>
      <h2>{front}</h2>
      {canSpeak && direction === "en-vi" && !flipped && (
        <button type="button" className="peony-audio-button" onClick={onSpeak}>Nghe cách đọc</button>
      )}

      {flipped && (
        <div className="vocab-answer">
          <p className="peony-label">{direction === "en-vi" ? "Nghĩa tiếng Việt" : "Từ tiếng Anh"}</p>
          <strong>{answer}</strong>
          <p>Cách đọc gần đúng: <b>{word.pronunciation}</b></p>
          {canSpeak && <button type="button" className="peony-audio-button" onClick={onSpeak}>Nghe từ tiếng Anh</button>}

          <details key={word.id} className="vocab-example">
            <summary>Xem câu hỏi USCIS 2025</summary>
            <div>
              <p className="vocab-example-number">Câu {word.example.questionId}</p>
              <p className="vocab-example-english">{word.example.english}</p>
              <p className="vocab-example-vietnamese">{word.example.vietnamese}</p>
            </div>
          </details>
        </div>
      )}

      {status && <p className="vocab-word-status">{status === "known" ? "Đã nhớ từ này" : "Cần học lại từ này"}</p>}
      {!flipped && <button type="button" className="peony-primary-action" onClick={onReveal}>Xem nghĩa</button>}
    </article>
  );
}

function PracticeQuestion({ item, index, total, selectedAnswer, canSpeak, onSpeak, onAnswer, onNext }) {
  const isCorrect = selectedAnswer === item.word.vietnamese;

  return (
    <section className="peony-session">
      <div className="vocab-session-heading">
        <h1>Luyện chọn đáp án</h1>
        <p>Câu {index + 1} / {total}</p>
      </div>
      <div className="peony-quiz-question">
        <p className="peony-label">Từ này có nghĩa là gì?</p>
        <h2>{item.word.english}</h2>
        {canSpeak && <button type="button" className="peony-audio-button" onClick={onSpeak}>Nghe cách đọc</button>}
      </div>
      <div className="peony-options vocab-options">
        {item.options.map((option, optionIndex) => {
          const revealed = selectedAnswer !== null;
          const state = revealed && option === item.word.vietnamese
            ? "is-correct"
            : revealed && option === selectedAnswer ? "is-incorrect" : "";
          return (
            <button type="button" key={option} className={state} disabled={revealed} onClick={() => onAnswer(option)}>
              <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <div className={`peony-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`} role="status">
          <div>
            <strong>{isCorrect ? "Đúng rồi" : "Chưa đúng"}</strong>
            {!isCorrect && <small>Đáp án: {item.word.vietnamese}</small>}
          </div>
          <button type="button" onClick={onNext}>{index + 1 === total ? "Xem kết quả" : "Câu tiếp theo"}</button>
        </div>
      )}
    </section>
  );
}

function VocabularyApp({ onBack }) {
  const [progress, setProgress] = useState(readProgress);
  const [lastSetId, setLastSetId] = useState(readLastSet);
  const [screen, setScreen] = useState("home");
  const [setId, setSetId] = useState(null);
  const [direction, setDirection] = useState("en-vi");
  const [studyIds, setStudyIds] = useState([]);
  const [reviewOnly, setReviewOnly] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [practiceItems, setPracticeItems] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Study still works if browser storage is unavailable.
    }
  }, [progress]);

  useEffect(() => {
    if (!lastSetId) return;
    try {
      window.localStorage.setItem(LAST_SET_KEY, lastSetId);
    } catch {
      // The current session can still continue without storage.
    }
  }, [lastSetId]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const selectedSetIndex = VOCABULARY_SETS.findIndex((set) => set.id === setId);
  const selectedSet = VOCABULARY_SETS[selectedSetIndex];
  const studyWords = selectedSet
    ? studyIds.map((id) => selectedSet.words.find((word) => word.id === id)).filter(Boolean)
    : [];
  const canSpeak = "speechSynthesis" in window;

  const stopSpeaking = () => window.speechSynthesis?.cancel();

  const speak = (word) => {
    if (!canSpeak) return;
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const openSet = (nextSetId) => {
    stopSpeaking();
    setSetId(nextSetId);
    setLastSetId(nextSetId);
    setDirection("en-vi");
    setScreen("set");
  };

  const changeSet = (offset) => {
    const nextSet = VOCABULARY_SETS[selectedSetIndex + offset];
    if (nextSet) openSet(nextSet.id);
  };

  const goBack = () => {
    stopSpeaking();
    if (screen === "home") onBack();
    else if (screen === "set") setScreen("home");
    else setScreen("set");
  };

  const startCards = (onlyReview) => {
    const words = onlyReview
      ? selectedSet.words.filter((word) => progress[word.id] === "review")
      : selectedSet.words;
    if (!words.length) return;
    stopSpeaking();
    setStudyIds(words.map((word) => word.id));
    setReviewOnly(onlyReview);
    setCardIndex(0);
    setFlipped(false);
    setScreen("cards");
  };

  const goToCard = (index) => {
    stopSpeaking();
    if (index < 0) return;
    if (index >= studyWords.length) setScreen("study-complete");
    else {
      setCardIndex(index);
      setFlipped(false);
    }
  };

  const rateCard = (status) => {
    const word = studyWords[cardIndex];
    setProgress((current) => ({ ...current, [word.id]: status }));
    goToCard(cardIndex + 1);
  };

  const startPractice = () => {
    stopSpeaking();
    setPracticeItems(buildPractice(selectedSet.words));
    setPracticeIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setScreen("practice");
  };

  const answerPractice = (answer) => {
    if (selectedAnswer !== null) return;
    const word = practiceItems[practiceIndex].word;
    const correct = answer === word.vietnamese;
    setSelectedAnswer(answer);
    if (correct) setScore((current) => current + 1);
    setProgress((current) => ({ ...current, [word.id]: correct ? "known" : "review" }));
  };

  const nextPractice = () => {
    stopSpeaking();
    if (practiceIndex + 1 === practiceItems.length) setScreen("results");
    else {
      setPracticeIndex((index) => index + 1);
      setSelectedAnswer(null);
    }
  };

  const badge = screen === "home"
    ? `${VOCABULARY_SETS.length} bộ từ`
    : screen === "cards"
      ? `Từ ${cardIndex + 1}/${studyWords.length}`
      : screen === "practice"
        ? `Câu ${practiceIndex + 1}/${practiceItems.length}`
        : `Bộ ${selectedSetIndex + 1}`;

  return (
    <div className="peony-app vocab-app">
      <header className="peony-topbar">
        <button type="button" onClick={goBack}>
          {screen === "home" ? "← Trang chính" : screen === "set" ? "← Các bộ từ" : "← Về bộ từ"}
        </button>
        <div><strong>Từ vựng quốc tịch</strong></div>
        <span className="peony-day-badge">{badge}</span>
      </header>
      <main>
        {screen === "home" && <VocabularyHome progress={progress} lastSetId={lastSetId} onSelect={openSet} />}

        {screen === "set" && selectedSet && (
          <SetOverview
            set={selectedSet}
            setNumber={selectedSetIndex + 1}
            direction={direction}
            progress={progress}
            onAdjacent={changeSet}
            onDirectionChange={setDirection}
            onStudy={startCards}
            onPractice={startPractice}
            onReview={() => startCards(true)}
          />
        )}

        {screen === "cards" && studyWords[cardIndex] && (
          <section className="peony-session">
            <div className="vocab-session-heading">
              <h1>{selectedSet.vietnameseName}</h1>
              <p>{reviewOnly ? "Ôn từ cần học lại" : `Từ ${cardIndex + 1} / ${studyWords.length}`}</p>
            </div>
            <Flashcard
              key={`${studyWords[cardIndex].id}-${direction}`}
              word={studyWords[cardIndex]}
              direction={direction}
              flipped={flipped}
              status={progress[studyWords[cardIndex].id]}
              canSpeak={canSpeak}
              onReveal={() => setFlipped(true)}
              onSpeak={() => speak(studyWords[cardIndex].english)}
            />
            {flipped && (
              <div className="vocab-rating">
                <button type="button" className="peony-primary-action" onClick={() => rateCard("known")}>Đã nhớ, từ tiếp theo</button>
                <button type="button" className="peony-secondary-action" onClick={() => rateCard("review")}>Chưa nhớ, học lại sau</button>
              </div>
            )}
            <div className="vocab-card-navigation">
              <button type="button" disabled={cardIndex === 0} onClick={() => goToCard(cardIndex - 1)}>Từ trước</button>
              <button type="button" onClick={() => goToCard(cardIndex + 1)}>{cardIndex + 1 === studyWords.length ? "Xong" : "Từ sau"}</button>
            </div>
          </section>
        )}

        {screen === "practice" && practiceItems[practiceIndex] && (
          <PracticeQuestion
            item={practiceItems[practiceIndex]}
            index={practiceIndex}
            total={practiceItems.length}
            selectedAnswer={selectedAnswer}
            canSpeak={canSpeak}
            onSpeak={() => speak(practiceItems[practiceIndex].word.english)}
            onAnswer={answerPractice}
            onNext={nextPractice}
          />
        )}

        {screen === "study-complete" && (
          <section className="peony-complete vocab-complete">
            <p className="peony-label">Đã học xong {studyWords.length} từ</p>
            <h1>Giỏi lắm!</h1>
            <p>Bạn có thể học lại bộ này hoặc luyện chọn đáp án.</p>
            <button type="button" className="peony-primary-action" onClick={goBack}>Về bộ từ</button>
          </section>
        )}

        {screen === "results" && (
          <section className="peony-complete vocab-complete">
            <p className="peony-label">Đã lưu kết quả</p>
            <h1>Đã làm xong</h1>
            <p>Đúng {score} / {practiceItems.length} câu. Từ trả lời sai được đánh dấu để ôn lại.</p>
            <button type="button" className="peony-primary-action" onClick={goBack}>Về bộ từ</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default VocabularyApp;
