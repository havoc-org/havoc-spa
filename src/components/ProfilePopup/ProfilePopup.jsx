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

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

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

  async function handleChangePassword() {
    setPasswordError('');
    setPasswordSuccess(false);
    setPasswordUpdating(true);

    if (!oldPassword || !newPassword) {
      setPasswordError('Both fields are required.');
      setPasswordUpdating(false);
      return;
    }

    try {
      await userService.updateUserPass(oldPassword, newPassword);
      setPasswordSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setShowPasswordForm(false);
    } catch (error) {
      setPasswordError('Failed to change password. Check your old password and try again.');
    } finally {
      setPasswordUpdating(false);
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

  return (
    <div className="profile-popup-container">
      <div className="profile-popup" ref={popupRef}>
        <button className="close-btn" onClick={onClose}>✖</button>

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
            <button className="profile-save-btn" onClick={handleSave} disabled={updating}>
              {updating ? 'Saving...' : 'Save'}
            </button>
            <button className="profile-cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <button className="profile-edit-btn" onClick={() => setEditMode(true)}>Edit</button>
        )}

        {showPasswordForm ? (
          <div className="reset-password-form">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="reset-password-buttons">
              <button className="submit-btn" onClick={handleChangePassword} disabled={passwordUpdating}>
                {passwordUpdating ? 'Updating...' : 'Submit'}
              </button>
              <button className="cancel-password-btn" onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            {passwordSuccess && <p className="success-message">Password updated successfully!</p>}
          </div>
        ) : (
          <button className="reset-password-btn" onClick={() => setShowPasswordForm(true)}>Reset Password</button>
        )}
      </div>
    </div>
  );
}
