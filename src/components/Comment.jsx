import React, { useState } from 'react';
import '../App.css';

function Comment({ comment, onAddComment, onEditComment, onDeleteComment, onLike, onDislike }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState('');
  const [showReply, setShowReply] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onAddComment(replyContent, comment.id);
      setReplyContent('');
      setShowReply(false);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onEditComment(comment.id, content);
      setIsEditing(false);
    }
  };

  return (
    <div className="comment">
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p><strong className="comment-author">{comment.author}</strong> <span className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</span></p>
          <p className="comment-content">{comment.content}</p>
          <div className="comment-actions">
            <button onClick={() => onLike(comment.id)}>Like ({comment.likes})</button>
            <button onClick={() => onDislike(comment.id)}>Dislike ({comment.dislikes})</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDeleteComment(comment.id)}>Delete</button>
            <button onClick={() => setShowReply(!showReply)}>Reply</button>
          </div>
        </>
      )}

      {showReply && (
        <form className="reply-form" onSubmit={handleReplySubmit}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Reply..."
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              onAddComment={onAddComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
              onLike={onLike}
              onDislike={onDislike}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
