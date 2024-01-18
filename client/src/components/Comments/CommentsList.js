import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { commentsURL } from '../../constants';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState({});

  const URL = `${commentsURL}/posts/${postId}/comments`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(URL);
      setComments(res.data);
    };
    fetchData();
  }, [URL, postId]);

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
