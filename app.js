const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // If number string, treat as milliseconds
  if (/^-?\d+$/.test(date)) {
    date = parseInt(date, 10);
  }

  const d = new Date(date);

  if (d.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
