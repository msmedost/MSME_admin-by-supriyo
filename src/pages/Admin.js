import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../inc/Sidebar';
import Top from '../inc/Top';
import Footer from '../inc/Footer';
import '../styles/Home.css';

function Admin() {
  const [blockedCount, setBlockedCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [notVerifiedCount, setNotVerifiedCount] = useState(0);

  useEffect(() => {
    // Fetch the count of blocked users
    axios.get('https://msme-server.onrender.com/api/blocked-users-count')
      .then(response => {
        setBlockedCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching blocked users count:', error);
      });

    // Fetch the count of active users
    axios.get('https://msme-server.onrender.com/api/active-users-count')
      .then(response => {
        setActiveCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching active users count:', error);
      });


    axios.get('https://msme-server.onrender.com/api/not-verified-users-count')
      .then(response => {
        setNotVerifiedCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching not verified users count:', error);
      });
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Top />
          <div className="container-fluid mt-4 ml-4">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <div className="row">
              {/* Blocked Users Card */}
              <div className="col-xl-3 col-md-6 mb-4 " style={{ marginLeft: '200px' }}>
                <div className="card border-left-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                          Blocked Users
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {blockedCount}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-user-slash fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Active Users Card */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Active Users
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {activeCount}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-user-check fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Not Verified Users Card */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Not Verified Users
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {notVerifiedCount}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-user-clock fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Admin;
