import { useState } from "react";
import ExpertPicker from "./components/ExpertPicker/ExpertPicker";
import Question from "./components/Question/Question";
import Wheel from "./components/Wheel/Wheel";
import expertsJSON from "./assets/experts.json";
import "./App.css";

function App() {
  const [mode, setMode] = useState("choose-category");
  const [currentExpert, setExpert] = useState(null);
  const [currentNonexpert, setNonexpert] = useState(null);

  const experts = expertsJSON.experts;

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Wheel</h1>
      </header>

      <main className="with-sidebar">
        <div>
          <Wheel
            mode={mode}
            experts={experts}
            selectedExpert={currentExpert}
            selectedNonexpert={currentNonexpert}
            onSpinningEnd={() => {
              setMode("question");
            }}
          />
        </div>

        <div>
          {mode === "choose-category" && (
            <ExpertPicker
              mode="choose-category"
              experts={experts}
              onSelect={(name) => {
                setExpert(name);
                setMode("choose-nonexpert");
              }}
            />
          )}
          {mode === "choose-nonexpert" && (
            <ExpertPicker
              mode="choose-nonexpert"
              experts={experts}
              selectedExpert={currentExpert}
              onSelect={(name) => {
                setNonexpert(name);
                setMode("spin");
              }}
            />
          )}
          {mode === "question" && (
            <Question
              expert={experts[currentExpert]}
              onDone={() => {
                setExpert(null);
                setNonexpert(null);
                setMode("choose-category");
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
