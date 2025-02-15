import React, { useState } from "react";
import axios from "axios";

const PitchOptimizer = () => {
  const [pitch, setPitch] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOptimize = async () => {
    if (!pitch) {
      setError("Please enter a pitch.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/pitch-optimize", { pitch });
      setResult(response.data.result);
    } catch (err) {
      console.error("Error optimizing pitch:", err);
      setError("Error optimizing pitch. Check the backend console for details.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pitch Optimizer</h2>
      <textarea
        placeholder="Enter your pitch..."
        value={pitch}
        onChange={(e) => setPitch(e.target.value)}
        rows={6}
        cols={50}
      />
      <br />
      <button onClick={handleOptimize} disabled={loading}>
        {loading ? "Optimizing..." : "Optimize Pitch"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Optimized Pitch:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PitchOptimizer;