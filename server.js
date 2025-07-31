const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = 'videos.json';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/videos', (req, res) => {
  const data = fs.readFileSync(DATA_FILE);
  res.json(JSON.parse(data));
});

app.post('/api/videos', (req, res) => {
  const videos = JSON.parse(fs.readFileSync(DATA_FILE));
  videos.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(videos, null, 2));
  res.json({ status: 'Video added successfully' });
});

app.put('/api/videos/:index', (req, res) => {
  const videos = JSON.parse(fs.readFileSync(DATA_FILE));
  videos[req.params.index] = req.body;
  fs.writeFileSync(DATA_FILE, JSON.stringify(videos, null, 2));
  res.json({ status: 'Video updated successfully' });
});

app.delete('/api/videos/:index', (req, res) => {
  const videos = JSON.parse(fs.readFileSync(DATA_FILE));
  videos.splice(req.params.index, 1);
  fs.writeFileSync(DATA_FILE, JSON.stringify(videos, null, 2));
  res.json({ status: 'Video deleted successfully' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
