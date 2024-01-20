const express = require('express');
const fs = require('fs');

const app = express();

function readCounter() {
  try {
    const data = fs.readFileSync('counter.json');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка чтения:', error);
    return {};
  }
}

function saveCounter(counter) {
  try {
    fs.writeFileSync('counter.json', JSON.stringify(counter));
  } catch (error) {
    console.error('Ошибка сохранения:', error);
  }
}

app.get('/', (req, res) => {
  const counter = readCounter();

  counter['/'] = counter['/'] ? counter['/'] + 1 : 1;

  saveCounter(counter);

 res.send(`
    <h1>Главная страница</h1>
    <p>Количество просмотров: ${counter['/']}</p>
    <a href="/about">О нас</a>
  `);
});

app.get('/about', (req, res) => {
  const counter = readCounter();

  counter['/about'] = counter['/about'] ? counter['/about'] + 1 : 1;

  saveCounter(counter);

  res.send(`
  <h1>О нас</h1>
  <p>Количество просмотров: ${counter['/about']}</p>
  <a href="/">Главная</a>
`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});