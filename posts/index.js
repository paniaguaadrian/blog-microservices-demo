const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  // we need an ID for each post that we create
  const id = randomBytes(4).toString('hex');
  // we get the title that the user sends to us with the req.body
  const { title } = req.body;

  // create a new post with the ID and title
  posts[id] = {
    id,
    title,
  };
  // send the created post back to the client
  res.status(201).send(posts[id]);

  console.log('Post created', posts[id]);
});

app.listen(4000, () => {
  console.log('Listening [POST] service on port 4000');
});
