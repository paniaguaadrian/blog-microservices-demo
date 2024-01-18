import React, { useState } from 'react';
import axios from 'axios';

import { postsURL } from '../../constants';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const URL = `${postsURL}/posts`;

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(URL, {
      title,
    });

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
