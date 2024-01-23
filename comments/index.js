const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const { eventsURL } = require('./constants');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// @get -> Get all comments from a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// @post -> Create a comment for a post
app.post('/posts/:id/comments', async (req, res) => {
  // generate a new Id for our comment
  const commentId = randomBytes(4).toString('hex');
  // we need the content that the user wants to add to the post
  const { content } = req.body;

  // check if there are any comments for the current post
  const comments = commentsByPostId[req.params.id] || [];

  // add the comment to the list of comments for the post
  // add a new property to the comment called "status" to handle moderation
  comments.push({ id: commentId, content, status: 'pending' });
  // update the list of comments for the post
  commentsByPostId[req.params.id] = comments;

  // Emit the comment as an event to our event-bus service
  const eventsBuildURL = `${eventsURL}/events`;
  await axios.post(eventsBuildURL, {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      // add a new property to the comment called "status" to handle moderation
      status: 'pending',
    },
  });

  // send back the whole list of comments for the current post
  res.status(201).send(comments);

  console.log('Comment created', comments);
});

// created a new route to let the event-bus service send us an event
app.post('/events', async (req, res) => {
  const event = req.body;
  console.log('Received event:', event);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    // find the comment that we need to update
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    // update the status of the comment
    comment.status = status;

    // send the new event to our event bus with the updated comment status
    const eventsBuildURL = `${eventsURL}/events`;
    await axios.post(eventsBuildURL, {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening [COMMENTS] service on port 4001');
});
