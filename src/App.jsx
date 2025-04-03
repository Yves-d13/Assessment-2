import React, { useState } from 'react';
import './index.css';

const initialUsers = [
  { id: 1, initials: 'JD', name: 'John Doe', email: 'john.doe@example.com', status: 'active', dob: '1990-05-15' },
  { id: 2, initials: 'JS', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'locked', dob: '1988-10-22' },
];

const UserForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="initials"
        placeholder="Initials"
        value={formData.initials || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name || ''}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={formData.status || ''}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dob"
        value={formData.dob || ''}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

const UserCard = ({ user, onEdit, onDelete }) => (
  <div className="user-card">
    <div className="initials">{user.initials}</div>
    <div className="details">
      <p><strong>{user.name}</strong></p>
      <p>Email: {user.email}</p>
      <p>Status: {user.status}</p>
      <p>Date of Birth: {user.dob}</p>
    </div>
    <div className="actions">
      <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(user)}>Delete</button>
    </div>
  </div>
);

const App = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (user) => {
    setUsers(users.filter(u => u.id !== user.id));
  };

  const handleSaveUser = (formData) => {
    if (editingUser) {
      setUsers(users.map(u => (u.id === editingUser.id ? { ...u, ...formData } : u)));
    } else {
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
  };

  return (
    <div className="app">
                <header>
              <h1>User Management</h1>
              <div className="header-buttons">
                <button className="create-user-btn" onClick={handleCreateUser}>Create User</button>
                <button className="logout-btn">Logout</button>
              </div>
            </header>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      {showForm && (
        <UserForm
          onSubmit={handleSaveUser}
          initialData={editingUser || { initials: '', name: '', email: '', status: '', dob: '' }}
        />
      )}
    </div>
  );
};

export default App;
