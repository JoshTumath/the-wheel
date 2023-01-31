import { useState } from "react";
import Wheel from "./components/Wheel/Wheel";
import ExpertPicker from "./components/ExpertPicker/ExpertPicker";
import experts from "./assets/experts.json";
import "./App.css";

function App() {
  const [mode, setMode] = useState("choose-category");
  const [currentExpert, setExpert] = useState(null);
  const [currentNonexpert, setNonexpert] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Wheel</h1>
      </header>

      <main className="with-sidebar">
        <div>
          <Wheel
            mode={mode}
            experts={experts.experts}
            selectedExpert={currentExpert}
            selectedNonexpert={currentNonexpert}
            onSpinningEnd={(expert) => {
              console.log("Landed on", expert);
              setMode("question");
            }}
          />
        </div>

        <div>
          {mode === "choose-category" && (
            <ExpertPicker
              mode="choose-category"
              experts={experts.experts}
              onSelect={(name) => {
                setExpert(name);
                setMode("choose-nonexpert");
              }}
            />
          )}
          {mode === "choose-nonexpert" && (
            <ExpertPicker
              mode="choose-nonexpert"
              experts={experts.experts}
              onSelect={(name) => {
                setNonexpert(name);
                setMode("spin");
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
