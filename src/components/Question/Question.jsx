import { useEffect, useState } from "react";
import "./Question.css";

function SelectedQuestion({ question, onDone }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    if (selectedAnswer === null) {
      return;
    }

    setTimeout(() => {
      setShowCorrectAnswer(true);
    }, 5000);
  }, [selectedAnswer]);

  useEffect(() => {
    if (!showCorrectAnswer) {
      return;
    }

    setTimeout(() => {
      onDone();
    }, 5000);
  }, [showCorrectAnswer, onDone]);

  return (
    <div>
      <h2 className="heading">{question.label}</h2>

      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul role="list" className="stack">
        {question.answers.map((answer, index) => (
          <li key={answer.label}>
            <button
              type="button"
              disabled={Boolean(selectedAnswer)}
              className={`button ${
                selectedAnswer === index ? "selected" : ""
              } ${showCorrectAnswer && answer.isCorrect ? "correct" : ""}`}
              onClick={() => {
                setSelectedAnswer(index);
              }}
            >
              {answer.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Question({ expert, onDone }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  if (!selectedQuestion) {
    return (
      <div>
        <h2 className="heading">{expert.category}</h2>

        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul role="list" className="stack">
          {expert.questions.map((question, index) => (
            <li key={question.label}>
              <button
                type="button"
                className="button"
                onClick={() => {
                  setSelectedQuestion(question);
                }}
              >
                Question {index + 1}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="button"
          onClick={() => {
            onDone();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <SelectedQuestion
      question={selectedQuestion}
      onDone={() => {
        onDone();
      }}
    />
  );
}

export default Question;
