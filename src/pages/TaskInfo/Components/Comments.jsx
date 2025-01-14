import { React, useState } from 'react';
import commentsIcon from '../../../assets/comments.svg';
const Comments = ({ comments, handleAddComment }) => {
  const [commentContent, setCommentContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function sendComment() {
    setErrorMessage('')
    if(commentContent==''){
       setErrorMessage("Comment is empty")
       return;
    }  
    else if(commentContent.length > 200){
        setErrorMessage("Comment is too big")
       return;
    }
    handleAddComment(commentContent);
    setCommentContent('');
  }

  const formatCommentDate = (dateString) => {
    const commentDate = new Date(dateString);
    const today = new Date();
    const isToday =
      commentDate.getDate() === today.getDate() &&
      commentDate.getMonth() === today.getMonth() &&
      commentDate.getFullYear() === today.getFullYear();

    if (isToday) {
      return commentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return commentDate.toLocaleDateString();
    }
  };

  return (
    <div className="task-comments">
      <div className="comments-header">
        <img className="icons" src={commentsIcon} alt="Comments" />
        <h2>Comments</h2>
      </div>
      <input
        type="text"
        className="add-comment"
        placeholder="Add a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button className="add-comment-button" onClick={sendComment}>
        Add Comment
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {comments.map((comment) => (
        <div className="comment" key={comment.commentId}>
          <span className="comment-user">{comment.user.firstName+" "+comment.user.lastName}</span> {formatCommentDate(comment.commentDate)}
          <p>{comment.content}</p>
        </div>
      ))}
      {/* This is a hard-coded comment
      <div className="comment">
        <span className="comment-user">Nazarii</span> 04:43 pm
        <p>
          Duis posuere sem lacus, non ornare diam vestibulum commodo. Nullam
          scelerisque ante et dolor fringilla, at dictum dolor varius.
        </p>
      </div>*/}
    </div>
  );
};

export default Comments;
