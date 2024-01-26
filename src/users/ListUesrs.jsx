import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import AxiosInstance from '../api/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faEdit, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
const ListUsers = ({ onActivate, onDeactivate }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await AxiosInstance.get('/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleActivate = async (id) => {
    try {
      await AxiosInstance.patch(`/user/${id}/activate`);
      fetchUsers();
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const handleDeactivate = async (id) => {
    console.log(id);
    try {
      await AxiosInstance.patch(`/user/${id}/diactivate`);
      fetchUsers();
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  return (
   <Card className="shadow-sm p-3 mb-4">
<CardHeader className="bg-light text-dark">
  <h4>Users List</h4>
</CardHeader>
<CardBody>
      <Button onClick={() => navigate("/user/add")}>Add User</Button>
      <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Role</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user._id} style={{ backgroundColor: user.active ? '#f5f5f5' : '#f0f0f0' }}>
        <td>{user.name.length > 20 ? `${user.name.substring(0, 20)}...` : user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.role}</td>
        <td>{user.active ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />}</td>
        <td>
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate(`/user/edit/${user._id}`)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            {user.active ? (
              <Button variant="danger" onClick={() => handleDeactivate(user._id)}>
                <FontAwesomeIcon icon={faLock} /> Lock
              </Button>
            ) : (
              <Button variant="success" onClick={() => handleActivate(user._id)}>
                <FontAwesomeIcon icon={faUnlock} /> Unlock
              </Button>
            )}
          </ButtonGroup>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
</CardBody>
    </Card>
  );
};

export default ListUsers;