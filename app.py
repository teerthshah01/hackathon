# app.py

from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS
from huggingface_hub import InferenceClient

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Retrieve your Hugging Face API key from the .env file
HF_API_KEY = os.getenv("HF_API_KEY")

# Initialize the Hugging Face Inference Client with the supported provider
client = InferenceClient(
    provider="hf-inference",
    api_key=HF_API_KEY
)

# Define the model name (using the available Falcon model)
MODEL_NAME = "tiiuae/falcon-7b-instruct"  # Updated model name

# Endpoint for Idea Vetting
@app.route('/api/idea-vetting', methods=['POST'])
def idea_vetting():
    data = request.get_json()
    idea = data.get('idea')
    if not idea:
        return jsonify({'error': 'Idea is required'}), 400

    # Create a prompt for idea vetting (e.g., SWOT analysis)
    prompt = f"Analyze the following startup idea and provide a brief SWOT analysis: {idea}"
    messages = [{"role": "user", "content": prompt}]

    try:
        # Call the Falcon model via Hugging Face
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            max_tokens=500,
        )
        result = completion.choices[0].message  # Adjust if needed based on response structure
        return jsonify({"result": result})
    except Exception as e:
        print("Idea Vetting Error:", e)
        return jsonify({"error": "Error processing the request", "details": str(e)}), 500

# Endpoint for Pitch Optimization
@app.route('/api/pitch-optimize', methods=['POST'])
def pitch_optimize():
    data = request.get_json()
    pitch = data.get('pitch')
    if not pitch:
        return jsonify({'error': 'Pitch is required'}), 400

    # Create a prompt for pitch optimization
    prompt = f"Improve this startup pitch text: {pitch}"
    messages = [{"role": "user", "content": prompt}]

    try:
        # Call the Falcon model via Hugging Face
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            max_tokens=500,
        )
        result = completion.choices[0].message
        return jsonify({"result": result})
    except Exception as e:
        print("Pitch Optimization Error:", e)
        return jsonify({"error": "Error processing the request", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
