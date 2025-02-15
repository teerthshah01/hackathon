import React, { useState } from "react";
import axios from "axios";

const IdeaVetting = () => {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!idea) {
      setError("Please enter an idea.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/idea-vetting", { idea });
      setResult(response.data.result);
    } catch (err) {
      console.error("Error fetching analysis:", err);
      setError("Error fetching analysis. Check the backend console for details.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Startup Idea Vetting</h2>
      <textarea
        placeholder="Enter your startup idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        rows={6}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Get Analysis"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Analysis:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default IdeaVetting;