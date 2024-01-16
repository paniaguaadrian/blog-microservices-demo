import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentsCreate from '../Comments/CommentsCreate';
import CommentsList from '../Comments/CommentsList';

import { postsURL } from '../../constants';

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(postsURL);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentsList postId={post.id} />
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
