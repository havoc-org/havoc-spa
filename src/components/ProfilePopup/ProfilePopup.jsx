import { useEffect, useRef, useState } from 'react';
import useUserService from '../../hooks/useUserService';
import './ProfilePopup.css';

export default function ProfilePopup({ user, onClose }) {
  const popupRef = useRef(null);
  const userService = useUserService();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (user?.id) {
          const response = await userService.getUser(user?.id);
          setUserData(response);
          setEditedFirstName(response.firstName);
          setEditedLastName(response.lastName);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user?.id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  async function handleSave() {
    setUpdating(true);
    try {
      const updatedData = {
        userId: user.id,
        name: editedFirstName,
        surName: editedLastName
      };

      await userService.updateUser(updatedData);
      setUserData((prev) => ({
        ...prev,
        firstName: editedFirstName,
        lastName: editedLastName
      }));
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="profile-popup-container">
        <div className="profile-popup" ref={popupRef}>
          <h2>Profile Settings</h2>
          <p>Loading...</p>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-popup-container">
        <div className="profile-popup" ref={popupRef}>
          <h2>Profile Settings</h2>
          <p>Error loading user data.</p>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-popup-container">
      <div className="profile-popup" ref={popupRef}>
        <h2>Personal Profile</h2>

        <div className="profile-field">
          <strong>Email:</strong>
          <span>{userData.email}</span>
        </div>

        <div className="profile-field">
          <strong>Name:</strong>
          {editMode ? (
            <input
              type="text"
              value={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
            />
          ) : (
            <span>{userData.firstName}</span>
          )}
        </div>

        <div className="profile-field">
          <strong>Surname:</strong>
          {editMode ? (
            <input
              type="text"
              value={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
            />
          ) : (
            <span>{userData.lastName}</span>
          )}
        </div>

        {editMode ? (
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSave} disabled={updating}>
              {updating ? 'Saving...' : 'Save'}
            </button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
        )}

        <button className="reset-password-btn">Reset Password</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
