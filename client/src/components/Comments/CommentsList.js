import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { commentsURL } from '../../constants';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${commentsURL}/${postId}/comments`);
      setComments(res.data);
    };
    fetchData();
  }, [postId]);

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
