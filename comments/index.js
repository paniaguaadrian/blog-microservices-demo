const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  // generate a new Id for our comment
  const commentId = randomBytes(4).toString('hex');
  // we need the content that the user wants to add to the post
  const { content } = req.body;

  // check if there are any comments for the current post
  const comments = commentsByPostId[req.params.id] || [];

  // add the comment to the list of comments for the post
  comments.push({ id: commentId, content });
  // update the list of comments for the post
  commentsByPostId[req.params.id] = comments;

  // send back the whole list of comments for the current post
  res.status(201).send(comments);

  console.log('Comment created', comments);
});

app.listen(4001, () => {
  console.log('Listening [COMMENTS] service on port 4000');
});
