const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { postsURL, commentsURL, queryURL } = require('./constants');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const postsBuildURL = `${postsURL}/events`;
  const commentsBuildURL = `${commentsURL}/events`;
  const queryBuildURL = `${queryURL}/events`;

  // Anything that comes to this service as req.body, will be called as event
  const event = req.body;
  console.log('🚀 ~ app.post ~ event:', event);

  // send the event back to the services posts, comments and query
  axios.post(postsBuildURL, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(commentsBuildURL, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(queryBuildURL, event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening [EVENT-BUS] service on port 4005');
});
