import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinProjectPopup.css";
import useProjectService from "../../../hooks/useProjectService.js";

export default function JoinProjectPopup({ onClose }) {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const projectService = useProjectService();
  const navigate = useNavigate();

  const handleJoinProject = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await projectService.addUserToProject(inviteCode);

      if (response.message) {
        throw new Error(response.message);
      }

      setMessage("Successfully joined the project!");
      setTimeout(() => {
        onClose();
        navigate("/projects");
        window.location.reload();
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "An unexpected error occurred. Please try again.");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Network error. Please check your internet connection.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h3>Invitation code:</h3>
        <input
          type="text"
          className="invite-input"
          placeholder="Enter invitation code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <p className="popup-description">
          You can join another user's project using the invitation code, which can be found in the project information tab.
        </p>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button className="join-button" onClick={handleJoinProject} disabled={loading}>
          {loading ? "Joining..." : "Join"}
        </button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
