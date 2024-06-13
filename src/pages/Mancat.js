import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styles from '../styles/Approve.module.css'; // Import custom styles
import Top from '../inc/Top';
import Sidebar from '../inc/Sidebar';

function Mancat() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:2000/categories');
      console.log('Fetched categories:', response.data); // Debugging log
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/categories', { name: newCategory });
      console.log('Added category:', response.data); // Debugging log
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:2000/categories/${categoryId}`);
      console.log('Deleted category ID:', categoryId); // Debugging log
      setCategories(categories.filter(cat => cat._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      {/* Page Wrapper */}
      <div id="wrapper">
        <Sidebar />
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <Top />
            {/* Main Content */}
            <div className={styles.mainContent}>
              <div className={styles.mancatContainer}>
                <h1>Manage Categories</h1>
                <form onSubmit={handleAddCategory} className={styles.form}>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add new category"
                    required
                  />
                  <button type="submit">Add Category</button>
                </form>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>
                          <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mancat;
