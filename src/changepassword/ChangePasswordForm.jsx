import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from "../api/AxiosInstance"
import { toast } from 'react-toastify';
const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse( localStorage.getItem("token"))
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error('New passwords must match');
      return;
    }

    // Call API to change password (replace with your actual API call)
    try {
        const response = await AxiosInstance.post(`/user/change-password/${user._id}`, {
          currentPassword,
          newPassword,
        });
  console.log(response);
        toast.success("password is changed ")
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="currentPassword">Current Password:</label>
      <input
        type="password"
        id="currentPassword"
        name="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <label htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;
