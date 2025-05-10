import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [artworks, setArtworks] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchArtworks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/artworks');
      setArtworks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch artworks');
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error

    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/artworks/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:5000/api/artworks', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setTitle('');
      setImage(null);
      setEditingId(null);
      fetchArtworks();
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit artwork. Make sure the image is selected.');
    }
  };

  const handleEdit = (artwork) => {
    setTitle(artwork.title);
    setEditingId(artwork._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/artworks/${id}`);
      fetchArtworks();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete artwork');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Artwork Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Artwork' : 'Add Artwork'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {artworks.map((art) => (
          <div key={art._id} className="border rounded p-4 shadow-md">
            <img
              src={`http://localhost:5000${art.imageUrl}`}
              alt={art.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-semibold text-lg mb-2">{art.title}</h3>
            <button
              onClick={() => handleEdit(art)}
              className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(art._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
