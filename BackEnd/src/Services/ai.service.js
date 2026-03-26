const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateResponse(content) {
  try {
    const currentDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const lowerText = content.toLowerCase();

    // ✅ Smart detection
    if (
      lowerText.includes("date") ||
      lowerText.includes("time") ||
      lowerText.includes("today") ||
      lowerText.includes("day")
    ) {
      return `Current date and time is ${currentDate}`;
    }

    // ✅ Strong system prompt
    const prompt = `
You are a helpful AI assistant.

Rules:
- Always use the provided current date and time.
- Do NOT guess dates.
- User is in India (IST timezone).

Current date and time: ${currentDate}

User: ${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Something went wrong";
  }
}
async function generateVectors(content) {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: content,
      config: {
        outputDimensionality: 768,
      },
    });

    return response.embeddings[0].values;
  } catch (error) {
    console.error("Embedding Error : ", error);
  }
}

module.exports = {
  generateResponse,
  generateVectors,
};
