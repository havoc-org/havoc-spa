import { React, useState } from 'react';
import commentsIcon from '../../../assets/comments.svg';
const Comments = ({ comments, handleAddComment }) => {
  const [commentContent, setCommentContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function sendComment() {
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
      <div className="comment">
        <span className="comment-user">Nazarii</span> 04:43 pm
        <p>
          Duis posuere sem lacus, non ornare diam vestibulum commodo. Nullam
          scelerisque ante et dolor fringilla, at dictum dolor varius.
        </p>
      </div>
    </div>
  );
};

export default Comments;
