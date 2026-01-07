const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const chatgptIndex = pc.index("cohortchatgpt");

async function createMemory({ vector, messageID, metadata }) {
  await chatgptIndex.upsert([
    {
      id: messageID,
      values: vector,
      metadata,
    },
  ]);
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
  const data = await chatgptIndex.query({
    vector: queryVector,
    topK: limit,
    filter: metadata ? { metadata } : undefined,
    includeMetadata: true,
  });

  return data.matches;
}

module.exports = {
  createMemory,
  queryMemory,
};
