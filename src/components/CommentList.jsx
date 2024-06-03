import React from 'react';
import Comment from './Comment';
import '../App.css';

function CommentList({ comments, onAddComment, onEditComment, onDeleteComment }) {
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} onAddComment={onAddComment} onEditComment={onEditComment} onDeleteComment={onDeleteComment} />
      ))}
    </div>
  );
}

export default CommentList;
