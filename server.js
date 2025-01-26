require('dotenv').config();
const express = require('express');
const path = require('path');
const { handler } = require('./api/chat');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.static('.'));

// serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// chat api endpoint
app.post('/api/chat', async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('server error:', error);
    res.status(500).json({ error: 'internal server error' });
  }
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
}); 