import React from 'react';

const CommentsList = ({ comments }) => {
  const renderedComments = Object.values(comments).map((comment) => {
    let content;

    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;

      case 'pending':
        content = 'This comment is pending moderation...';
        break;

      case 'rejected':
        content = 'This comment has been rejected';
        break;

      default:
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
