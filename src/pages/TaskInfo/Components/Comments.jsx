import { React, useState } from 'react';

const CommentIcon = () => (
  <svg width="40" height="40" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.1273 13.25H14.9939C14.4198 13.25 13.8677 13.2721 13.3377 13.3383C7.39727 13.8462 4.41602 17.3575 4.41602 23.8279V32.6613C4.41602 41.4946 7.94935 43.2392 14.9939 43.2392H15.8773C16.3631 43.2392 17.0035 43.5704 17.2906 43.9458L19.9406 47.4792C21.111 49.0471 23.0102 49.0471 24.1806 47.4792L26.8306 43.9458C27.1618 43.5042 27.6918 43.2392 28.2439 43.2392H29.1273C35.5977 43.2392 39.1089 40.28 39.6168 34.3175C39.6831 33.7875 39.7052 33.2354 39.7052 32.6613V23.8279C39.7052 16.7833 36.1718 13.25 29.1273 13.25ZM14.3535 30.9167C13.1168 30.9167 12.1452 29.9229 12.1452 28.7083C12.1452 27.4938 13.1389 26.5 14.3535 26.5C15.5681 26.5 16.5618 27.4938 16.5618 28.7083C16.5618 29.9229 15.5681 30.9167 14.3535 30.9167ZM22.0606 30.9167C20.8239 30.9167 19.8523 29.9229 19.8523 28.7083C19.8523 27.4938 20.846 26.5 22.0606 26.5C23.2752 26.5 24.2689 27.4938 24.2689 28.7083C24.2689 29.9229 23.2973 30.9167 22.0606 30.9167ZM29.7898 30.9167C28.5531 30.9167 27.5814 29.9229 27.5814 28.7083C27.5814 27.4938 28.5752 26.5 29.7898 26.5C31.0043 26.5 31.9981 27.4938 31.9981 28.7083C31.9981 29.9229 31.0043 30.9167 29.7898 30.9167Z" fill="currentColor"/>
    <path d="M48.5395 14.9947V23.828C48.5395 28.2447 47.1704 31.248 44.4321 32.9042C43.7696 33.3017 42.9966 32.7717 42.9966 31.9988L43.0187 23.828C43.0187 14.9947 37.9616 9.93758 29.1283 9.93758L15.6795 9.95966C14.9066 9.95966 14.3766 9.18675 14.7741 8.52425C16.4304 5.78591 19.4337 4.41675 23.8283 4.41675H37.9616C45.0062 4.41675 48.5395 7.95008 48.5395 14.9947Z" fill="currentColor" />
  </svg>
)

const Comments = ({ comments, handleAddComment }) => {
  const [commentContent, setCommentContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function sendComment() {
    setErrorMessage('')
    if (commentContent == '') {
      setErrorMessage("Comment is empty")
      return;
    }
    else if (commentContent.length > 200) {
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
        <CommentIcon/>
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
          <span className="comment-user">{comment.user.firstName + " " + comment.user.lastName}</span> {formatCommentDate(comment.commentDate)}
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
