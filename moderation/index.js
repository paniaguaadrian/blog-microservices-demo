const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const { eventsURL } = require('./constants/index');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const eventsBuildURL = `${eventsURL}/events`;

  // received the event from the req.body
  const { type, data } = req.body;

  // check if the type is CommentCreated
  if (type === 'CommentCreated') {
    // inside data (comment content) check if contains a 'bad word', on that case, 'orange'
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post(eventsBuildURL, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening [MODERATION] service on port 4003');
});
