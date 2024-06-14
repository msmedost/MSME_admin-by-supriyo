import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Top from '../inc/Top';
import '../styles/main.css';
import styles from '../styles/Approve.module.css'; // Import custom styles
import Sidebar from '../inc/Sidebar';

Modal.setAppElement('#root'); // Ensure the modal is accessible

function Approve() {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all'); // State for the filter

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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredData = formData.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className>
      {/* Page Wrapper */}
      <div id="wrapper">
        <Sidebar/>
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <Top/>
            <div className={styles.filterButtons}>
                <button onClick={() => handleFilterChange('all')}>All</button>
                <button onClick={() => handleFilterChange('verified')}>Verified</button>
                <button onClick={() => handleFilterChange('not verified')}>Not Verified</button>
                <button onClick={() => handleFilterChange('blocked')}>Blocked</button>
              </div>

            <div className="container" style={{ marginLeft: '250px' }}>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              

              <table className="styled-table" style={{ marginTop: '5px' }} >
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Business Name</th>
                    <th>Created At</th>
                    <th>Whatsapp No</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item._id}>
                      <td>
                        {item.logo && <img src={`https://msmeserver.onrender.com/${item.logo}`} alt="logo" className="table-logo" />}
                      </td>
                      <td>{item.businessName}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
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
                          onClick={() => handleStatusChange(item._id, item.status === 'blocked' ? 'not verified' : 'blocked')}
                          style={{ backgroundColor: item.status === 'blocked' ? 'red' : '#c7673b' }}
                        >
                          {item.status === 'blocked' ? 'Unblock' : 'Block'}
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
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
              >
                {selectedItem && (
                  <div className={styles.modalContent}>
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {selectedItem.name}</p>
                    <p><strong>Email:</strong> {selectedItem.email}</p>
                    <p><strong>Whatsapp No:</strong> {selectedItem.whno}</p>
                    <p><strong>Gender:</strong> {selectedItem.gender}</p>
                    <p><strong>Business start date:</strong> {selectedItem.dob}</p>
                    <p><strong>Business Name:</strong> {selectedItem.businessName}</p>
                    <p><strong>Category:</strong> {selectedItem.category}</p>
                    <p><strong>Address:</strong> {selectedItem.address}</p>
                    <p><strong>Pin:</strong> {selectedItem.pin}</p>
                    <p><strong>Loc:</strong> {selectedItem.loc}</p>
                    <p><strong>City:</strong> {selectedItem.city}</p>
                    <p><strong>Link:</strong> <a href={selectedItem.link} target="_blank" rel="noopener noreferrer">{selectedItem.link}</a></p>
                    <p><strong>Disc:</strong> {selectedItem.disc}</p>
                    <p><strong>Disc:</strong> {selectedItem.desc}</p>
                    {selectedItem.logo && <img src={`https://msmeserver.onrender.com/${selectedItem.logo}`} alt="logo" />}
                    <p><strong>Status:</strong> {selectedItem.status}</p>
                    <button className={styles.closeButton} onClick={closeModal}>Close</button>
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Approve;
