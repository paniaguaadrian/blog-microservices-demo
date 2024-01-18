import React, { useState } from 'react';
import axios from 'axios';

import { commentsURL } from '../../constants';

// This component needs to know which postId is being used
const CommentsCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const URL = `${commentsURL}/posts/${postId}/comments`;

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(URL, {
      content,
    });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentsCreate;
