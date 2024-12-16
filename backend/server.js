// Import required modules (if not already included at the top of your file)
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Endpoint to fetch agents
app.get('/api/agents', async (req, res) => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents');
    const agents = response.data.data.filter(agent => agent.isPlayableCharacter);
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// Endpoint to fetch bundles
app.get('/api/bundles', async (req, res) => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/bundles');
    const bundles = response.data.data; // Extract bundles data
    res.json(bundles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bundles' });
  }
});

// Endpoint to fetch maps
app.get('/api/maps', async (req, res) => {
  try {
      const response = await axios.get('https://valorant-api.com/v1/maps');
      const maps = response.data.data; // Extract maps data
      res.json(maps);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch maps' });
  }
});

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
