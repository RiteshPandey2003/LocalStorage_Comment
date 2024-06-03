import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments'));
    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (content, parentId = null) => {
    const newComment = {
      id: comments.length + 1,
      content,
      author: 'New User',
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: []
    };

    if (parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? { ...comment, replies: [...comment.replies, newComment] }
          : { ...comment, replies: updateReplies(comment.replies, parentId, newComment) }
      ));
    } else {
      setComments([newComment, ...comments]);
    }
  };

  const updateReplies = (replies, parentId, newComment) => {
    return replies.map(reply => 
      reply.id === parentId
        ? { ...reply, replies: [...reply.replies, newComment] }
        : { ...reply, replies: updateReplies(reply.replies, parentId, newComment) }
    );
  };

  const handleEditComment = (id, newContent) => {
    const editComments = (comments) => {
      return comments.map(comment => {
        if (comment.id === id) {
          return { ...comment, content: newContent };
        } else if (comment.replies.length > 0) {
          return { ...comment, replies: editComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(editComments(comments));
  };

  const handleDeleteComment = (id) => {
    const deleteComments = (comments) => {
      return comments.filter(comment => comment.id !== id).map(comment => {
        if (comment.replies.length > 0) {
          return { ...comment, replies: deleteComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(deleteComments(comments));
  };

  const handleLike = (id) => {
    const likeComments = (comments) => {
      return comments.map(comment => {
        if (comment.id === id) {
          return { ...comment, likes: comment.likes + 1 };
        } else if (comment.replies.length > 0) {
          return { ...comment, replies: likeComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(likeComments(comments));
  };

  const handleDislike = (id) => {
    const dislikeComments = (comments) => {
      return comments.map(comment => {
        if (comment.id === id) {
          return { ...comment, dislikes: comment.dislikes + 1 };
        } else if (comment.replies.length > 0) {
          return { ...comment, replies: dislikeComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(dislikeComments(comments));
  };

  return (
    <div className="app">
      <h1>Comments</h1>
      <AddComment onAddComment={handleAddComment} />
      <CommentList
        comments={comments}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}

export default App;




