import React, { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import ConfirmationModal from '../components/common/ConfirmationModal';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function Images({ theme = 'light', onToggleTheme }) {

  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    price: '',
    code: '',
    imageData: ''
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/images", {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const data = await response.json();
      setImages(data);
    } catch {
      handleError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadForm(prev => ({ ...prev, imageData: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.imageData) return handleError('Please select an image');
    try {
      const response = await fetch("http://localhost:8000/images", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(uploadForm)
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess('Image uploaded successfully');
        setIsModalOpen(false);
        setUploadForm({ name: '', price: '', code: '', imageData: '' });
        fetchImages();
      } else {
        handleError(result.message);
      }
    } catch {
      handleError('Upload failed');
    }
  };

  const handleDelete = (id) => {
    setImageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;
    try {
      const response = await fetch(`http://localhost:8000/images/${imageToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess('Image deleted');
        setIsDeleteModalOpen(false);
        setImageToDelete(null);
        fetchImages();
      } else {
        handleError(result.message || 'Delete failed');
      }
    } catch {
      handleError('Delete failed');
    }
  };



  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ss-layout">
      <Sidebar activeSection="images" />

      <div className="ss-main">
        <Topbar 
          title="Images Gallery" 
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          search={search}
          setSearch={setSearch}
        />

        <div className="ss-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 600 }}>Inventory Gallery</h2>
            <button 
                className="ss-btn-primary" 
                style={{ backgroundColor: '#eab308', color: '#fff', border: 'none' }}
                onClick={() => setIsModalOpen(true)}
            >
              + Upload
            </button>
          </div>

          {loading ? (
            <p>Loading gallery...</p>
          ) : filteredImages.length === 0 ? (
            <div className="ss-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p style={{ color: 'var(--text-muted)' }}>
                  {search ? `No images found matching "${search}"` : 'No images in your gallery yet. Start by uploading one!'}
                </p>
            </div>
          ) : (
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: 24 
            }}>
              {filteredImages.map(img => (
                <div key={img._id} className="ss-card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'relative', paddingTop: '100%' }}>
                    <img 
                      src={img.imageData} 
                      alt={img.name} 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{img.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
                      <span>{img.code}</span>
                      <span style={{ color: '#eab308', fontWeight: 600 }}>Rs {img.price}</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(img._id);
                    }}
                    style={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8, 
                        backgroundColor: 'rgba(255,255,255,0.9)', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: 32, 
                        height: 32, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#ef4444',
                        zIndex: 20,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {Icon.trash}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="ss-modal-overlay">
            <div className="ss-modal">
              <div className="ss-modal-head">
                <div className="ss-card-title">Upload Image</div>
                <button className="ss-btn-ghost" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
              <form onSubmit={handleUpload} style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                <div className="ss-form-group">
                  <label className="ss-form-label">Product Name</label>
                  <input 
                    className="ss-form-input" 
                    value={uploadForm.name}
                    onChange={e => setUploadForm({...uploadForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="ss-form-row">
                  <div className="ss-form-group">
                    <label className="ss-form-label">Price (Rs)</label>
                    <input 
                      className="ss-form-input" 
                      value={uploadForm.price}
                      onChange={e => setUploadForm({...uploadForm, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="ss-form-group">
                    <label className="ss-form-label">Code/SKU</label>
                    <input 
                      className="ss-form-input" 
                      value={uploadForm.code}
                      onChange={e => setUploadForm({...uploadForm, code: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="ss-form-group">
                  <label className="ss-form-label">Select Image</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {uploadForm.imageData && (
                    <div style={{ marginTop: 10, width: 100, height: 100, border: '1px solid #ddd', overflow: 'hidden' }}>
                      <img src={uploadForm.imageData} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                  <button type="button" className="ss-btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="ss-btn-primary" style={{ backgroundColor: '#eab308', color: '#fff' }}>Upload</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this image? This action cannot be undone."
          confirmText="Delete Image"
        />
      </div>
    </div>
  );
}

export default Images;
