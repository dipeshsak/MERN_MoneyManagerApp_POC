import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

const HomePage = () => {
  const [items, setItems] = useState([
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [currentItem, setCurrentItem] = useState({ title: '', price: '', catagory: '' });

  const authToken = localStorage.getItem('token')
  const userId=localStorage.getItem('userId')


  // Open modal for adding or updating
  const handleShowModal = (item = null) => {
    setIsEditing(!!item); // If item exists, set to edit mode
    setCurrentItem(item || { title: '', price: '', catagory: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {

    createExpenseApiCall(currentItem)
    // if (isEditing) {
    //   // Update item
    //   setItems((prevItems) =>
    //     prevItems.map((item) => (item.id === currentItem.id ? currentItem : item))
    //   );
    // } else {
    //   // Add new item
    //   setItems((prevItems) => [
    //     ...prevItems,
    //     { ...currentItem, id: Date.now() }, // Assign a unique ID
    //   ]);
    // }
    handleCloseModal();
  };


  // Handle delete
  const handleDelete = (id) => {
     console.log("ID needs to be deleted ",id)
     deleteExpense(id)
    // setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllExpenseApiCall = async () => {
    let formData ={
       "userId":userId
    }
    try {
      const response = await fetch('/api/expense/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData)
      }); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data.data); // Assuming the API response is an array of items
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createExpenseApiCall = async (formData) => {
    

    try {
      setLoading(true);
      const response = await fetch('/api/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({...formData,"userId":userId}), // Send formData as JSON
      });

      if (!response.ok) {
      setLoading(false);

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("DATA IS ",data)

      if(data.success){
      setLoading(false);

        getAllExpenseApiCall()
      }
      // setResponseMessage('Item added successfully!');
      // setFormData({ title: '', price: '', catagory: '' }); // Reset form
    } catch (err) {
      setError(err.message);
    }finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      setLoading(true)
      const response = await fetch('/api/expense/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }
      });

      if (!response.ok) {
      setLoading(false)

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("DATA IS ",data)

      if(data.success){
      setLoading(false)
        getAllExpenseApiCall()
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateExpenseApiCall = async (id,formData) => {
    try {
      const response = await fetch('/api/expense/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("DATA IS ",data)

      if(data.success){
        getAllExpenseApiCall()
      }
      // setResponseMessage('Item added successfully!');
      // setFormData({ title: '', price: '', catagory: '' }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };
  

  useEffect(() => {
    getAllExpenseApiCall();
  }, []); 

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div style={{ padding: '10px' }}>
      {/* <h3>Expense List</h3> */}
      <Button variant="primary" onClick={() => handleShowModal()}>
        <FontAwesomeIcon icon={faPlus} /> Add Expense
      </Button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.catagory}</td>

              <td>
                {/* <Button
                  variant="warning"
                  onClick={() => handleShowModal(item)}
                  style={{ marginRight: '10px' }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button> */}
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Update Item' : 'Add Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={currentItem.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={currentItem.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="catagory"
                value={currentItem.catagory}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
