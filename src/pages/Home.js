import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import Top from '../inc/Top';

Modal.setAppElement('#root'); // Ensure the modal is accessible

function Home() {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await axios.get('https://msmeserver.onrender.com/form-data');
      setFormData(response.data);
      setError(null); // Clear error when data is successfully fetched
    } catch (error) {
      setError('Error fetching form data'); // Set error message
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://msmeserver.onrender.com/form-data/${id}`, { status: newStatus });
      fetchFormData(); // Refresh form data after status update
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Error updating status'); // Set error message
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    console.log('Modal opened with item:', item); // Debug log
  };

  const closeModal = () => {
    setSelectedItem(null);
    console.log('Modal closed'); // Debug log
  };

  return (
    <div className="container">
      {/* <Top/> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Whatsapp No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map(item => (
            <tr key={item._id}>
              <td>
                {item.logo && <img src={`https://msmeserver.onrender.com/${item.logo}`} alt="logo" className="table-logo" />}
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.whno}</td>
              <td>
                <button className="action-button" onClick={() => openModal(item)}>👁️ View</button>
                <button
                  className="action-button"
                  onClick={() => handleStatusChange(item._id, 'verified')}
                  disabled={item.status === 'verified' || item.status === 'blocked'}
                >
                  {item.status === 'verified' ? 'Verified' : 'Verify'}
                </button>
                <button
                  className="action-button block-button"
                  onClick={() => handleStatusChange(item._id, 'blocked')}
                  disabled={item.status === 'blocked'}
                  style={{ backgroundColor: item.status === 'blocked' ? 'red' : '#c7673b' }}
                >
                  {item.status === 'blocked' ? 'Blocked' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={!!selectedItem}
        onRequestClose={closeModal}
        contentLabel="User Details"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedItem && (

         
         
          <div className="modal-content">
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Email:</strong> {selectedItem.email}</p>
            <p><strong>Whatsapp No:</strong> {selectedItem.whno}</p>
            <p><strong>Gender:</strong> {selectedItem.gender}</p>
            <p><strong>DOB:</strong> {selectedItem.dob}</p>
            <p><strong>Group:</strong> {selectedItem.group}</p>
            <p><strong>Business Name:</strong> {selectedItem.businessName}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Nature:</strong> {selectedItem.nature}</p>
            <p><strong>Address:</strong> {selectedItem.address}</p>
            <p><strong>Pin:</strong> {selectedItem.pin}</p>
            <p><strong>Loc:</strong> {selectedItem.loc}</p>
            <p><strong>City:</strong> {selectedItem.city}</p>
            <p><strong>Link:</strong> <a href={selectedItem.link} target="_blank" rel="noopener noreferrer">{selectedItem.link}</a></p>
            <p><strong>Disc:</strong> {selectedItem.disc}</p>
            {selectedItem.logo && <img src={`https://msmeserver.onrender.com/${selectedItem.logo}`} alt="logo" />}
            <p><strong>Status:</strong> {selectedItem.status}</p>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;
