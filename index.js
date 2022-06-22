const express = require('express');

const app = express();

app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.statusMessage = 'person not found';
    res.status(404).end();
  }
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({ error: 'content missing' });
  }

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  if (
    phonebook.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const generatedId = Math.floor(Math.random() * 1000000);
  const person = {
    id: generatedId,
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server is listenting on port ${PORT}`);
