import React, { useState } from 'react';
import '../App.css';

function AddComment({ onAddComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddComment(content);
      setContent('');
    }
  };

  return (
    <form className="add-comment-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddComment;
