import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from "../api/AxiosInstance";
import { toast } from 'react-toastify';
import './ChangePasswordForm.css'; // Import a CSS file for styling

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error('New passwords must match');
      return;
    }

    // Call API to change password
    try {
      const response = await AxiosInstance.post(`/user/change-password/${user._id}`, {
        currentPassword,
        newPassword,
      });

      // Handle success
      toast.success("Password changed successfully!");
      navigate('/login'); // Redirect to profile after success
    } catch (error) {
      // Handle specific errors gracefully
      if (error.response.status === 401) {
        toast.error("Incorrect current password");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Change Password</h2>
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className={error ? 'error-input' : ''} // Add error styling
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={5} // Enforce password strength
          className={error ? 'error-input' : ''}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={error ? 'error-input' : ''}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="change-password-button">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
