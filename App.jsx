import React, { useState } from "react";
import IdeaVetting from "./IdeaVetting";
import PitchOptimizer from "./PitchOptimizer";

function App() {
  const [currentModule, setCurrentModule] = useState("idea");

  return (
    <div>
      <header style={{ padding: "20px", backgroundColor: "#282c34", color: "white" }}>
        <h1>Founder's Odyssey MVP</h1>
        <nav>
          <button onClick={() => setCurrentModule("idea")}>Idea Vetting</button>
          <button onClick={() => setCurrentModule("pitch")}>Pitch Optimizer</button>
        </nav>
      </header>
      <main>
        {currentModule === "idea" && <IdeaVetting />}
        {currentModule === "pitch" && <PitchOptimizer />}
      </main>
    </div>
  );
}

export default App;