import React from 'react';
import Comment from './Comment';
import '../App.css';

function CommentList({ comments, onAddComment, onEditComment, onDeleteComment, onLike, onDislike }) {
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onAddComment={onAddComment}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
          onLike={onLike}
          onDislike={onDislike}
        />
      ))}
    </div>
  );
}

export default CommentList;
