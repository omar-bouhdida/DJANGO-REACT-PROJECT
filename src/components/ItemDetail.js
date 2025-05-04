import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemService } from '../services/api';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await itemService.getById(id);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch item details');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.delete(id);
        navigate('/items');
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="item-detail">
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>Created at: {new Date(item.created_at).toLocaleDateString()}</p>
      <p>Created by: {item.owner}</p>
      
      <div className="item-actions">
        <button onClick={() => navigate(`/items/edit/${item.id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate('/items')}>Back to List</button>
      </div>
    </div>
  );
};

export default ItemDetail;