import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentsCreate from '../Comments/CommentsCreate';
import CommentsList from '../Comments/CommentsList';

import { queryURL } from '../../constants';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const URL = `${queryURL}/posts`;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(URL);
      setPosts(res.data);
    };
    fetchPosts();
  }, [URL]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentsList comments={post.comments} />
          <CommentsCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
