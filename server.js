const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

let tasks = [];

try {
  tasks = JSON.parse(fs.readFileSync('tasks.json'));
} catch (err) {
  tasks = [];
}

app.use(express.static('public'));
app.use(express.json());

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  tasks = req.body;
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
